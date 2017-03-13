import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app
  },
  strict: process.env.NODE_ENV !== 'production'
})
