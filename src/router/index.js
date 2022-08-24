import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import MenuPage from '@/views/MenuPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import DeletePage from '@/views/DeletePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/signup`,
    component: SignUpPage
  },

  {
    path: `/`,
    component: LoginPage
  },

  {
    path: `/menu`,
    component: MenuPage
  },

  {
    path: `/profile`,
    component: ProfilePage
  },

  {
    path: `/delete`,
    component: DeletePage
  }
]

const router = new VueRouter({
  routes
})

export default router
