import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            id: null,
            name: null,
            email: null
        },
        accessToken: null
    },
    getters: {

    },
    mutations: {
        LOGIN (state, { accessToken }) {
            state.accessToken = accessToken
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken)
        },
    },
    actions: {
        LOGIN ({ commit }, userInfo) {
            return Vue.axios.post('/auth/login', userInfo).then(({ data }) => {
                if (data.result === 'success') {
                    // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
                    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
                    commit('LOGIN', data)
                }
                return data
            })
        },
    }
})