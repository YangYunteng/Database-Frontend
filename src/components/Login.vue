<template>
  <div id="base_login">
    <el-form :model="loginForm"
             :rules="rules"
             ref="loginForm"
             class="login_container"
             label-position="left"
             label-width="0px"
             v-loading="loading">
      <h3 class="login_title">Login</h3>
      <el-form-item prop="jobNumber">
        <el-input type="text"
                  v-model="loginForm.jobNumber"
                  auto-complete="off"
                  placeholder="jobNumber"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="password"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   style="width: 40%;background: #afb4db;border: none"
                   v-on:click="login('loginForm')">login
        </el-button>
        <!--        <router-link to="update">-->
        <!--          <el-button type="primary"-->
        <!--                     style="width: 40%;background: #afb4db;border: none">update</el-button>-->
        <!--        </router-link>-->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          jobNumber: '',
          password: ''
        },
        rules: {
          jobNumber: [{required: true, message: '', trigger: 'blur'}],
          password: [{required: true, message: '', trigger: 'blur'}]
        },
        loading: false
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/login', {
              jobNumber: this.loginForm.jobNumber,
              password: this.loginForm.password
            })
              .then(resp => {
                if (resp.status === 200 && resp.data.result === 1) {
                  this.$store.commit('login', resp.data);
                  switch (resp.data.type) {
                    case 1:
                      this.$router.push("/DoctorHome").catch(err => err);
                      break;
                    case 2:
                      this.$router.push("/HNurseHome").catch(err => err);
                      break;
                    case 3:
                      this.$router.push("/WNurseHome").catch(err => err);
                      break;
                    case 4:
                      this.$router.push("./ENurseHome").catch(err => err);
                  }
                } else {
                  this.$message({
                    showClose: true,
                    message: resp.data.message,
                    type: 'warning'
                  });
                }
              })
              .catch(error => {
                this.$message({
                  showClose: true,
                  message: "登录失败",
                  type: 'danger'
                });
              })
          }

        })
      }
    }
  }
</script>

<style scoped>
  #base_login {
    /*background: url("../assets/background/checkerboard-cross.png") repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
    padding: 0px;
  }

  .login_container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #494e8f;
  }
</style>
