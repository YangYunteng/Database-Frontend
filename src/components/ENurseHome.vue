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
          <el-form :model="patientRegister" :rules="rules" ref="patientRegister" label-width="120px">
            <el-form-item prop="name" label="姓名：">
              <el-input type="text" v-model="patientRegister.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="grade" label="病情等级：">
              <el-radio-group v-model="patientRegister.grade">
                <el-radio :label="1">轻度</el-radio>
                <el-radio :label="2">中度</el-radio>
                <el-radio :label="3">重度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sendPatientRegister('patientRegister')">提交</el-button>
              <el-button @click="cancel('patientRegister')">重置</el-button>
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
        patientRegister: {
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
      sendPatientRegister(formName) {
        console.log("123");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/patientRegister', {
              name: this.patientRegister.name,
              grade: this.patientRegister.grade
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
                this.patientRegister.name = '';
                this.patientRegister.grade = 1;
              })
              .catch(err => {
                console.log(err);
              })
          }
        })
      },

    }
  }

</script>

<style scoped>

</style>
