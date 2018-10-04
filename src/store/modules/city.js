// initial state
const state = {
  name: '',
  country: '',
  cardinalDirections: {
    south: 0,
    north: 0,
    east: 0,
    west: 0
  }
}

// getters
const getters = {
  getName: (state) => {
    return state.name
  },
  getCountry: (state) => {
    return state.country
  },
  getCardinalDirections: (state) => {
    return state.cardinalDirections
  },
  getSouth: (state) => {
    return state.cardinalDirections.south
  },
  getNorth: (state) => {
    return state.cardinalDirections.north
  },
  getEast: (state) => {
    return state.cardinalDirections.east
  },
  getWest: (state) => {
    return state.cardinalDirections.west
  }
}

// mutations
const mutations = {
  setName: (state, name) => {
    state.name = name
  },
  setCountry: (state, country) => {
    state.country = country
  },
  setCardinalDirections (state, cardinalPoints) {
    delete cardinalPoints.accuracyLevel
    state.cardinalDirections = cardinalPoints
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
