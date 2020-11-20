import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/comercial/Login";
import ClientesAll from "@/components/comercial/ClientesAll";
import ClientesPage from "@/components/comercial/ClientesPage";
import Cadastro from "@/components/comercial/Cadastro";
import Dashboard from "@/views/dashboard/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,

  },
  {
    path: '/#/clientes',
    name: 'clientes',
    component: ClientesAll,

  },
  {
    path: '/clientesPage',
    name: 'clientesPage',
    component: ClientesPage,

  },
  {
    path: '/clientes/cadastro',
    name: 'clientes.cadastro',
    component: Cadastro
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
