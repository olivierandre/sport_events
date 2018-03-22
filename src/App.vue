<template>
<b-container fluid>
  <div id="app" class="page-container">
    <nav-bar @createEvent="manageEventForm" @showNotification="showNotif" @changeRoute="changeRoute"></nav-bar>
    <router-view @showNotification="showNotif"></router-view>
    <foo-ter @createEvent="manageEventForm" @showNotification="showNotif" @changeRoute="changeRoute" :currentRoute="path"></foo-ter>
  </div>
</b-container>
</template>


<script>
import NavBar from "./components/Layout/NavBar"
import FooTer from "./components/Layout/Footer"
import EventBus from "./event-bus"
export default {
  name: 'app',
  components: {
    NavBar,
    FooTer
  },
  data() {
    return {
      alert: {},
      show: false,
      showAlert: false,
      showForm: false,
      events: [],
      path: 'Events'
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
    changeRoute() {
      this.path = this.$route.path
    }
  },
  mounted() {
    EventBus.$on('showNotification', payload => {
      this.showNotif(payload)
    });
    this.changeRoute()

  }
}
</script>

<style lang="scss">
body {
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
