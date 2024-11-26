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
    <p v-else class="no-description">No hay descripción disponible.</p>

    <div v-if="character.comics.items.length" class="comics-section">
      <h2>Comics:</h2>
      <ul class="comics-list">
        <li v-for="comic in character.comics.items" :key="comic.name">
          <i class="comic-icon">📚</i> {{ comic.name }}
        </li>
      </ul>
    </div>

    <router-link to="/characters" class="back-btn"
      >Volver a la lista</router-link
    >
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

        // Petición a la API para obtener los detalles del personaje
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
  },
};
</script>

<style scoped>
.character-details {
  text-align: center;
  padding: 30px;
  background: #0d1117;
  color: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: auto;
}

.character-details h1 {
  font-size: 36px;
  color: #ffdd57;
  font-weight: bold;
  margin-bottom: 20px;
}

.character-image {
  width: 100%;
  height: auto;
  max-width: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 4px solid #ffdd57;
}

.character-description {
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.no-description {
  font-size: 18px;
  color: #ccc;
  margin-bottom: 20px;
}

.comics-section {
  margin-top: 30px;
  text-align: left;
}

.comics-section h2 {
  font-size: 24px;
  color: #ffdd57;
  margin-bottom: 10px;
}

.comics-list {
  list-style-type: none;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
}

.comics-list li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.comic-icon {
  margin-right: 10px;
  font-size: 18px;
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
