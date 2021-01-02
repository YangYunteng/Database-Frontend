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
              <td>{{name}}</td>
            </tr>
            <tr>
              <td>Number:</td>
              <td>{{number}}</td>
            </tr>
            <tr>
              <td>Ward:</td>
              <td>{{ward}}</td>
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
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="护士信息">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


  </div>


</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'}],
        name: JSON.parse(localStorage.getItem('userDetails'))[0],
        number: JSON.parse(localStorage.getItem('userDetails'))[1],
        ward: JSON.parse(localStorage.getItem('userDetails'))[2]

      };
    },
    methods: {
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
