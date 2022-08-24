import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpPage from '@/views/SignUpPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: SignUpPage
  }
]

const router = new VueRouter({
  routes
})

export default router
