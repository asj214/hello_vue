import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/common/api.service'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user: {
            id: null,
            name: null,
            email: null
        },
        accessToken: null,
        errors: null
    },
    getters: {

    },
    mutations: {
        LOGIN (state, { accessToken }) {
            state.accessToken = accessToken
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken)
        },
        SET_ERROR (state, error) {
            state.errors = error
        }
        // SET_AUTH (state, credentials) {
        //     state.isAuthenticated = true
        //     state.accessToken = 
        // }
    },
    actions: {
        LOGIN (context, credentials) {
            return new Promise((resolve) => {
                ApiService.post('auth/login', credentials).then(({ data }) => {
                    context.commit('LOGIN', data.access_token)
                    resolve(data)
                })
            })
        }
    }
})