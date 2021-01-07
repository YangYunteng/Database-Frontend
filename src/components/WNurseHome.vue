<template>
  <div>
    <Navigation></Navigation>

    <!--    查询&筛选-->
    <el-tabs tab-position="left">

      <!--      查看病人信息-->
      <el-tab-pane label="病人信息">
        <PatientInfo></PatientInfo>
      </el-tab-pane>

      <!--      每日登记-->
      <el-tab-pane label="每日登记">
        <div style="width: 40%;padding: 2%">
          <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">
            <el-form-item prop="status" label="生命状态：">
              <el-radio-group v-model="registerForm.status">
                <el-radio :label="1">出院</el-radio>
                <el-radio :label="2">治疗中</el-radio>
                <el-radio :label="3">死亡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="temperature" label="体温：">
              <el-input type="text" v-model="registerForm.temperature" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="symptoms" label="症状：">
              <el-input type="text" v-model="registerForm.symptoms" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkResult" label="病情等级：">
              <el-radio-group v-model="registerForm.checkResult">
                <el-radio :label="1">阴性</el-radio>
                <el-radio :label="2">阳性</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="date" label="日期：">
              <el-date-picker
                v-model="registerForm.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
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
    name: "WNurseHome",
    components: {Navigation, PatientInfo},
    data() {
      return {
        registerForm: {
          temperature: '',
          symptoms: '',
          status: '',
          checkResult: '',
          date: ''
        },
        rules: {
          temperature: [{required: true, message: '不能为空', trigger: 'blur'}],
          symptoms: [{required: true, message: '不能为空', trigger: 'blur'}],
          status: [{required: true, message: '不能为空', trigger: 'blur'}],
          checkResult: [{required: true, message: '不能为空', trigger: 'blur'}],
          date: [{required: true, message: '不能为空', trigger: 'blur'}]
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

                } else {

                }
              })
              .catch(error => {

              })
          }
        })
      }

    }
  }
</script>

<style scoped>

</style>
