import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const app = createApp(App);

const http = axios.create({
  baseURL: 'http://localhost:3000'
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

app.config.globalProperties.$http = http;

app.use(router);
app.use(store);
app.mount('#app');
