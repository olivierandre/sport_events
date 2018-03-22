<template>
<div>
  <b-navbar variant="sport-events" type="light">
    <b-navbar-brand @click="changeRoute()" to="/">Sport Events</b-navbar-brand>
  </b-navbar>
</div>
</template>

<script>
import EventsForm from "../Events/EventsForm"
export default {
  name: 'nav-bar',
  components: {
    EventsForm
  },
  data() {
    return {
      items: [],
      evt: {
        id: ''
      },
      activeIndex: '/',
      showForm: false
    }
  },
  methods: {
    changeRoute() {
      this.$emit('changeRoute');
    }
  },
  created() {}
}
</script>


<style scoped lang="scss">
.bg-sport-events {
    background: #209ACD;
    text-align: center;
    a {
        color: #fff;
    }
}
</style>
