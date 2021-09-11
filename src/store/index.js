import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: null
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    }
  }
})
