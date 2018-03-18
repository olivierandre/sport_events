<template>
<div>
  <el-menu :router="true" class="el-menu-demo" mode="horizontal" :default-active="activeIndex">
    <el-menu-item v-for="item in items" :key="item.name" :index="item.path" :to="item.path">{{ item.name }}</el-menu-item>
    <el-popover @show="isShow" @hide="isShow" ref="openeventsform" placement="bottom" width="400" trigger="click">
      <events-form v-if="showForm"></events-form>
    </el-popover>
    <el-menu-item index="">
      <el-button v-popover:openeventsform>Add a event</el-button>
    </el-menu-item>
  </el-menu>
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
    isShow() {
      this.showForm = !this.showForm
    },
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
    }
  },
  created() {
    this.generateRoutes()
  }
}
</script>


<style scoped>

</style>
