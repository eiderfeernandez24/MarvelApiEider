import { createRouter, createWebHistory } from "vue-router";
import EpisodeList from "@/pages/EpisodeList.vue";
import CharactersList from "@/pages/CharactersList.vue";
import CharacterDetails from "@/pages/CharacterDetails.vue";
import SeriesList from "@/pages/SeriesList.vue";

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
    component: CharactersList, // Componente de personajes
  },
  {
    path: "/character/:id",
    name: "characterDetails",
    component: CharacterDetails,
    props: true, // Pasa los parámetros de la ruta como props al componente
  },
  {
    path: "/series", // Ruta para las series
    name: "SeriesList",
    component: SeriesList, // El componente que muestra la lista de series
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
