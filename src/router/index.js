import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: SignUpPage
  },

  {
    path: `/login`,
    component: LoginPage
  }
]

const router = new VueRouter({
  routes
})

export default router
