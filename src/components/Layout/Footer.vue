<template>
<div>
  <el-menu :router="true" class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
    <el-menu-item v-for="item in items" :key="item.name" :index="item.path" :to="item.path" @click="changeRoute()">{{ item.name }}</el-menu-item>
    <!-- <el-popover @show="isShow" @hide="isShow" ref="openeventsform" placement="bottom" width="400" trigger="click">
      <events-form v-if="showForm"></events-form>
    </el-popover> -->
    <b-button @click="showModal">
      Add a event
    </b-button>
    <b-modal ref="eventRef" hide-footer title="Add an event">
      <events-form v-if="showForm"></events-form>
    </b-modal>
    <!-- <el-menu-item index="">
      <el-button v-popover:openeventsform>Add a event</el-button>
    </el-menu-item> -->
  </el-menu>
</div>
</template>

<script>
import EventsForm from "../Events/EventsForm"
export default {
  name: 'foo-ter',
  components: {
    EventsForm
  },
  props: {
    currentRoute: {
      type: String
    }
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
    generateRoutes() {
      var currentRouteName = this.$route.name
      this.$router.options.routes.forEach(route => {
        var path = route.path
        this.items.push({
          path: path,
          name: route.name
        })
        if (route.name == currentRouteName) {
          this.activeIndex = path
        }
      })
    },
    changeRoute() {
      this.$emit('changeRoute');
    },
    showModal() {
      this.showForm = !this.showForm
      this.$refs.eventRef.show()
    },
    hideModal() {
      this.showForm = !this.showForm
      this.$refs.eventRef.hide()
    }
  },
  created() {
    this.generateRoutes()
  },
  watch: {
    currentRoute: function () {
      this.activeIndex = this.currentRoute;
    }
  }
}
</script>


<style scoped>

</style>
