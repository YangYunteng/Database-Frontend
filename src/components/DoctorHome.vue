<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="grey"
      active-text-color="black">
      <el-menu-item index="1" class="pile-right"><span class="el-icon-s-custom"></span>
        <el-popover
          title="Personal"
          placement="bottom"
          trigger="click">
          <table>
            <tr>
              <td>Name:</td>
              <!--<td>{{localStorage.name}}</td>-->
              <td>Doctor1</td>
            </tr>
            <tr>
              <td>Job Number:</td>
              <!--<td>{{localStorage.jobNumber}}</td>-->
              <td>111111</td>
            </tr>
            <tr>
              <td>Ward Number:</td>
              <!--<td>{{localStorage.wardNumber}}</td>-->
              <td>1</td>
            </tr>
            <el-button type="primary" size="mini" style="width: 100%" @click="modify">Modify</el-button>
          </table>
          <el-button slot="reference" type="text">Account</el-button>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="2" class="pile-right"><span class="el-icon-s-comment"></span>Message</el-menu-item>
    </el-menu>

    <el-tabs tab-position="left">
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
      <el-tab-pane label="护士信息">
        <el-table
          :data="nurseData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="jobNumber"
            label="工号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="电话">
          </el-table-column>
          <el-table-column prop="type"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>


</template>

<script>
  export default {
    name: 'DoctorHome',
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
        nurseData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    methods: {
      handler(scope) {
        //console.log(scope);
        //console.log(this.patientData[0].grade === '轻度');
        console.log(this.patientData[scope.$index].status === 0)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      modify() {
        dialogFormVisible = true;
        alert("adssadsa")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pile-right {
    float: right;
    margin-right: 5%;
    font-size: large;
    padding: 5px;
  }

</style>
