import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'SearchCity',
  data: {
    selected: ''
  },
  computed: {
    ...mapGetters('city', {
      getName: 'getname',
      getCardinalDirections: 'getCardinalDirections'
    })
  },
  methods: {
    ...mapMutations('city', {
      'setName': 'setName',
      'setCardinalDirections': 'setCardinalDirections'
    }),

    requestGeoNames () {
      const axios = require('axios')
      // Make a request for a user with a given ID
      axios.post('http://api.geonames.org/searchJSON?q=Madrid&maxRows=20&startRow=0&l\n' +
        'ang=en&isNameRequired =true&style=FULL&username=ilgeonamessample')
        .then(response => {
          // handle success
          console.info('Request of cities: ', response)
          this.$store.commit('city/setCardinalDirections', response.data.geonames[0].bbox)
        })
        .catch(error => {
          // handle error
          console.error('Request of cities: ', error)
        })
    }
  }
}
