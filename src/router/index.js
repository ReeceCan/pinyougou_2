import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
// 导入users组件
import Users from '@/components/Users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        // 嵌套路由1: 通过children给某个路由配置子路由
        // 嵌套路由2: 给子路由配置一个出口
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})

// 给路由对象设置导航守卫
// to: 去哪儿
// from 从哪儿来
// next() 指定跳转到哪个组件 指定跳转到哪个组件
router.beforeEach((to, from, next) => {
  // 判断是否有token
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    // 没有token 去登录
    next('login')
  }
})

export default router
