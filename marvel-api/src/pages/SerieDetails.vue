<template>
  <div class="serie-details" v-if="serie">
    <h1>{{ serie.title }}</h1>
    <img
      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      alt="Serie Image"
      class="serie-image"
    />

    <div v-if="creators.length" class="creators-section">
      <h2>Creadores:</h2>
      <ul class="creators-list">
        <li v-for="creator in creators" :key="creator">
          {{ creator }}
        </li>
      </ul>
    </div>

    <router-link to="/series" class="back-btn">Volver a la lista</router-link>
  </div>
  <p v-else class="loading">Cargando detalles de la serie...</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      serie: null, // Información de la serie
      creators: [], // Lista de creadores
    };
  },
  created() {
    this.fetchSerieDetails(); // Obtener detalles de la serie al cargar el componente
  },
  methods: {
    async fetchSerieDetails() {
      const seriesId = this.$route.params.seriesId; // Obtener el ID de la serie desde los parámetros de la URL
      const publicKey = "40039a88658df0ebef4ab4763898ca93";
      const privateKey = "8e198fb531ca9c933681480119851a819f35a27d";
      const ts = new Date().getTime();
      const hash = this.generateHash(ts, privateKey, publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/series/${seriesId}`,
          {
            params: {
              apikey: publicKey,
              ts: ts,
              hash: hash,
            },
          }
        );

        const serieData = response.data.data.results[0];
        this.serie = serieData;

        // Obtener los creadores de la serie
        if (serieData.creators && serieData.creators.items.length > 0) {
          this.creators = serieData.creators.items.map(
            (creator) => creator.name
          );
        }
      } catch (error) {
        console.error("Error fetching serie details:", error);
      }
    },
    generateHash(ts, privateKey, publicKey) {
      const md5 = require("md5");
      return md5(ts + privateKey + publicKey); // Generar hash para la autenticación
    },
  },
};
</script>

<style scoped>
@import url(../assets/serieDetailsStyles.scss);
</style>
