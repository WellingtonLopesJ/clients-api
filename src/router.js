import Vue from 'vue'
import Router from 'vue-router'
import ClientesAll from "@/components/ClientesAll";
import Login from "@/components/Login";


import store from './store'
import ClientesPage from "@/components/ClientesPage";
import Cadastro from "@/components/Cadastro";
import Update from "@/components/Update";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          beforeEnter: ifAuthenticated,
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          beforeEnter: ifAuthenticated,
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
          beforeEnter: ifAuthenticated,
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
          beforeEnter: ifAuthenticated,
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
          beforeEnter: ifAuthenticated,
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
          beforeEnter: ifAuthenticated,
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
          beforeEnter: ifAuthenticated,
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
          beforeEnter: ifAuthenticated,
        },
        {
          name: 'clientes',
          path: 'clientes',
          component: ClientesAll,
          beforeEnter: ifAuthenticated,
        },
        {
          name:'clientes.page',
          path: 'clientesPage',
          component: ClientesPage,
          beforeEnter: ifAuthenticated
        },
        {
          name: 'login',
          path: 'login',
          component: Login,
          beforeEnter: ifNotAuthenticated
        },
        {
          name: 'cadastro',
          path: 'cadastro',
          component: Cadastro,
          beforeEnter: ifAuthenticated
        },
        {
          name: 'Editar',
          path: 'clientes/:id/edit',
          component: Update,
          beforeEnter: ifAuthenticated
        },
      ],
    },
  ],
})
