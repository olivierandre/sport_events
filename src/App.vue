<template>
<div id="app" class="page-container">
  <nav-bar @createEvent="manageEventForm" @showNotification="showNotif"></nav-bar>
  <router-view @showNotification="showNotif"></router-view>
</div>
</template>

<script>
import NavBar from "./components/Layout/NavBar"
import EventBus from "./event-bus"
export default {
  name: 'app',
  components: {
    NavBar
  },
  data() {
    return {
      alert: {},
      show: false,
      showAlert: false,
      showForm: false,
      events: []
    }

  },
  methods: {
    showNotif(payload) {
      this.$notify({
        title: payload.title,
        type: payload.type
      });
    },
    manageEventForm(payload) {
      this.showForm = payload.show
    },
    closeEventForm() {
      this.showForm = false
    },
  },
  mounted() {
    EventBus.$on('showNotification', payload => {
      this.showNotif(payload)
    });
  }
}
</script>

<style lang="scss">
body {
    width: 1140px;
    margin: 0 auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
