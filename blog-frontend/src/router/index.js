import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home'
import BlogArchives from '@/views/blog-archives'
import Categories from '@/views/categories'
import BlogList from '@/components/blog-list/blog-list'
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
            path: '/:category',
            component: BlogList
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
  history: createWebHashHistory(),
  routes
})

export default router
