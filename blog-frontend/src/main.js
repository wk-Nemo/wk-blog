import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/index.scss'
import baseUrl from '@/assets/util/path'
import axios from 'axios'
import 'animate.css'
import '@/assets/iconfont/iconfont.css'

axios.defaults.baseURL = baseUrl

createApp(App).use(store).use(router).mount('#app')
