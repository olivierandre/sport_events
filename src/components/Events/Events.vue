<template>
<el-container>
  <el-main>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h2>Events list</h2>
          <el-table :data="events" style="width: 100%">
            <el-table-column prop="id" label="#" width="45" align="center">
            </el-table-column>
            <el-table-column prop="date" label="Date" width="180" align="center">
            </el-table-column>
            <el-table-column prop="name" label="Name Event" width="180" align="center">
            </el-table-column>
            <el-table-column prop="user" label="Organisateur" width="180" align="center">
            </el-table-column>
            <el-table-column prop="address" label="Address" align="center">
            </el-table-column>
            <el-table-column prop="sport" label="Sport" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </el-main>
</el-container>
</template>

<script>
import axios from 'axios';
import EventBus from '../../event-bus';

export default {
  name: 'event',
  data() {
    return {
      events: []
    }
  },
  methods: {
    getAllEvents() {
      axios.get('/api/events').then(results => {
        this.events = results.data.events
      })
    },
  },
  created() {
    this.getAllEvents()
  },
  mounted() {
    EventBus.$on('updateEvents', events => {
      this.events = events.data.events;
    });
  }
}
</script>

<style></style>
