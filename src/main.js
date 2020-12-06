import Vue from 'vue'
import '@/common/api.service'
import App from '@/App.vue'
import router from '@/router'
import VueRouter from 'vue-router'
import store from '@/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

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
