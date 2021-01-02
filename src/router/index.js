import Vue from 'vue'
import Router from 'vue-router'
import DoctorHome from '@/components/DoctorHome'
import Login from '@/components/Login'
import store from '../store'

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/doctorHome',
      name: 'DoctorHome',
      component: DoctorHome,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
});
