import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'


const service = axios.create({
    baseURL: API_URL,
    timeout: 5000
})

// before request
service.interceptors.request.use(
    config => {
        return config
    }, error => {
        console.log(error)
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 0) {
            console.log(res.msg)
        } else {
            return res
        }
    }, error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

const ApiService = {
    init () {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = API_URL
    },
    setHeader () {
        // Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
        return ''
    },
    query (resource, params) {
        return service.get(resource, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },
    get (resource, slug = '') {
        return service.get(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },
    post (resource, params) {
        console.log(resource)
        return service.post(`${resource}`, params)
    },
    update (resource, slug, params) {
        return service.put(`${resource}/${slug}`, params)
    },
    put (resource, params) {
        return service.put(`${resource}`, params)
    },
    delete (resource) {
        return service.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    }
  }
  
export default ApiService