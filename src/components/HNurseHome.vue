<template>
  <div>
    <Navigation></Navigation>

    <!--    查询&筛选-->
    <el-tabs tab-position="left">

      <!--      查看病人信息-->
      <el-tab-pane label="病人信息">
        <PatientInfo></PatientInfo>
      </el-tab-pane>

      <!--      病房护士-->
      <el-tab-pane label="病房护士">
        <WNurseInfo></WNurseInfo>
      </el-tab-pane>

      <!--      病床信息-->
      <el-tab-pane label="病床信息">
        <el-table :data="BedForm" stripe style="width: 100%">
          <el-table-column
            prop="roomNumber"
            label="房号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bedNumber"
            label="床号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="病床状态"
            width="150">
            <template slot-scope="scope">
              {{statusDic[BedForm[scope.$index].status]}}
            </template>

          </el-table-column>
          <el-table-column
            prop="patientID"
            label="病号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="patientName"
            label="病人姓名"
            width="150">
          </el-table-column>
        </el-table>
      </el-tab-pane>


    </el-tabs>
  </div>

</template>

<script>
  import Navigation from "./Navigation";
  import PatientInfo from "./PatientInfo";
  import WNurseHome from "./WNurseHome";
  import WNurseInfo from "./WNurseInfo";

  export default {
    name: "HNurseHome",
    components: {WNurseInfo, Navigation, PatientInfo, WNurseHome},
    data() {
      return {
        statusDic: ['空位', '占用中'],
        BedForm: [
          {roomNumber: '1', bedNumber: '1', status: '1', patientID: '1', patientName: 'asd'}
        ],
      }
    },
    methods: {},

    created() {
      const _this = this;
      this.$axios.post('/bedInfo', {
        wardNumber: localStorage.getItem("wardNumber")
      })
        .then(resp => {
          console.log(resp);
          if (resp.status === 200 && resp.data.result === 1) {
            _this.BedForm = resp.data.bedInfo;
          } else {
            this.$message({
              showClose: true,
              message: "数据加载失败",
              type: 'warning'
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style scoped>

</style>
