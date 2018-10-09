import Vue from 'vue'
import Router from 'vue-router'
import SearchCity from '@/components/SearchCity/SearchCity'
import SearchWeather from '@/components/SearchWeather/SearchWeather'
import Maps from '@/components/GoogleMaps/GoogleMaps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        'SearchCity': SearchCity,
        'SearchWeather': SearchWeather,
        'Maps': Maps
      }
    }
  ]
})
