import { createRouter, createWebHistory } from "vue-router";
import EpisodeList from "@/pages/EpisodeList.vue";
import CreatorsView from "@/views/CreatorsView.vue";
import CreatorDetail from "@/views/CreatorDetail.vue";

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
  {
    path: "/creators",
    name: "creators",
    component: CreatorsView,
  },
  {
    path: "/creator/:id",
    name: "CreatorDetail",
    component: CreatorDetail,
    props: true, // Habilita pasar el `id` como prop
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
