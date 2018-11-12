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
      <el-button type="success" plain @click="showAddDialog">用户添加</el-button>
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
            inactive-color="#ff4949" @change="changeState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="small" plain @click="showEditDialog(scope.row)"></el-button>
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
     <!-- 添加用户的对话框 -->
     <!-- el-dialog: 对话框组件  -->
     <!-- visible: 控制对话框的显示隐藏 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input placeholder="请输入电话" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户功能 -->
    <el-dialog title="修改用户"
    :visible.sync="editDialogVisible"
    width="40%">
      <el-form ref="editForm" :model="editForm" :rules="rules" status-icon label-width="80px">
          <el-form-item lable="用户名">
            <el-tag type="info">{{editForm.username}}</el-tag>
          </el-form-item>
          <el-form-item lable="邮箱" prop="email">
            <el-input placehoder="请输入邮箱" v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item lable="电话" prop="mobile">
            <el-input placehoder="请输入电话" v-model="editForm.mobile"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      userList: [],
      // 控制添加用户对话框的显示隐藏
      addDialogVisible: false,
      // 添加用户的数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单的校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的格式的邮箱', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      // 控制修改用户对话框的显示隐藏
      editDialogVisible: false,
      // 修改用户的表单数据
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户列表信息
    getUserList() {
      // 发送ajax请求,获取用户列表数据
      this.axios
        .get('users', {
          params: {
            query: this.query,
            pagenum: this.currentPage,
            pagesize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res)
          let { meta: { status }, data: { users, total } } = res
          if (status === 200) {
            this.userList = users
            this.total = total
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
          return this.axios({
            method: 'delete',
            url: `users/${id}`
          })
        })
        .then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
            // 重新渲染
            if (this.userList.length === 1 && this.currentPage > 1) {
              this.currentPage--
            }
            this.getUserList()
            // 2. 提示删除成功
            this.$message.success('删除成功!')
          }
        })
        .catch(() => {
          this.$message.success('已取消删除!')
        })
    },
    search() {
      this.getUserList()
    },
    changeState({ id, mg_state: mgState }) {
      this.axios({
        url: `users/${id}/state/${mgState}`,
        method: 'put'
      }).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('修改状态成功')
        } else {
          this.$message.error('修改状态失败')
        }
      })
    },
    showAddDialog() {
      this.addDialogVisible = true
    },
    addUser() {
      this.$refs.addForm.validate(valid => {
        if (!valid) return false
        // 成功
        this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        }).then(res => {
          console.log(res)

          let { meta: { status } } = res
          if (status === 201) {
            this.total++
            this.currentPage = Math.ceil(this.total / this.pageSize)
            // 重新渲染
            this.getUserList()
            // 隐藏模态框
            this.addDialogVisible = false
            // 清空表单
            this.$refs.addForm.resetFields()
          }
        })
      })
    },
    // 显示修改用户对话框
    showEditDialog(user) {
      this.editDialogVisible = true
      // console.log(user)
      //  让数据辉县,把user中的值复制到editForm中
      this.editForm.id = user.id
      this.editForm.username = user.username
      this.editForm.email = user.email
      this.editForm.mobile = user.mobile
    },
    // 修改用户
    editUser() {
      this.$refs.editForm.validate(valid => {
        if (!valid) return false
        this.axios({
          method: 'put',
          url: `users/${this.editForm.id}`,
          data: this.editForm
        }).then(res => {
          let { meta: { status } } = res
          if (status === 200) {
            // 重新渲染数据
            this.getUserList()
            // 重置表单
            this.$refs.editForm.resetFields()
            // 隐藏对话框
            this.editDialogVisible = false
          }
        })
      })
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
