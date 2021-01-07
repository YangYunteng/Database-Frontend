<template>
  <div>
    <div style="float: left;margin: 2%">
      <i><b>筛选条件：</b></i>
      <el-select v-model="value" @change="query" v-show="type==1||type==2">
        <el-option
          v-for="item in option1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value" @change="query" v-show="type==4">
        <el-option
          v-for="item in option2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value" @change="query" v-show="type==3">
        <el-option
          v-for="item in option3"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

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
          {{statusDic[patientData[scope.$index].status]}}
          <!--          <el-tag type="success" v-show="patientData[scope.$index].status===0">出院</el-tag>-->
          <!--          <el-tag type="warning" v-show="patientData[scope.$index].status===1">治疗中</el-tag>-->
          <!--          <el-tag type="danger" v-show="patientData[scope.$index].status===2">死亡</el-tag>-->
        </template>

      </el-table-column>
      <el-table-column
        label="严重程度"
        width="250">
        <template slot-scope="scope">
          {{gradeDic[patientData[scope.$index].grade]}}
          <!--          <el-tag type="success" v-show="patientData[scope.$index].grade===0">治愈</el-tag>-->
          <!--          <el-tag type="info" v-show="patientData[scope.$index].grade===1">轻度</el-tag>-->
          <!--          <el-tag type="warning" v-show="patientData[scope.$index].grade===2">中度</el-tag>-->
          <!--          <el-tag type="danger" v-show="patientData[scope.$index].grade===3">重度</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-popover
            ref="popover"
            placement="left"
            width="400"
            trigger="click">
            <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="120px">
              <el-form-item prop="grade" label="病情评级：">
                <el-radio-group v-model="updateForm.grade">
                  <el-radio :label="1">轻</el-radio>
                  <el-radio :label="2">中</el-radio>
                  <el-radio :label="3">重</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="status" label="生命状态：">
                <el-radio-group v-model="updateForm.status">
                  <el-radio :label="1">出院</el-radio>
                  <el-radio :label="2">治疗中</el-radio>
                  <el-radio :label="3">死亡</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="checkResult" label="检测结果：">
                <el-radio-group v-model="updateForm.checkResult">
                  <el-radio :label="1">阴性</el-radio>
                  <el-radio :label="2">阳性</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="update('updateForm',scope)">提交</el-button>
                <el-button @click="cancel('updateForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" v-show="type==1" type="primary" round>更新</el-button>
          </el-popover>
          <el-button v-show="type==1&&wardNumber==1" type="success" round @click="leave(scope)">出院</el-button>

          <!--          <el-button v-show="type==1" @click="handler(scope)">修改</el-button>-->
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
  export default {
    name: "PatientInfo",
    data() {
      return {
        updateForm: {
          grade: '',
          status: '',
          checkResult: '',
        },
        updateRules: {
          grade: [{required: true, message: '不能为空', trigger: 'blur'}],
          status: [{required: true, message: '不能为空', trigger: 'blur'}],
          checkResult: [{required: true, message: '不能为空', trigger: 'blur'}]
        },
        statusDic: ['', '出院', '治疗中', '死亡'],
        gradeDic: ['', '轻度', '中度', '重度', '治愈'],
        type: localStorage.type, //localStorage中读取
        wardNumber: localStorage.wardNumber,
        option1: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '1',
          label: '满足出院条件'
        }, {
          value: '2',
          label: '待转入其他病区'
        }],
        option2: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '3',
          label: '轻病区'
        }, {
          value: '4',
          label: '中病区'
        }, {
          value: '5',
          label: '重病区'
        }, {
          value: '6',
          label: '隔离区'
        }, {
          value: '7',
          label: '轻病级'
        }, {
          value: '8',
          label: '中病级'
        }, {
          value: '9',
          label: '重病级'
        }],
        option3: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '1',
          label: '满足出院条件'
        }],
        value: '',
        patientData: [
          {id: 1, name: 'asd', status: 1, grade: 1}
        ],
      }
    },
    methods: {
      leave(scope) {
        this.$axios.post('/leaveHospital', {
          patientID: this.patientData[scope.$index].id,
        })
          .then(resp => {
            console.log(resp);
            if (resp.status === 200 && resp.data.result === 1) {

            } else {

            }
          })
          .catch(error => {

          })

      },
      cancel(formName) {
        this.$refs.popover.showPopper = false;
        this.$refs[formName].resetFields();
      },
      update(formName, scope) {
        this.$refs.popover.showPopper = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/updatePatientInfo', {
              patientID: this.patientData[scope.$index].id,
              grade: this.updateForm.grade,
              status: this.updateForm.status,
              checkResult: this.updateForm.checkResult,
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
      },

      query() {
        alert(this.gradeDic[1]);
        this.patientData = [
          {id: this.value, name: 'dsa', status: this.value, grade: 0}
        ]
        // this.$axios.post('/patientInfo', {
        //   jobNumber: this.modiForm.jobNumber,
        //   queryCondition: this.value
        // })
        //   .then(resp => {
        //     console.log(resp);
        //     if (resp.status === 200 && resp.data.result === 1) {
        //
        //     } else {
        //
        //     }
        //   })
        //   .catch(error => {
        //
        //   })

      }
    },
    created() {
      const _this = this;
      this.$axios.post('/patientInfo', {
        jobNumber: this.$store.state.jobNumber,
        queryCondition: 0
      })
        .then(resp => {
          console.log(resp);
          if (resp.status === 200 && resp.data.result === 1) {
            _this.patientData = resp.data.patientData;
          } else {

          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>

<style scoped>

</style>
