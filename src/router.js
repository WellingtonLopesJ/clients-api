import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/comercial/Login";


import store from './store'
import ClientesPage from "@/components/comercial/ClientesPage";
import Cadastro from "@/components/comercial/Cadastro";
import Update from "@/components/comercial/Update";
import CadastroUsuario from "@/components/acessos/Usuarios/CadastroUsuario";
import PerfilUsuario from "@/components/acessos/Usuarios/PerfilUsuario";
import ListagemUsuarios from "@/components/acessos/Usuarios/ListagemUsuarios";
import EditarUsuario from "@/components/acessos/Usuarios/EditarUsuario";

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
          path: '',
          redirect: '/clientes',
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
          component: ClientesPage,
          beforeEnter: ifAuthenticated,
        },
        {
          name: 'login',
          path: 'login',
          component: Login,
          beforeEnter: ifNotAuthenticated
        },
        {
          name: 'cadastro',
          path: 'clientes/cadastro',
          component: Cadastro,
          beforeEnter: ifAuthenticated
        },
        {
          name: 'Editar',
          path: 'clientes/:id/edit',
          component: Update,
          beforeEnter: ifAuthenticated
        },
        {
          name: 'Usuario',
          path: '/usuario',
          component: PerfilUsuario
        },
        {
          name: 'cadastro.usuario',
          path: '/usuarios/cadastro',
          component: CadastroUsuario
        },
        {
          name: 'Usuarios',
          path: '/usuarios',
          component: ListagemUsuarios
        },
        {
          name: 'editar.usuario',
          path: 'usuarios/:id/edit',
          component: EditarUsuario,
          beforeEnter: ifAuthenticated
        },
      ],
    },
  ],
})
