import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import FeedDetail from '@/views/FeedDetail'
import SearchResults from '@/views/SearchResults'
import LoginPage from '@/views/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/podcast/:id',
      name: 'FeedDetail',
      component: FeedDetail
    },
    {
      path: '/results',
      name: 'Results',
      component: SearchResults
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    }
  ],
  mode: 'history'
})
