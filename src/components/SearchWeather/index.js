import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'SearchWeather',
  data () {
    return {
      temperature: 0
    }
  },
  computed: {
    ...mapGetters('city', {
      getName: 'getname',
      getSouth: 'getSouth',
      getNorth: 'getNorth',
      getWest: 'getWest',
      getEast: 'getEast'
    }),
    ...mapGetters('weather', {
      getTemperature: 'getTemperature'
    })
  },
  methods: {
    ...mapMutations('temperature', {setTemperature: 'setTemperature'}),
    requestWeather () {
      const axios = require('axios')
      let city = 'http://api.geonames.org/weatherJSON?north=' + this.getNorth + '&south=' + this.getSouth + '&east=' + this.getEast + '&west=' + this.getWest + '&username=ilgeonamessample'
      axios.post(city)
        .then(response => {
          // handle success
          console.log(response)
          this.$store.commit('weather/setTemperature', response.data.weatherObservations)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
}
