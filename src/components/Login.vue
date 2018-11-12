<template>
<div class="login">
  <!-- el-form 表单组件
  :model="form" form对象手机表单中所有的数据
  label-width label的宽度
  el-form-item  表单项
  rules设置校验的规则,给每一个 el-form-item 设置一个prop
   -->
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <img src="../assets/selfie-413162__340.jpg" alt="">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" name="username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" name="password" type="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // 必填项
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          // 校验长度
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          // 校验长度
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.axios
            .post('http://localhost:8888/api/private/v1/login', this.form)
            .then(res => {
              if (res.meta.status === 200) {
                // 登录成功
                this.$message.success(res.meta.msg)
                // 存储token
                localStorage.setItem('token', res.data.token)
                // 跳转到Home组件
                this.$router.push('/home')
              } else {
                // 登录失败
                this.$message.error(res.meta.msg)
              }
            })
        } else {
          console.log('未通过')
          return false
        }
      })
    },
    // 重置表单
    reset() {
      // 获取到表单组件
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
}
.el-form {
  width: 400px;
  margin: 200px auto;
  background-color: #fff;
  padding: 80px 40px 15px;
  border-radius: 20px;
  position: relative;
  img {
    position: absolute;
    width: 120px;
    height: 120px;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 20px solid #fff;
  }
}
.el-button + .el-button {
  margin-left: 75px;
}
</style>
