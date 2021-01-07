<template>
  <div>
    <Navigation></Navigation>

    <!--    查询&筛选-->
    <el-tabs tab-position="left">

      <!--      查看病人信息-->
      <el-tab-pane label="病人信息">
        <PatientInfo></PatientInfo>
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

      }
    },
    methods: {


    }
  }
</script>

<style scoped>

</style>
