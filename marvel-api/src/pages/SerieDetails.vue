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
/* Estilos generales */
html,
body {
  height: 100%;
  margin: 0;
  background-color: #0d1117;
}

.serie-details {
  text-align: center;
  padding: 30px;
  background: #0d1117;
  color: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: auto;
}

.serie-details h1 {
  font-size: 36px;
  color: #ffdd57;
  font-weight: bold;
  margin-bottom: 20px;
}

.serie-image {
  width: 100%;
  height: auto;
  max-width: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 4px solid #ffdd57;
}

.creators-section {
  margin-top: 30px;
  text-align: center;
}

.creators-section h2 {
  font-size: 24px;
  color: #ffdd57;
  margin-bottom: 10px;
}

/* Lista de creadores */
.creators-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 0;
  list-style-type: none;
  margin: 0;
}

.creator-card {
  background-color: #1a1f26;
  color: white;
  border: 2px solid #ffdd57;
  border-radius: 10px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.creator-card:hover {
  transform: scale(1.1);
  background-color: #ffdd57;
  color: #0d1117;
}

.creator-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.creator-name {
  font-size: 16px;
  font-weight: bold;
}

.loading {
  font-size: 18px;
  color: #aaa;
  margin-top: 20px;
}

.back-btn {
  display: inline-block;
  margin-top: 40px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}
</style>
