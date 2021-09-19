import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: null,
    APIURL: 'http://localhost:3000'
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    }
  }
})
