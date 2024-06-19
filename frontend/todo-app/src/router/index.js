import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import UserRegister from '@/views/UserRegister.vue';
import UserLogin from '@/views/UserLogin.vue';
import AddTask from '@/components/AddTask.vue';
import UserPanel from '@/views/UserPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/add',
    name: 'AddTask',
    component: AddTask
  },
  {
    path: '/user-panel',
    name: 'UserPanel',
    component: UserPanel
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
