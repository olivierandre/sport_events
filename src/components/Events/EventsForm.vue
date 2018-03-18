<template>
<el-container>
  <el-main>
    <el-form :rules="rules" ref="add_event" :model="evt" label-position="top">
      <el-form-item label="Id">
        <el-input :disabled="true " v-model="evt.id "></el-input>
      </el-form-item>

      <el-form-item label="Name" prop="name">
        <el-input placeholder="Name event " v-model="evt.name "></el-input>
      </el-form-item>

      <el-form-item label="Meeting point" prop="name">
        <el-input placeholder="Meeting point " v-model="evt.address "></el-input>
      </el-form-item>

      <el-form-item label="Choose sport" prop="sport">
        <el-select v-model="evt.sport " placeholder="Select sport">
          <el-option v-for="sport in sports " :key="sport.id " :label="sport.name " :value="sport.name ">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Date event" prop="date">
        <el-date-picker value-format="dd/MM/yyyy" format="dd/MM/yyyy" align="right" size="large" v-model="evt.date"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="onSubmit( 'add_event') ">Create event</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</el-container>
</template>

<script>
import axios from 'axios';
import EventBus from '../../event-bus';
export default {
  name: 'event-form',
  data() {
    return {
      evt: {
        date: '',
        address: '',
        sport: '',
        id: ''
      },
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
        date: [
          {
            required: true,
            message: 'Please input a date',
            trigger: 'blur'
          }
        ],
        sport: [
          {
            required: true,
            message: 'Please choose a sport',
            trigger: 'blur'
          }
        ]
      },
      sports: [],
      user: {}
    }
  },
  methods: {
    clear() {
      this.evt.name = ''
      this.evt.date = ''
      this.evt.sport = ''
      this.evt.address = ''
      this.evt.id = this.evt.id + 1
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/events', {
            id: this.evt.id,
            date: this.evt.date,
            sport: this.evt.sport,
            name: this.evt.name,
            user: this.user.name,
            address: this.evt.address
          }).then(results => {
            this.clear()
            EventBus.$emit('showNotification', {
              title: 'Event created',
              type: 'success'
            });
            EventBus.$emit('updateEvents', results);
          })

        } else {
          EventBus.$emit('showNotification', {
            title: 'Event invalid',
            type: 'error'
          });
        }
      });
    },
  },
  created() {
    axios.get('/api/sports').then(results => {
      this.sports = results.data.sports
    })
    axios.get('/api/events/id').then(results => {
      this.evt.id = results.data.id[0] + 1
    })
    axios.get('/api/profile').then(results => {
      this.user = results.data.users[0]
    })
  },
  mounted() {
    //this.showForm()
  }
}
</script>

<style></style>
