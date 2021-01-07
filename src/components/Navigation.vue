<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="white"
      text-color="grey"
      active-text-color="black">

      <!--      账户-->
      <el-menu-item index="1" class="pile-right">
        <el-popover
          title="个人信息"
          placement="bottom"
          trigger="click">
          <table>
            <tr>
              <td>Name：</td>
              <td>{{this.$store.state.name}}</td>
            </tr>
            <tr>
              <td>Job Number：</td>
              <td>{{this.$store.state.jobNumber}}</td>
            </tr>
            <tr>
              <td>Ward Number：</td>
              <td>{{this.$store.state.wardNumber}}</td>
            </tr>
            <tr>
              <td>Telephone：</td>
              <td>{{this.$store.state.telephone}}</td>
            </tr>
            <tr><br></tr>
            <tr>
              <td>
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">Modify</el-button>
              </td>
              <td>
                <el-button type="primary" size="mini" @click="logout()">Logout</el-button>
              </td>
            </tr>


          </table>
          <span slot="reference" type="text"><span class="el-icon-s-custom"></span>Account</span>
        </el-popover>
      </el-menu-item>

      <!--      信箱-->
      <el-menu-item index="2" class="pile-right">
        <el-popover
          placement="bottom"
          trigger="click">
          <el-table :data="messageData">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
            <el-table-column width="300" property="address" label="地址"></el-table-column>
          </el-table>
          <span slot="reference" type="text"><span class="el-icon-s-comment"></span>Message</span>
        </el-popover>


      </el-menu-item>
      <el-menu-item class="pile-left">Medical System</el-menu-item>
    </el-menu>

    <div>
      <!-- Form -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="modiForm" :rules="rules" ref="modiForm">
          <el-form-item prop="name">
            <el-input type="text" v-model="modiForm.name" autocomplete="off" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="oldPass">
            <el-input type="password" v-model="modiForm.oldPass" autocomplete="off" placeholder="旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPass">
            <el-input type="password" v-model="modiForm.newPass" autocomplete="off" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input type="text" v-model="modiForm.telephone" autocomplete="off" placeholder="手机"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('modiForm')">取 消</el-button>
          <el-button type="primary" @click="modify('modiForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data() {
      return {
        messageData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogFormVisible: false,
        modiForm: {
          jobNumber: localStorage.getItem('jobNumber'),
          name: '',
          oldPass: '',
          newPass: '',
          telephone: ''
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          oldPass: [{required: true, message: '不能为空', trigger: 'blur'}],
          newPass: [{required: true, message: '不能为空', trigger: 'blur'}],
          telephone: [{required: true, message: '不能为空', trigger: 'blur'}],
        }
      };
    },
    methods: {
      handler(scope) {
        //console.log(scope);
        //console.log(this.patientData[0].grade === '轻度');
        // console.log(this.patientData[scope.$index].status === 0)
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      logout() {
        this.$router.push("/").catch(err => err);
        this.$store.commit('logout');
      },
      modify(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/modifyUser', {
              jobNumber: this.modiForm.jobNumber,
              name: this.modiForm.name,
              oldPass: this.modiForm.oldPass,
              newPass: this.modiForm.newPass,
              telephone: this.modiForm.telephone
            })
              .then(resp => {
                console.log(resp);
                if (resp.status === 200 && resp.data.result === 1) {
                  localStorage.setItem("name", this.modiForm.name);
                  localStorage.setItem("telephone", this.modiForm.telephone);
                  this.$store.state.name = this.modiForm.name;
                  this.$store.state.telephone = this.modiForm.telephone;
                  this.dialogFormVisible = false;
                  this.modiForm.name = '';
                  this.modiForm.oldPass = '';
                  this.modiForm.newPass = '';
                  this.modiForm.telephone = '';
                  this.$message({
                    showClose: true,
                    message: resp.data.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: resp.data.message,
                    type: 'warning'
                  });
                }
              })
              .catch(error => {
                console.log(error);
                this.$message({
                  showClose: true,
                  message: "修改失败chucuo",
                  type: 'danger'
                });
              })
          }
        })
      }
    }

  }
</script>

<style scoped>
  .pile-right {
    float: right;
    margin-right: 5%;
    font-size: large;
    padding: 5px;
  }

  .pile-left {
    font-size: large;
    padding: 5px;
    margin-left: 2%;
    font-family: "Segoe Script";
    font-weight: bold;
  }
</style>
