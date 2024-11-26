import { createRouter, createWebHistory } from "vue-router";
import EpisodeList from "@/pages/EpisodeList.vue";
import CharactersList from "@/pages/CharactersList.vue";
import CharacterDetails from "@/pages/CharacterDetails.vue";
import SeriesList from "@/pages/SeriesList.vue";
import SerieDetails from "@/pages/SerieDetails.vue";

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
  {
    path: "/series/:seriesId/details", // Ruta para los detalles de la serie
    name: "serieDetails",
    component: SerieDetails, // Asegúrate de que este sea el componente correcto
    props: true, // Pasa el parámetro `seriesId` como prop al componente
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
