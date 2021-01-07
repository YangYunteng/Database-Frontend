<template>
  <div>
    <Navigation></Navigation>

    <!--    查询&筛选-->
    <el-tabs tab-position="left">

      <!--      查看病人信息-->
      <el-tab-pane label="病人信息">
        <PatientInfo></PatientInfo>
      </el-tab-pane>

      <!--      登记病人信息-->
      <el-tab-pane label="登记病人信息">
        <div style="width: 40%;padding: 2%">
          <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">
            <el-form-item prop="name" label="姓名：">
              <el-input type="text" v-model="registerForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="grade" label="病情等级：">
              <el-radio-group v-model="registerForm.grade">
                <el-radio :label="1">轻度</el-radio>
                <el-radio :label="2">中度</el-radio>
                <el-radio :label="3">重度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register('registerForm')">提交</el-button>
              <el-button @click="cancel('registerForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import Navigation from "./Navigation";
  import PatientInfo from "./PatientInfo";

  export default {
    name: "ENurseHome",
    components: {Navigation, PatientInfo},
    data() {
      return {
        registerForm: {
          name: '',
          grade: 1
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          grade: [{required: true, message: '不能为空', trigger: 'blur'}]
        }
      }
    },
    methods: {
      cancel(formName) {
        this.$refs[formName].resetFields();
      },
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/patientRegister', {
              name: this.registerForm.name,
              grade: this.registerForm.grade
            })
              .then(resp => {
                console.log(resp);
                if (resp.status === 200 && resp.data.result === 1) {
                  this.$message({
                    showClose: true,
                    message: resp.data.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: resp.data.message,
                    type: 'warning'
                  });
                }
                this.registerForm.name = '';
                this.registerForm.grade = 1;
              })
              .catch(err => {
                console.log(err);
              })
          }
        })
      }

    }
  }

</script>

<style scoped>

</style>
