<template>
<el-container>
  <el-main v-if="show">
    <el-form :rules="rules" ref="form" :model="currentUser" label-position="left">
      <el-form-item label="Name" prop="name">
        <el-input placeholder="Your name" v-model="currentUser.name"></el-input>
      </el-form-item>

      <el-form-item label="Address">
        <el-input placeholder="Your address" v-model="currentUser.address"></el-input>
      </el-form-item>

      <el-form-item label="Town">
        <el-input placeholder="Your town" v-model="currentUser.town"></el-input>
      </el-form-item>

      <el-form-item label="Birthday">
        <el-date-picker value-format="dd/MM/yyyy" format="dd/MM/yyyy" align="left" placeholder="Your birthday" v-model="currentUser.birthday"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Update</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</el-container>
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
      show: false
    }

  },
  methods: {
    getCurrentUser() {
      axios.get('/api/profile').then(results => {
        this.currentUser = results.data.users[0]
        this.show = true;
      })
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
  }
}
</script>


<style lang="scss" scoped>
p {
    text-align: left;
}
</style>
