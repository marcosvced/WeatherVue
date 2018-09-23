// initial state
const state = {
  name: '',
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
  setCardinalDirections (state, cardinalPoints) {
    // mutate state
    state.cardinalDirections = cardinalPoints
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
