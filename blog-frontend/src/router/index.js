import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home'
import BlogArchives from '@/views/blog-archives'
import Categories from '@/views/categories'
import BlogCategories from '@/views/blog-categories'
import BlogTag from '@/views/blog-tag'
import Blog from '@/views/blog'

const routes = [
  {
    path: '/',
    redirect: '/archives'
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
        component: Categories,
        children: [
          {
            path: '/categories/:category',
            component: BlogCategories
          }
        ]
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
  history: createWebHistory(),
  routes
})

export default router
