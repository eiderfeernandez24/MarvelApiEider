import { createRouter, createWebHistory } from "vue-router";
import EpisodeList from "@/pages/EpisodeList.vue";
import CharactersList from "@/pages/CharactersList.vue";
import CharacterDetails from "@/pages/CharacterDetails.vue";
import SeriesList from "@/pages/SeriesList.vue";
import SerieDetails from "@/pages/SerieDetails.vue";
import ComicDetails from "@/pages/ComicDetails.vue";

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
    path: "/characters",
    name: "characters",
    component: CharactersList,
  },
  {
    path: "/character/:id",
    name: "characterDetails",
    component: CharacterDetails,
    props: true,
  },
  {
    path: "/series",
    name: "SeriesList",
    component: SeriesList,
  },
  {
    path: "/series/:seriesId/details",
    name: "serieDetails",
    component: SerieDetails,
    props: true,
  },
  {
    path: "/comicDetails/:id",
    name: "ComicDetails",
    component: ComicDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
