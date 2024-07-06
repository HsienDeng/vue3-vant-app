import { createRouter, createWebHistory } from 'vue-router';

// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/Home'),
  },
  {
    path: '/sample/manager',
    name: 'SampleManager',
    component: () => import('@/pages/sample/manager'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
