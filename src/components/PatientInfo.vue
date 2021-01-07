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

      <el-select v-model="value" @change="query"  v-show="type==4">
        <el-option
          v-for="item in option2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value" @change="query"  v-show="type==3">
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
          <el-button v-show="patientData[scope.$index].grade===1" type="primary" size="small">转入其他病区</el-button>

          <el-button v-show="patientData[scope.$index].status===0" type="primary" size="small">出院</el-button>
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
        type: 2,
        option1: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '1',
          label: '满足出院条件'
        }, {
          value: '2',
          label: '待转入其他病区'
        },{
          value: '3',
          label: '已出院'
        },{
          value: '11',
          label: '治疗中'
        },{
          value: '12',
          label: '已死亡'
        }],
        option2: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '3',
          label: '生命状态'
        },{
          value: '4',
          label: '轻病区'
        }, {
            value: '5',
            label: '中病区'
          },{
            value: '6',
            label: '重病区'
          },{
            value: '7',
            label: '隔离区'
          },{
            value: '8',
            label: '轻病级'
          },{
            value: '9',
            label: '中病级'
          },{
            value: '10',
            label: '重病级'
          },{
          value: '11',
          label: '治疗中'
        },{
          value: '12',
          label: '已死亡'
        }],
        option3: [{
          value: '0',
          label: '无筛选'
        }, {
          value: '1',
          label: '满足出院条件'
        },{
          value: '3',
          label: '生命状态'
        },{
        value: '11',
          label: '治疗中'
      },{
        value: '12',
          label: '已死亡'
      }],
        value: '',
        patientData: [],
      }
    },
    methods: {
      query(){
        alert(this.value)
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
    }
  }
</script>

<style scoped>

</style>
