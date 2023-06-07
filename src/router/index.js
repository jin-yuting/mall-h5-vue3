import { createRouter, createWebHashHistory } from "vue-router";
import { projectName } from '../../config';
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
]

const router = new createRouter({
  routes,
  history: createWebHashHistory(`/${projectName}/`),
})

export default router