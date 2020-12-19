import Vue from 'vue'
import '@/common/api.service'
import App from '@/App.vue'
import router from '@/router'
import VueRouter from 'vue-router'
import store from '@/store'
import vueMoment from 'vue-moment'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(vueMoment)

Vue.config.productionTip = false

const authentication = () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    store.dispatch('USER')
  }
}

authentication()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
