import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import weather from './modules/weather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city,
    weather
  }
})
