import {mapGetters} from 'vuex'

export default {
  name: 'GoogleMaps',
  data () {
    return {
      map: null,
      marker: null
    }
  },

  computed: {
    ...mapGetters('city', {
      getName: 'getName',
      getCountry: 'getCountry',
      getCardinalDirections: 'getCardinalDirections',
      getLng: 'getLng',
      getLat: 'getLat'
    })
  },
  watch: {
    getName: function () {
      this.setMarker()
    }
  },
  methods: {
    setMarker () {
      if (this.marker) {
        this.marker.setMap(null)
      }
      const position = new google.maps.LatLng(this.getLat, this.getLng)
      this.marker = new google.maps.Marker({position: position})
      this.marker.setMap(this.map)
      this.map.panTo(position)
    }
  },

  mounted () {
    const element = document.querySelector('#map')
    const options = {
      zoom: 7,
      center: new google.maps.LatLng(42.871402, -8.528079),
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(element, options)
  }
}
