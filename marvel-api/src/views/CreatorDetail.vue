<template>
  <div class="creator-detail">
    <h1>Detalles del Creador</h1>
    <div v-if="creator">
      <h2>{{ creator.fullName }}</h2>
      <p><strong>Rol:</strong> {{ creator.role }}</p>
      <p><strong>Series:</strong> {{ creator.series.available }}</p>
      <p><strong>Cómics:</strong> {{ creator.comics.available }}</p>
      <img
        :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`"
        alt="Imagen del creador"
      />
    </div>
    <p v-else>Cargando...</p>
    <router-link to="/creators" class="link"
      >Volver a la lista de creadores</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      creator: null,
    };
  },
  created() {
    this.fetchCreatorDetails();
  },
  methods: {
    async fetchCreatorDetails() {
      const publicKey = "40039a88658df0ebef4ab4763898ca93";
      const privateKey = "8e198fb531ca9c933681480119851a819f35a27d";
      const ts = new Date().getTime();
      const md5 = require("md5");
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/creators/${this.id}`,
          {
            params: {
              apikey: publicKey,
              ts: ts,
              hash: hash,
            },
          }
        );
        this.creator = response.data.data.results[0];
      } catch (error) {
        console.error("Error fetching creator details:", error);
      }
    },
  },
};
</script>

<style scoped>
.creator-detail {
  text-align: center;
  padding: 20px;
}

img {
  max-width: 300px;
  border-radius: 10px;
  margin-top: 20px;
}

.link {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #42b983;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
