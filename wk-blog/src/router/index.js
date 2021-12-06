import { createRouter, createWebHashHistory } from 'vue-router'
import BlogArchive from '@/views/blog-archive'
import BlogCategories from '@/views/blog-categories'
import BlogTag from '@/views/blog-tag'

const routes = [
  {
    path: '/',
    redirect: '/archives'
  },
  {
    path: '/archives',
    component: BlogArchive
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
