<template>
  <div class="serie-details" v-if="serie">
    <h1>{{ serie.title }}</h1>
    <img
      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      alt="Serie Image"
      class="serie-image"
    />

    <div v-if="creators.length" class="creators-section">
      <h2>{{ $t("serieDetails.creators") }}:</h2>
      <ul class="creators-list">
        <li v-for="creator in creators" :key="creator">
          {{ creator }}
        </li>
      </ul>
    </div>

    <div v-if="comics.length" class="comics-section">
      <h2>Lista de cómics:</h2>
      <ul class="comics-list">
        <li v-for="comic in comics" :key="comic.id" class="comic-item">
          <router-link :to="`/comicDetails/${comic.id}`" class="comic-link">
            {{ comic.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <router-link to="/series" class="back-btn">{{
      $t("serieDetails.backToList")
    }}</router-link>
  </div>
  <p v-else class="loading">{{ $t("serieDetails.loading") }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      serie: null,
      creators: [],
      comics: [],
    };
  },
  created() {
    this.fetchSerieDetails();
  },
  methods: {
    async fetchSerieDetails() {
      const seriesId = this.$route.params.seriesId;
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

        if (serieData.creators && serieData.creators.items.length > 0) {
          this.creators = serieData.creators.items.map(
            (creator) => creator.name
          );
        }

        // Fetch associated comics
        if (serieData.comics && serieData.comics.items.length > 0) {
          this.comics = serieData.comics.items.map((comic) => ({
            id: this.extractIdFromUri(comic.resourceURI),
            title: comic.name,
          }));
        }
      } catch (error) {
        console.error("Error fetching serie details:", error);
      }
    },
    extractIdFromUri(uri) {
      return uri.split("/").pop(); // Extracts the ID from the resource URI
    },
    generateHash(ts, privateKey, publicKey) {
      const md5 = require("md5");
      return md5(ts + privateKey + publicKey);
    },
  },
};
</script>

<style scoped>
@import url(../assets/serieDetailsStyles.scss);
</style>
