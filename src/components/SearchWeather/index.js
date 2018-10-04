import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'SearchWeather',
  data () {
    return {
      temperature: 0,
      hour: 0,
      minute: 0,
      day: 'today',
      date: 0,
      month: 'month',
      year: 0,
      seconds: 0
    }
  },
  computed: {
    ...mapGetters('city', {
      getName: 'getName',
      getCountry: 'getCountry',
      getSouth: 'getSouth',
      getNorth: 'getNorth',
      getWest: 'getWest',
      getEast: 'getEast'
    }),
    ...mapGetters('weather', {
      getTemperature: 'getTemperature'
    }),
    barTemperature () {
      const zero = 30
      return zero + this.getTemperature
    },
    isDay () {
      return this.hour > 9 && this.hour < 21
    }
  },
  watch: {
    getName: function () {
      this.requestWeather()
    }
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
    },
    getToday () {
      const weekday = []
      weekday[0] = 'Sunday'
      weekday[1] = 'Monday'
      weekday[2] = 'Tuesday'
      weekday[3] = 'Wednesday'
      weekday[4] = 'Thursday'
      weekday[5] = 'Friday'
      weekday[6] = 'Saturday'

      const month = []
      month[0] = 'January'
      month[1] = 'February'
      month[2] = 'March'
      month[3] = 'April'
      month[4] = 'May'
      month[5] = 'June'
      month[6] = 'July'
      month[7] = 'August'
      month[8] = 'September'
      month[9] = 'October'
      month[10] = 'November'
      month[11] = 'December'

      const date = new Date()
      this.hour = date.getHours()
      this.minutes = date.getMinutes()

      this.day = weekday[date.getDay()]
      this.date = date.getDate()

      this.month = month[date.getMonth()]
      this.year = date.getFullYear()
    }
  },
  beforeMount () {
    this.getToday()
  }
}
