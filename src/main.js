import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../main.css';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import GoogleSignInPlugin from "vue3-google-signin"
import vue3GoogleLogin from 'vue3-google-login'

const vuetify = createVuetify({
  components,
  directives,
})


createApp(App).use(router).use(createPinia()).use(vue3GoogleLogin, {
    clientId: '114955220751-h8s8p7lcfg3mgr9bcnguf26h7rdvar60.apps.googleusercontent.com',
  }).mount('#app');


