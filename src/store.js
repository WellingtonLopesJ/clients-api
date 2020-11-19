import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
  },
  actions: {
    AUTH_REQUEST: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit('AUTH_REQUEST')
        Axios({url: 'http://localhost:8080/login', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.headers.authorization
            localStorage.setItem('user-token', token) // store the token in localstorage
            Axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_SUCCESS', token)

            // you have your token, now log in your user :)
            dispatch('USER_REQUEST')
            resolve(resp)
          })
          .catch(err => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },

    AUTH_LOGOUT: (state) => {
      state.token = null
      return new Promise((resolve) => {
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })

    }
  },

  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  }
})
