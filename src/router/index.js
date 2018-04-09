import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Index from '@/components/page/Index'
import Content from '@/components/page/Content'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/content',
          name: 'content',
          component: Content
        }
      ]
    }
  ]
})
