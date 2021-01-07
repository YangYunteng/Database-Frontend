<template>
  <div>

    <Navigation></Navigation>

<!--    查询&筛选-->
    <el-tabs tab-position="left">

      <el-tab-pane label="病人信息">
        <PatientInfo></PatientInfo>
      </el-tab-pane>

      <el-tab-pane label="护士长信息">
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

      <el-tab-pane label="病房护士">
        <WNurseInfo></WNurseInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Navigation from "./Navigation";
  import PatientInfo from "./PatientInfo";
  import WNurseInfo from "./WNurseInfo";
  export default {
    name: 'DoctorHome',
    components:{Navigation, PatientInfo,WNurseInfo},
    data() {
      return {
        nurseData: [],
        dialogFormVisible: false,
        modiForm: {
          jobNumber:localStorage.getItem('jobNumber'),
          name: '',
          oldPass:'',
          newPass:'',
          telephone:''
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          oldPass: [{required: true, message: '不能为空', trigger: 'blur'}],
          newPass: [{required: true, message: '不能为空', trigger: 'blur'}],
          telephone: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
      };
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
