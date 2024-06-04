import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginPage from '../views/loginPage.vue'
import eventPage from '../views/eventPage.vue'
import createEvent from '../views/createEvent.vue'
import wishlist from '../views/wishlist.vue'
import pastEvents from '../views/pastEvents.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: loginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path: '/events',
    name: 'EventPage',
    component: eventPage,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: wishlist,
  },
  {
    path: '/create',
    name: 'CreateEvent',
    component: createEvent,
  },
  {
    path: '/pastEvents',
    name: 'pastEvents',
    component: pastEvents
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

