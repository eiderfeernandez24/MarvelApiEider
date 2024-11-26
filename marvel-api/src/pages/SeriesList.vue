<template>
  <div class="series-list">
    <h1>LISTA DE SERIES</h1>
    <div v-if="series.length">
      <!-- Aplicamos el mismo diseño de tarjetas para las series -->
      <div class="series-card-container">
        <SeriesCard v-for="serie in series" :key="serie.id" :serie="serie" />
      </div>
    </div>
    <p v-else>Cargando series...</p>
    <button v-if="hasNextPage" @click="loadMoreSeries" class="load-more-btn">
      Cargar más series
    </button>
    <!-- Enlace de volver al inicio -->
    <router-link to="/" class="load-more-btn"> Volver al Inicio </router-link>
  </div>
</template>

<script>
import axios from "axios";
import SeriesCard from "../components/SeriesCard.vue"; // Componente para mostrar cada serie

export default {
  components: {
    SeriesCard,
  },
  data() {
    return {
      series: [], // Array para almacenar las series
      publicKey: "40039a88658df0ebef4ab4763898ca93", // Tu clave pública de Marvel
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d", // Tu clave privada de Marvel
      ts: new Date().getTime(), // Timestamp para la autenticación
      hash: "", // El hash se genera en base a ts + privateKey + publicKey
      offset: 0, // Offset inicial para la paginación
      limit: 10, // Número de series por página
      hasNextPage: true, // Indicador de si hay más series para cargar
    };
  },
  created() {
    this.fetchSeries(); // Llamamos a la función para obtener las series al crear el componente
  },
  methods: {
    async fetchSeries() {
      try {
        const hash = this.generateHash();

        // Realiza la petición a la API de Marvel para obtener las series
        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/series",
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
              limit: this.limit, // Número de series a obtener
              offset: this.offset, // Offset para la paginación
            },
          }
        );

        const newSeries = response.data.data.results;

        if (newSeries.length > 0) {
          // Si hay nuevas series, las agregamos a la lista existente
          this.series = [...this.series, ...newSeries];
          this.offset += this.limit; // Actualizamos el offset para la siguiente página
        } else {
          this.hasNextPage = false; // Si no hay más series, deshabilitamos el botón
        }
      } catch (error) {
        console.error("Error fetching series:", error); // En caso de error, mostramos el error en consola
      }
    },

    loadMoreSeries() {
      // Llamar a la función para cargar más series
      this.fetchSeries();
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
@import url(../assets/serieListStyles.scss);
</style>
