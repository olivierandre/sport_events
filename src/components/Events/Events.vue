<template>
<b-row>
  <b-col sm="12" cols="12">
    <h2>Events list</h2>
  </b-col>
  <b-col sm="12" cols="12" v-for="event in events" :key="event.id" class="event-list">
    <b-col cols="3" :class="addSportClass(event.sport)">
      <h3>{{ event.date }}</h3>
    </b-col>

    <b-col cols="9" class="event-infos">
      <p class="name">{{ getSport(event.sport) }} - {{ event.name }}</p>
      <span class="tags" v-for="tag in event.tags" :key="tag.name">#{{ tag }} </span>
      <p>{{ event.user }}</p>
      <p v-if="!event.freePlace">FULL</p>
      <p v-else>{{ event.price }}€ - {{ event.freePlace }}</p>
    </b-col>
  </b-col>
</b-row>
</template>

<script>
import axios from 'axios';
import EventBus from '../../event-bus';

export default {
  name: 'event',
  data() {
    return {
      events: [],
      sports: []
    }
  },
  methods: {
    getAllEvents() {
      axios.get('/api/events').then(results => {
        this.events = results.data.events
      })
    },
    getAllSports() {
      axios.get('/api/sports').then(results => {
        this.sports = results.data.sports
      })
    },
    getSport(id) {
      var name = ''
      this.sports.filter(function (sport) {
        if (sport.id == id) {
          name = sport.name
        }
      })
      return name;
    },
    addSportClass(id) {
      var name = this.getSport(id);

      return 'event-date sport-' + name.toLowerCase()
    }
  },
  computed: {},
  created() {
    this.getAllEvents()
    this.getAllSports()
  },
  mounted() {
    EventBus.$on('updateEvents', events => {
      this.events = events.data.events;
    });
  }
}
</script>

<style lang="scss">
.event-list {
    display: flex;
    margin: 10px 0;
    .event-date {

        color: white;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.sport-football {
            background: #37B76A;
        }
        &.sport-tennis {
            background: #FFBC49;
        }
        &.sport-running {
            background: #666666;
        }
        &.sport-basket {
            background: #FF5C5C;
        }
        @media (max-width:620px) {
            h3 {
                font-size: 1rem;
                word-break: break-word;
            }

        }
    }
    .event-infos {

        border-radius: 5px;
        background: #F4F4F4;
    }
    .name {
        color: #30A860;
        font-weight: bold;
        font-size: 24px;
    }
    .tags {
        color: #A3A3A3;
    }
    p {
        color: #5D5D5D;
    }
}
</style>
