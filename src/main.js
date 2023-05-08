import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/index.css'

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
//导入提示框需要的css
import '@arco-design/web-vue/es/notification/style/css.js'
import '@arco-design/web-vue/es/message/style/css.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVueIcon)

app.mount('#app')
