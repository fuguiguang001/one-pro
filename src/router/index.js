import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/login/index')
  },
  {
    path: '/home', name: 'home', component: () => import('@/views/home/index')
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  // 非登录用户-访问登录页面
  let userinfo = window.sessionStorage.getItem('userInfo');
  if(!userinfo && to.path != '/login'){
    return next('/login')
  }
  next()
})

export default router
