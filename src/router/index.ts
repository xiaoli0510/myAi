import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/index.vue";
import LoginView from "@/views/login/index.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
];

//创建一个router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
