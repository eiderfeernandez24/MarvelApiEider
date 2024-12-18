<template>
  <div class="comic-details container mt-5" v-if="comic">
    <div class="comic-details-wrapper">
      <h1 class="text-center mb-4">{{ comic.title }}</h1>
      <div class="row">
        <div class="col-md-5 text-center">
          <img
            :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
            :alt="comic.title"
            class="comic-image img-fluid"
          />
        </div>
        <div class="col-md-7">
          <!-- Descripción del cómic -->
          <div v-if="comic.description" class="comic-description">
            <h3>{{ $t("comicDetails.descriptionTitle") }}</h3>
            <p>{{ comic.description }}</p>
          </div>
          <div v-else class="no-description">
            <h3>{{ $t("comicDetails.descriptionTitle") }}</h3>
            <p>{{ $t("comicDetails.noDescription") }}</p>
          </div>

          <!-- Creadores -->
          <div v-if="comic.creators.items.length" class="comics-section">
            <h2>{{ $t("comicDetails.creatorsTitle") }}</h2>
            <ul class="comics-list">
              <li v-for="creator in comic.creators.items" :key="creator.name">
                <i class="comic-icon">✏️</i>
                <strong>{{ creator.name }}</strong> - {{ creator.role }}
              </li>
            </ul>
          </div>

          <!-- Botón para volver a la lista de cómics -->
          <router-link to="/episodes" class="back-btn">
            {{ $t("comicDetails.backToList") }}
          </router-link>

          <!-- Botón para volver a la lista de cómics -->
          <router-link to="/characters" class="back-btn">
            {{ $t("comicDetails.backToList") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      comic: null,
      originCharacterId: null, // ID del personaje desde el cual llegamos
      publicKey: "40039a88658df0ebef4ab4763898ca93",
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d",
      ts: new Date().getTime(),
      hash: "",
    };
  },
  created() {
    this.fetchComicDetails();
    this.setOriginCharacterId();
  },
  methods: {
    async fetchComicDetails() {
      try {
        const hash = this.generateHash();
        const comicId = this.$route.params.id;

        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics/${comicId}`,
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
            },
          }
        );

        this.comic = response.data.data.results[0];
      } catch (error) {
        console.error("Error fetching comic details:", error);
      }
    },

    // Método para obtener el ID del personaje desde la ruta
    setOriginCharacterId() {
      // Verificamos si la URL contiene el ID del personaje
      const characterId = this.$route.query.characterId; // Esperamos que se pase el ID del personaje en los parámetros de la URL
      if (characterId) {
        this.originCharacterId = characterId;
      }
    },

    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
@import url(../assets/comicDetailsStyles.scss);
</style>
