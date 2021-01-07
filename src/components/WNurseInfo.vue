<template>
  <div>
    <el-table :data="wnurseInfo" stripe style="width: 100%">
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
        label="病人">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "WNurseInfo",
    data() {
      return {
        wnurseInfo: []
      }
    },
    created() {
      const _this = this;
      // this.$axios.post('/wnurseInfo', {
      //   wardNumber: this.$store.state.wardNumber,
      // })
      //   .then(resp => {
      //     console.log(resp);
      //     if (resp.status = 200 && resp.data.result === 1) {
      //       _this.wnurseInfo = resp.data.wnurseInfo;
      //       console.log(this.wnurseInfo);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    }
  }
</script>

<style scoped>

</style>
