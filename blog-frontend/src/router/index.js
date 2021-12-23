import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home'
import BlogArchives from '@/views/blog-archives'
import BlogCategories from '@/views/blog-categories'
import BlogTag from '@/views/blog-tag'
import Blog from '@/views/blog'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/archives',
        component: BlogArchives
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
  },
  {
    path: '/blog/:id',
    component: Blog
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
