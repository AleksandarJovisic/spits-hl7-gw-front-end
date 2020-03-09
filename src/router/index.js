import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import ClientDashboard from '../views/ClientDashboard.vue'
import ConfigurationsDashboard from '../views/ConfigurationsDashboard.vue'
import InventoryDashboard from '../views/InventoryDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'home',
    component: Home
  },
    {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/MedicineDashboard',
    name: 'MedicineDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MedicineDashboard.vue')
  },
    {
    path: '/ClientDashboard',
    name: 'ClientDashboard',
    component: ClientDashboard
  },
    {
    path: '/ConfigurationsDashboard',
    name: 'ConfigurationsDashboard',
    component: ConfigurationsDashboard
  },
    {
    path: '/InventoryDashboard',
    name: 'InventoryDashboard',
    component: InventoryDashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
