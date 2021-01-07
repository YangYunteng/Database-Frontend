<template>
  <div>
    <div>
      <!-- Form -->
      <el-dialog title="增加护士" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item prop="name">
            <el-input type="text" v-model="addForm.name" autocomplete="off" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input type="text" v-model="addForm.telephone" autocomplete="off" placeholder="手机"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('addForm')">取 消</el-button>
          <el-button type="primary" @click="addNurse('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-table :data="wnurseInfo" stripe style="width: 100%">
      <el-table-column
        prop="jobNumber"
        label="工号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机"
        width="150">
      </el-table-column>
      <el-table-column
        prop="patients"
        label="病人">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" round @click="deleteNurse(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button icon="el-icon-plus" type="primary" plain @click="dialogFormVisible = true" style="float: left;margin: 2%">增加护士</el-button>

  </div>
</template>

<script>
  export default {
    name: "WNurseInfo",
    data() {
      return {
        dialogFormVisible: false,
        addForm: {
          name: '',
          telephone: ''
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          telephone: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
        wnurseInfo: [{jobNumber:1,name:'asd',telephone:1546666,patients:'张三-李四-王二麻子'}]
      }
    },
    methods: {
      addNurse(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/addNurse', {
              wardNumber: 1,//localStorage里读取
              name: this.addForm.name,
              telephone: this.addForm.telephone
            })
              .then(resp => {

              })
              .catch(error => {

              })
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      deleteNurse(scope){
        this.$axios.post('/deleteNurse', {
          jobNumber:this.wnurseInfo[scope.$index].jobNumber
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
