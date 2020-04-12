import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/project-list'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/project-list',
    name: 'projectList',
    component: () => import('@/views/todo/ProjectList.vue')
  },
  {
    path: '/project-add-or-edit/:mode?',
    name: 'projectAddOrEdit',
    component: () => import('@/views/todo/ProjectAddOrPut.vue'),
    props: (route) => ({
      mode: route.params.mode
    })
  }
]

const router = new VueRouter({
  routes
})

export default router
