import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import VueRouter from 'vue-router'
import store from '@/store'
import ApiService from '@/common/api.service'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

ApiService.init()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
