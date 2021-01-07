import Vue from 'vue'
import Router from 'vue-router'
import DoctorHome from '@/components/DoctorHome'
import ENurseHome from '@/components/ENurseHome'
import HNurseHome from "../components/HNurseHome";
import WNurseHome from "../components/WNurseHome";
import Login from '@/components/Login'
import Navigation from "../components/Navigation";
import store from '../store'

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'DoctorHome',
      component: DoctorHome,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    // {
    //   path: '/',
    //   name: 'HNurseHome',
    //   component: HNurseHome,
    //   meta: {
    //     requireAuth: true // 需要登录权限
    //   }
    // },
    // {
    //   path: '/',
    //   name: 'Navigation',
    //   component: Navigation,
    //   meta: {
    //     requireAuth: true // 需要登录权限
    //   }
    // },

    // {
    //   path: '/doctorHome',
    //   name: 'DoctorHome',
    //   component: DoctorHome,
    //   meta: {
    //     requireAuth: true // 需要登录权限
    //   }
    // },
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // }
  ]
});
