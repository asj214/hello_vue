import Vue from 'vue'
import axios from 'axios'
import { API_URL } from '@/common/config'


const _axios = axios.create({
  baseURL: API_URL,
  timeout: 5000
})

Vue.axios = _axios
window.axios = _axios

Object.defineProperties(Vue.prototype, {
  axios: {
    get() {
      return _axios
    },
    put() {
      return _axios
    },
    post() {
      return _axios
    },
    delete() {
      return _axios
    }
  },
  $axios: {
    get() {
      return _axios
    },
    put() {
      return _axios
    },
    post() {
      return _axios
    },
    delete() {
      return _axios
    }
  }
})