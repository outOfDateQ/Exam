import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化
import '@/style/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '/public/iconfonts/iconfont.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(pinia)
  .mount('#app')
