import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
    user: []
  },
  getters: {
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => state.authenticated = auth,
    SET_USER: (state: { user: object }, user: object) => state.user = user
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) => commit("SET_AUTH", auth),
    setUser: ({ commit }: { commit: Commit }, user: object) => commit("SET_USER", user)
  },
  modules: {
  }
})
