<template>
    <el-container class="home">
      <el-header>
        <div class="logo">
        </div>
        <div class="loginOut">
          欢迎观临
          <a href="javascript:;" @click="logout">退出</a>
        </div>
        <div class="title">电商后台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- el-menu : 菜单组件  -->
          <!-- default-active: 默认选中的菜单 -->
          <!-- el-submenu : 子菜单 -->
          <!-- template: 表示子菜单的内容 -->
          <!-- el-menu-item-group: 表示子菜单的分组 -->
          <!-- el-menu-item: 子菜单的项 -->
          <!-- unique-opened: 最多只能打开一个子菜单  -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <!-- 放菜单项 -->
                <el-menu-item index="/users">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
            </el-submenu>
             <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
                <el-menu-item index="2-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">权限列表</span>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 配置子路由的出口 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          // 跳转到登录页
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    .logo {
      float: left;
      width: 180px;
      height: 60px;
      background-image: url('../assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .loginOut {
      width: 180px;
      height: 60px;
      float: right;
      line-height: 60px;
      font-weight: bold;
      text-align: right;
      a {
        color: darkorange;
      }
    }
    .title {
      text-align: center;
      line-height: 60px;
      font-size: 28px;
      color: #fff;
      font-weight: bold;
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
