import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    name: 'postList',
    path: '/posts',
    component: () => import('@/views/PostList')
  },
  {
    name: 'postForm',
    path: '/posts/create',
    component: () => import('@/views/PostForm')
  },
  {
    name: 'postDetail',
    path: '/posts/:id',
    component: () => import('@/views/PostDetail')
  },
]

const router = new VueRouter({
  hashbang: false,
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
