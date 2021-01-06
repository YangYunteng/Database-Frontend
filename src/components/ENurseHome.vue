<template>
  <div>

    <!--    查询&筛选-->
    <el-tabs tab-position="left">

<!--      查看病人信息-->
      <el-tab-pane label="病人信息">
        <el-table :data="patientData" stripe style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="250">
          </el-table-column>
          <el-table-column
            label="生命体征"
            width="250">
            <template slot-scope="scope">
              <el-tag type="success" v-show="patientData[scope.$index].status===0">出院</el-tag>
              <el-tag type="warning" v-show="patientData[scope.$index].status===1">治疗中</el-tag>
              <el-tag type="danger" v-show="patientData[scope.$index].status===2">死亡</el-tag>
            </template>

          </el-table-column>
          <el-table-column
            label="严重程度"
            width="250">
            <template slot-scope="scope">
              <el-tag type="success" v-show="patientData[scope.$index].grade===0">治愈</el-tag>
              <el-tag type="info" v-show="patientData[scope.$index].grade===1">轻度</el-tag>
              <el-tag type="warning" v-show="patientData[scope.$index].grade===2">中度</el-tag>
              <el-tag type="danger" v-show="patientData[scope.$index].grade===3">重度</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <!--<el-button @click="handler(scope)"></el-button>-->
              <!--此地方前后端统一时，需要去完成-->
              <el-button @click='handler(scope)' v-show="patientData[scope.$index].grade===1" type="primary"
                         size="small">转入其他病区
              </el-button>
              <el-button v-show="patientData[scope.$index].status===0" type="primary" size="small">出院</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  export default {
    name: "ENurseHome",
    data() {
      return {
        patientData: [
          {
            id: '1',
            name: '王小虎1',
            status: 0,
            grade: 0
          },
          {
            id: '2',
            name: '王小虎2',
            status: 1,
            grade: 2
          },
          {
            id: '3',
            name: '王小虎3',
            status: 2,
            grade: 1
          },
        ],
        registerForm: {
          name: '',
          grade:1
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
