import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedState'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],

  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },

  getters: {
    token: state => state.token,
    user: state => state.user,
    isUserLoggedIn: state => state.isUserLoggedIn
  },

  mutations: {
    setToken(state, token){
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user){
      state.user = user
    },
    logout(state){
      state.token = null
      state.user = null
      state.isUserLoggedIn = false
    }
  }
})


