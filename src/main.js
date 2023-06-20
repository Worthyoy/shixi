import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './routers'
// import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
import axios from "axios";
const Vue = require("vue");

axios.defaults.baseURL = "/api";

const app = Vue.createApp(App);

//将axios挂载到原型对象上，vue3相比vue2有所改变，vue2这样写：Vue.prototype.$http = axios
app.config.globalProperties.$http = axios;