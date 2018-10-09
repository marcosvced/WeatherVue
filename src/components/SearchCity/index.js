import uiSelect from '../ui/select/UiSelect'
import googleMaps from '../GoogleMaps/GoogleMaps'
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'SearchCity',
  data () {
    return {
      cities: [],
      cityPlace: [],
      searching: '',
      isLoading: false,
      open: false
    }
  },
  components: {
    uiSelect,
    googleMaps
  },

  computed: {
    ...mapGetters('city', {
      getName: 'getName',
      getCountry: 'getCountry',
      getCardinalDirections: 'getCardinalDirections',
      getLat: 'getLat'
    })
  },
  methods: {
    ...mapMutations('city', {
      setName: 'setName',
      setCountry: 'setCountry',
      setCardinalDirections: 'setCardinalDirections',
      setLat: 'setLat',
      setLng: 'setLng'
    }),

    /**
     * Make a request for a city data with a given city name
     */
    requestGeoNames () {
      this.isLoading = true
      // Clear the last search
      this.cityPlace = []

      const axios = require('axios')
      axios.post('http://api.geonames.org/searchJSON?q=' + this.searching + '&maxRows=20&startRow=0&l\n' +
        'ang=en&isNameRequired =true&style=FULL&username=ilgeonamessample')
        .then(response => {
          // handle success
          console.info('Request of cities: ', response)
          this.showAllCities(response.data.geonames)
          this.isLoading = false
        })
        .catch(error => {
          // handle error
          console.error('Request of cities: ', error)
          this.isLoading = false
        })
    },

    /**
     * Show the cities with searched name
     * @param items
     */
    showAllCities (items) {
      let containsName = items.filter(item => item.name.toLocaleLowerCase().includes(this.searching.toLocaleLowerCase()) && item.fcodeName !== 'airport')

      containsName.forEach(place => {
        if (place.bbox) {
          let places = {
            'key': place.name,
            'value': place.countryName,
            'north': place.bbox.north,
            'south': place.bbox.south,
            'west': place.bbox.west,
            'east': place.bbox.east,
            'lat': place.lat,
            'lng': place.lng
          }
          this.cityPlace.push(places)
        }
      }
      )
    },

    /**
     * Save the city name
     * @param name
     */
    commitCityName (name) {
      // this.$store.commit('city/setName', name)
      if (name.length <= 0) {
        this.cityPlace = []
        this.searching = name
        return
      }
      this.searching = name
      this.requestGeoNames()
    },

    /**
     * Get the values of selected city
     * @param e
     */
    saveSelectedCity (e) {
      const selectedCity = this.cityPlace[e]
      this.$store.commit('city/setName', selectedCity.key)
      this.$store.commit('city/setCountry', selectedCity.value)
      const cardinalsPoints = {
        south: selectedCity.south,
        north: selectedCity.north,
        east: selectedCity.east,
        west: selectedCity.west
      }
      this.$store.commit('city/setCardinalDirections', cardinalsPoints)
      this.$store.commit('city/setLng', selectedCity.lng)
      this.$store.commit('city/setLat', selectedCity.lat)

      // Add selected city as input value
      this.searching = this.getName
      this.addToLocalStorage(selectedCity)
    },

    /**
     * Select a city of cities history
     * @param e
     */
    selectHistoryCity (e) {
      const selectedCity = this.cities[e]
      this.$store.commit('city/setName', selectedCity.key)
      this.$store.commit('city/setCountry', selectedCity.value)
      const cardinalsPoints = {
        south: selectedCity.south,
        north: selectedCity.north,
        east: selectedCity.east,
        west: selectedCity.west
      }
      this.$store.commit('city/setCardinalDirections', cardinalsPoints)
      this.$store.commit('city/setLng', selectedCity.lng)
      this.$store.commit('city/setLat', selectedCity.lat)
    },
    /**
     *  Add the value to local storage
     * @param value
     */
    addToLocalStorage (value) {
      // It save the searched city on local storage
      const $this = this
      let isCityStorage = this.cities.find(item => {
        return (item.key === $this.getName && item.value === $this.getCountry)
      })
      if (!isCityStorage) {
        this.cities.push(value)
        let parse = JSON.stringify(this.cities)
        localStorage.setItem('cities', parse)
      }
    },

    /**
     * Get cities of local storage
     */
    recoverCities () {
      this.cities = localStorage.cities ? JSON.parse(localStorage.cities) : []
    }
  },

  mounted () {
    this.recoverCities()
  }
}
