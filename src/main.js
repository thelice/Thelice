import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(ElementUI)

import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB-OE7OrFHBZiK0Vyqh8o4gnV5_tAB87eg",
  authDomain: "thelice-74a42.firebaseapp.com",
  databaseURL: "https://thelice-74a42.firebaseio.com",
  projectId: "thelice-74a42",
  storageBucket: "thelice-74a42.appspot.com",
  messagingSenderId: "44579192346"
}

firebase.initializeApp(config)

Vue.prototype.$bus = new Vue()
Vue.prototype.$auth = firebase.auth
Vue.prototype.$db = firebase.database

Vue.prototype.$logged = () => firebase.auth().currentUser != null
Vue.prototype.$user = () => firebase.auth().currentUser
Vue.prototype.$isAdmin = () => {
  const user = firebase.auth().currentUser

  return user.type != undefined && user.type == 'admin'
}

new Vue({
  el: '#app',
  name: 'Thelice',
  render: h => h(App),
  router: router,
  store: store,
  mounted() {
    this.$router.push("/home");
  }
})
