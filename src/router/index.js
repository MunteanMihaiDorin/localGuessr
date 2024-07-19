import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/userManagement.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {

    next('/login');
  } else if (to.matched.some(record => record.meta.requiresGuest) && loggedIn) {

    next('/play');
  } else {
    next();
  }
});

export default router;
