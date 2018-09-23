// initial state
const state = {
  temperature: 0
}

// getters
const getters = {
  getTemperature: (state) => {
    return state.temperature
  }
}

// mutations
const mutations = {
  setTemperature: (state, cities) => {
    let totalTemperature = 0
    cities.forEach(item => {
      totalTemperature += parseInt(item.temperature)
    })
    state.temperature = totalTemperature / cities.length
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
