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
      } catch (error) {
        console.error("Error fetching serie details:", error);
      }
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
