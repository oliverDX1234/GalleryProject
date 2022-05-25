import { createRouter, createWebHashHistory } from 'vue-router'
import store from "../store"

const routes = [
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/Gallery.vue'),
    meta:{

      auth: true
    }
  },

  {
    path: '/details-page/:id',
    name: 'details-page',
    component: () => import('../views/DetailsPage.vue'),
    meta:{
      auth: true
    }
  },

  {
    path: '/album/:id',
    name: 'album',
    component: () => import('../views/Album.vue'),
    meta:{
      auth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta:{
      auth: false
    }
  },
  { path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _ ,next) => {

  if(to.meta.auth && !store.getters['authentication/isAuthenticated']){
    next("/login");
  }else if(!to.meta.auth && store.getters['authentication/isAuthenticated']){
    next('/gallery')
  }else{
    if(to.path === "/"){
      if(!store.getters['authentication/isAuthenticated']){
        next("/login")
      }else{
        next("/gallery");
      }
    }
    next();
  }

})

export default router
