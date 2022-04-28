import { createApp } from 'vue'
import App from './App.vue'
import store from '@/vuex'
import router from '@/routes'

const Vue = createApp(App)

Vue.use(router)
Vue.use(store)

Vue.mount('#app')
