import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "@/views/layout/index.vue";
import LoginView from "@/views/login/index.vue";
import CreationView from "@/views/creation/index.vue";
import CreationView1 from "@/views/creation1/index.vue";
import HomeView from "@/views/home/index.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/home",
    children: [
      { path: "/home", component: () => import("@/views/home/index.vue") },
      { path: "/login", component: LoginView },
      { path: "/creation", component: CreationView },
    ],
  },
];

//创建一个router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
