import { createRouter, createWebHashHistory } from 'vue-router'
import BlogHome from '@/views/blog-home'
import BlogCategories from '@/views/blog-categories'
import BlogTag from '@/views/blog-tag'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: BlogHome
  },
  {
    path: '/categories',
    component: BlogCategories
  },
  {
    path: '/tags',
    component: BlogTag
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
