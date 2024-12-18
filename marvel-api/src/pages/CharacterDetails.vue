<template>
  <div class="character-details" v-if="character">
    <h1>{{ character.name }}</h1>
    <img
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name"
      class="character-image"
    />
    <p v-if="character.description" class="character-description">
      {{ character.description }}
    </p>
    <p v-else class="no-description">
      {{ $t("characterDetails.noDescription") }}
    </p>

    <div v-if="character.comics.items.length" class="comics-section">
      <h2>{{ $t("characterDetails.comics") }}:</h2>
      <ul class="comics-list">
        <li v-for="comic in character.comics.items" :key="comic.name">
          <i class="comic-icon">📚</i>
          <router-link
            :to="`/comicDetails/${comic.resourceURI.split('/').pop()}`"
            class="comic-link"
            @click="handleClick"
          >
            {{ comic.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <router-link to="/characters" class="back-btn">
      {{ $t("characterDetails.backToList") }}
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      character: null,
      publicKey: "40039a88658df0ebef4ab4763898ca93",
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d",
      ts: new Date().getTime(),
      hash: "",
    };
  },
  created() {
    this.fetchCharacterDetails();
  },
  methods: {
    async fetchCharacterDetails() {
      try {
        const hash = this.generateHash();
        const characterId = this.$route.params.id;

        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}`,
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
            },
          }
        );
        this.character = response.data.data.results[0];
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    },

    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },

    handleClick() {
      console.log("Comic link clicked!");
    },
  },
};
</script>

<style scoped>
@import url(../assets/characterDetailsStyles.scss);
</style>
