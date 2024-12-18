<template>
  <div class="series-list">
    <h1>{{ $t("seriesList.title") }}</h1>
    <div v-if="series.length">
      <div class="series-card-container">
        <SeriesCard v-for="serie in series" :key="serie.id" :serie="serie" />
      </div>
    </div>
    <p v-else>{{ $t("seriesList.loading") }}</p>
    <button v-if="hasNextPage" @click="loadMoreSeries" class="load-more-btn">
      {{ $t("seriesList.loadMore") }}
    </button>
    <router-link to="/" class="load-more-btn">
      {{ $t("seriesList.backToHome") }}
    </router-link>
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
      series: [],
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
    this.fetchSeries();
  },
  methods: {
    async fetchSeries() {
      try {
        const hash = this.generateHash();

        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/series",
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

        const newSeries = response.data.data.results;

        if (newSeries.length > 0) {
          this.series = [...this.series, ...newSeries];
          this.offset += this.limit;
        } else {
          this.hasNextPage = false;
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    },

    loadMoreSeries() {
      this.fetchSeries();
    },

    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
@import url(../assets/serieListStyles.scss);
</style>
