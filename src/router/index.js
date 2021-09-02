import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import Play from '../views/Play.vue'
import Practice from '../views/Practice.vue'
import List from '../views/List.vue'
import Settings from '../views/Settings.vue'
import FAQ from '../views/FAQ.vue'
import Impressum from '../views/Impressum.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/practice/:id',
    name: 'Practice',
    component: Practice
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const scrolled = {}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    scrolled[from.fullPath] = getScrollDistance()
    const top = scrolled[to.fullPath] ? scrolled[to.fullPath] : 0
    return { top }
  }
})

function getScrollDistance() {
  const page = document.querySelector('#app')
  return -page.getBoundingClientRect().top + 40
}

export default router
