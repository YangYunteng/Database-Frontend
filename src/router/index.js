import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import store from '../store'

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
  ]
});

// 前端登录拦截
// router.beforeEach(function (to, from, next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: "/"} // 登录成功之后重新跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// });
