<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框功能 -->
    <div>
      <el-input placeholder="请输入关键字" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain>用户添加</el-button>
    </div>
    <!-- 表格展示功能 -->
      <!-- el-table 表格组件 -->
      <!-- :data="tableData" 需要给表格组件传递数据 -->
      <!-- el-table-column: 表格的一列 -->
      <!-- label: 这一列的标题 -->
      <!-- prop: 这一列对应的属性名 -->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="small" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="small" @click="delUser(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <!-- size-change: pageSize 改变时会触发 -->
    <!-- current-change: 当前页改变时触发 -->
    <!-- current-page: 当前页 -->
    <!-- page-sizes: 每页显示的条数选项 -->
    <!-- page-size: 每页显示条目个数 -->
    <!-- layout: 控制分页的子组件的显示 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 查询关键字
      query: '',
      // 当前页码
      currentPage: 1,
      // 每页显示的条数
      pageSize: 2,
      // 总条数
      total: 0,
      // 页面列表的数据
      userList: []
    }
  },
  methods: {
    // 获取用户列表信息
    getUserList() {
      // 发送ajax请求,获取用户列表数据
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query: this.query,
            pagenum: this.currentPage,
            pagesize: this.pageSize
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          }
        })
    },
    // 当前页发生改变时触发
    handleCurrentChange(val) {
      // 修改当前页
      this.currentPage = val
      this.getUserList()
    },
    // 每页条数发生改变时触发 , 把页码改成1效果更好
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      // 重新渲染
      this.getUserList()
    },
    // 删除用户
    delUser(id) {
      this.$confirm('你确定要删除这个用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 重新渲染
              if (this.userList.length === 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getUserList()
              // 2. 提示删除成功
              this.$message.success('删除成功!')
            }
          })
        })
        .catch(() => {
          this.$message.success('已取消删除!')
        })
    },
    search() {
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}
.input-with-select {
  margin-bottom: 10px;
  width: 300px;
}
</style>
