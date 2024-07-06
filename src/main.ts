import { createApp } from 'vue';
import App from './App';
import router from '@/router';
import store from '@/store';
import 'vant/lib/index.css';

const app = createApp(App);

async function boostrap() {
  // 路由
  app.use(router);

  // 全局状态管理
  app.use(store);

  app.mount('#app');
}

void boostrap();
