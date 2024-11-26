<template>
  <div class="comic-list">
    <h1>LISTA DE CÓMICS</h1>
    <div v-if="comics.length">
      <!-- Aplicamos el mismo diseño de tarjetas que en la lista de personajes -->
      <div class="comic-card-container">
        <ComicCard v-for="comic in comics" :key="comic.id" :comic="comic" />
      </div>
    </div>
    <p v-else>Cargando cómics...</p>
    <button v-if="hasNextPage" @click="loadMoreComics" class="load-more-btn">
      Cargar más cómics
    </button>
    <!-- Enlace de volver al inicio -->
    <router-link to="/" class="load-more-btn"> Volver al Inicio </router-link>
  </div>
</template>

<script>
import axios from "axios";
import ComicCard from "../components/ComicCard.vue"; // Componente para mostrar cada cómic

export default {
  components: {
    ComicCard,
  },
  data() {
    return {
      comics: [], // Array para almacenar los cómics
      publicKey: "40039a88658df0ebef4ab4763898ca93", // Tu clave pública de Marvel
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d", // Tu clave privada de Marvel
      ts: new Date().getTime(), // Timestamp para la autenticación
      hash: "", // El hash se genera en base a ts + privateKey + publicKey
      offset: 0, // Offset inicial para la paginación
      limit: 10, // Número de cómics por página
      hasNextPage: true, // Indicador de si hay más cómics para cargar
    };
  },
  created() {
    this.fetchComics(); // Llamamos a la función para obtener los cómics al crear el componente
  },
  methods: {
    async fetchComics() {
      try {
        const hash = this.generateHash();

        // Realiza la petición a la API de Marvel para obtener los cómics
        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/comics",
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
              limit: this.limit, // Número de cómics a obtener
              offset: this.offset, // Offset para la paginación
            },
          }
        );

        const newComics = response.data.data.results;

        if (newComics.length > 0) {
          // Si hay nuevos cómics, los agregamos a la lista existente
          this.comics = [...this.comics, ...newComics];
          this.offset += this.limit; // Actualizamos el offset para la siguiente página
        } else {
          this.hasNextPage = false; // Si no hay más cómics, deshabilitamos el botón
        }
      } catch (error) {
        console.error("Error fetching comics:", error); // En caso de error, mostramos el error en consola
      }
    },

    loadMoreComics() {
      // Llamar a la función para cargar más cómics
      this.fetchComics();
    },

    // Método para generar el hash (md5)
    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey); // Generamos el hash para la autenticación
    },
  },
};
</script>

<style scoped>
@import url(../assets/episodeListStyle.scss);
</style>
