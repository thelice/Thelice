import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '../components/Home.vue'
import Dicas from '../components/Dicas.vue'
import Certificacoes from '../components/Certificacoes.vue'
import ToPrepare from '../components/ToPrepare.vue'
import Control from '../components/Controle.vue'
import Posts from '../components/Posts.vue'
import Read from '../components/Read.vue'
import Preview from "../components/Preview.vue";

Vue.use(Router)

let router = new Router({
  routes: [
    { path: "/home", component: Home },
    { path: "/control", component: Control, meta: { requiresAuth: true } },
    { path: "/prepare", component: ToPrepare },
    { path: "/certification", component: Certificacoes, props: true },
    { path: "/tips", component: Dicas, props: true },
    { path: "/posts/:cat", component: Posts, props: true },
    { path: "/read/:cat/:uid", component: Read, props: true },
    { path: "/preview/:cat/:uid", component: Preview, props: true }
    // { path: '/videolessons' , component: Certificacoes },
  ],
  mode: "history",
  linkActiveClass: "active-page",
  linkExactActiveClass: "current-page"
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let require = to.matched.some(r => r.meta.requiresAuth)

  if(require && !currentUser)
    next('/')
  else
    next()
})

export default router