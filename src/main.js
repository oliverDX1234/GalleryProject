import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//Import CSS
import "@/assets/css/style.css"
import "@/assets/css/responsive.css"

createApp(App).use(store).use(router).mount('#app');
