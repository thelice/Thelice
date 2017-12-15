import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            name: '',
            email: null,
            type: null
        }
    },
    getters: {
        getUser: (state) => state.user
    },
    mutations: {
        SETUSER: (state, user) => state.user = user
    },
    actions: {
        setUser: (context, user) => context.commit('SETUSER', user)
    }
})

export default store