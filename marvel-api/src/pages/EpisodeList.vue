<template>
  <div class="comic-list container-fluid py-4">
    <h1 class="text-center mb-4">LISTA DE CÓMICS</h1>

    <div v-if="comics.length" class="row g-3">
      <!-- Cada tarjeta de cómic -->
      <div
        v-for="comic in comics"
        :key="comic.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center"
      >
        <ComicCard :comic="comic" />
      </div>
    </div>

    <p v-else class="text-center text-white">Cargando cómics...</p>

    <!-- Botones -->
    <div class="d-flex justify-content-center mt-4 gap-3">
      <button
        v-if="hasNextPage"
        @click="loadMoreComics"
        class="load-more-btn btn btn-primary"
      >
        Cargar más cómics
      </button>

      <router-link to="/" class="load-more-btn btn btn-secondary">
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ComicCard from "../components/ComicCard.vue";

export default {
  components: {
    ComicCard,
  },
  data() {
    return {
      comics: [],
      publicKey: "40039a88658df0ebef4ab4763898ca93",
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d",
      ts: new Date().getTime(),
      hash: "",
      offset: 0,
      limit: 10,
      hasNextPage: true,
    };
  },
  created() {
    this.fetchComics();
  },
  methods: {
    async fetchComics() {
      try {
        const hash = this.generateHash();
        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/comics",
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
              limit: this.limit,
              offset: this.offset,
            },
          }
        );

        const newComics = response.data.data.results;

        if (newComics.length > 0) {
          this.comics = [...this.comics, ...newComics];
          this.offset += this.limit;
        } else {
          this.hasNextPage = false;
        }
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    },
    loadMoreComics() {
      this.fetchComics();
    },
    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
@import url(../assets/episodeListStyle.scss);
</style>
