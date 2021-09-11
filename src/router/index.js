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
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    meta: { requiresAuth: true }
  },
  {
    path: '/play',
    name: 'Play',
    component: Play,
    meta: { requiresAuth: true }
  },
  {
    path: '/practice/:id',
    name: 'Practice',
    component: Practice,
    meta: { requiresAuth: true }
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
    meta: { requiresAuth: true }
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    // uses stored scroll distance
    return { top: scrollDistances[to.fullPath] || 0 }
  }
})

// stores scroll distances
const scrollDistances = {}

// gets current scroll distance
function getScrollDistance() {
  const page = document.querySelector('#app')
  return -page.getBoundingClientRect().top + 40
}

router.beforeEach((to, from, next) => {
  // saves scroll distance
  scrollDistances[from.fullPath] = getScrollDistance()

  // checks if to-route requires to be authorized
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)

  // redirects accordingly
  const isAuthenticated = store.state.userId !== null
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
