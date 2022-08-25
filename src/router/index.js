import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpPage from '@/views/customer/SignUpPage.vue'
import LoginPage from '@/views/customer/LoginPage.vue'
import MenuPage from '@/views/customer/MenuPage.vue'
import ProfilePage from '@/views/customer/ProfilePage.vue'
import DeletePage from '@/views/customer/DeletePage.vue'
import HomePage from '@/views/HomePage.vue'
import SignUpPageRestaurant from '@/views/restaurant/SignUpPageRestaurant.vue'
import DeletePageRestaurant from '@/views/restaurant/DeletePageRestaurant.vue'
import LoginPageRestaurant from '@/views/restaurant/LoginPageRestaurant.vue'
import MenuPageRestaurant from '@/views/restaurant/MenuPageRestaurant'
import ProfilePageRestaurant from '@/views/restaurant/ProfilePageRestaurant'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: HomePage
  },

  {
    path: `/signup`,
    component: SignUpPage
  },

  {
    path: `/login`,
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
  },

  {
    path: `signup-restaurant`,
    component: SignUpPageRestaurant
  },

  {
    path: `delete-restaurant`,
    component: DeletePageRestaurant
  },

  {
    path: `login-restaurant`,
    component: LoginPageRestaurant
  },

  {
    path: `menu-restaurant`,
    component: MenuPageRestaurant
  },

  {
    path: `profile-restaurant`,
    component: ProfilePageRestaurant
  }
]

const router = new VueRouter({
  routes
})

export default router
