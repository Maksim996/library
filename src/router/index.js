import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Results from "../views/Results.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/results',
    name: 'results',
    component: Results
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes
})

export default router
