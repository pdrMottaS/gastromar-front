import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/util/isauth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import EventsView from '../views/EventsView.vue'
import EventView from '../views/EventView.vue'
import EditorView from '@/views/EditorView.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
      meta: { auth: true }
    },
  ],
  history: createWebHistory()
})

router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    var userAuth = auth()
    if(userAuth!=null){
      if("role" in to.meta){
        if(to.meta.role == userAuth.authorization){
          next()
        }else{
          next('/')
        }
      }
      next()
    }
    else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
