<template>
<div v-if="show" class="profile">
  <b-row class="info">
    <b-col cols="12">
      <h2>{{ currentUser.name }}</h2>
    </b-col>
    <b-col cols="4">
      <p class="highlight">{{ currentUser.games.played }}</p>
      <p class="highlight">joués</p>
    </b-col>
    <b-col cols="4">
      <p class="highlight">{{ currentUser.games.favorite.average }}</p>
      <p class="highlight">{{ getSport(currentUser.games.favorite.sport) }}</p>
    </b-col>
    <b-col cols="4">
      <p class="highlight">{{ currentUser.games.organized }}</p>
      <p class="highlight">organisés</p>
    </b-col>
  </b-row>
  <b-row class="more-info">
    <b-col cols="12">
      <p>Créneaux favoris</p>
    </b-col>
    <b-col cols="8">
      <span v-for="(day, index) in days" :key="index" :class="{ active: isDayActive(index)}">{{ day }}</span>
    </b-col>
    <b-col cols="4">
      <p class="highlight">{{ currentUser.available.time }}</p>
    </b-col>
    <b-col cols="12">
      <p>Spots favoris</p>
    </b-col>
    <b-col cols="12">
      <span class="highlight" v-for="(spot, index) in currentUser.favorite_spots" :key="index">{{ spot }} <span v-if="index !== last">/</span> </span>
    </b-col>
  </b-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  data() {
    return {
      currentUser: {},
      rules: {
        name: [
          {
            required: true,
            message: 'Please input your name',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Length should be 3',
            trigger: 'blur'
          }
          ],
      },
      show: false,
      days: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    }

  },
  computed: {
    // https://jsfiddle.net/wv2ujxvn/6/
    last() {
      return Object.keys(this.currentUser.favorite_spots).length - 1;
    }
  },
  methods: {
    getCurrentUser() {
      axios.get('/api/profile').then(results => {
        this.currentUser = results.data.users[0]
      }).then(() => {
        this.show = true;
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
    isDayActive(index) {
      var isActive = false;
      this.currentUser.available.day.filter(day => {
        if (day === index) {
          isActive = true
        }
      })

      return isActive;

    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('api/profile', this.currentUser)
            .then(results => {
              this.currentUser = results.data.users[0]
              this.$emit('showNotification', {
                title: 'Profile updated',
                type: 'success'
              });
            })
        } else {
          this.$emit('showNotification', {
            title: 'Profile invalid',
            type: 'error'
          });
        }
      });

    },
  },
  created() {
    this.getCurrentUser();
    this.getAllSports();
  }
}
</script>


<style lang="scss" scoped>
.profile {
    margin-bottom: 30px;
}
.active,
.highlight {
    color: #32B028;
    font-weight: 700;
}
.info,
.more-info {
    border-bottom: 1px solid #7D7D7D;
}
.info {

    p {
        text-align: center;
    }
}
.more-info {
    text-align: left;
    span {
        margin-right: 5px;
    }

}
</style>
