import { createRouter, createWebHistory } from "vue-router";
import EpisodeList from "@/pages/EpisodeList.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/episodes",
    name: "EpisodeList",
    component: EpisodeList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
