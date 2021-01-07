<template>
  <div>
    <el-table :data="wNurseForm" stripe style="width: 100%">
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
        label="手机"
        width="250">
      </el-table-column>
      <el-table-column
        prop="patients"
        label="病人"
        width="250">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "WNurseInfo",
    data() {
      return {
        wNurseForm: {
          jobNumber: '',
          name: '',
          telephone: '',
          patients: []
        },
      }
    }
  }
</script>

<style scoped>

</style>
