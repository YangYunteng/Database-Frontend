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
              <td>Name： </td>
              <!--<td>{{localStorage.name}}</td>-->
              <td>Doctor1</td>
            </tr>
            <tr>
              <td>Job Number： </td>
              <!--<td>{{localStorage.jobNumber}}</td>-->
              <td>111111</td>
            </tr>
            <tr>
              <td>Ward Number： </td>
              <!--<td>{{localStorage.wardNumber}}</td>-->
              <td>1</td>
            </tr>
            <tr>
              <td>Telephone： </td>
              <!--<td>{{localStorage.wardNumber}}</td>-->
              <td>1829671687</td>
            </tr>
            <br>
            <el-button type="primary" size="mini" style="width: 100%" @click="dialogFormVisible = true">Modify</el-button>
          </table>
          <el-button slot="reference" type="text">Account</el-button>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="2" class="pile-right"><span class="el-icon-s-comment"></span>Message</el-menu-item>
      <el-menu-item class="pile-left">Medical System</el-menu-item>
    </el-menu>

    <div>
      <!-- Form -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="modiForm" :rules="rules"  ref="modiForm">
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

                  } else {

                  }
                })
                .catch(error => {

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
