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
          <!-- <div v-if="comic.description" class="comic-description">
            <h3>Descripción:</h3>
            <p>{{ comic.description }}</p>
          </div>
          <div v-else class="no-description">
            <h3>Descripción:</h3>
            <p>No hay descripción disponible.</p>
          </div> -->

          <div v-if="comic.creators.items.length" class="comics-section">
            <h2>Creadores:</h2>
            <ul class="comics-list">
              <li v-for="creator in comic.creators.items" :key="creator.name">
                <i class="comic-icon">✏️</i>
                <strong>{{ creator.name }}</strong> - {{ creator.role }}
              </li>
            </ul>
          </div>

          <router-link to="/episodes" class="back-btn"
            >Volver a la lista</router-link
          >
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
      publicKey: "40039a88658df0ebef4ab4763898ca93",
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d",
      ts: new Date().getTime(),
      hash: "",
    };
  },
  created() {
    this.fetchComicDetails();
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

    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #f5f5f5;
  background: #0d1117;
}

.comic-details-wrapper {
  text-align: center;
  padding: 30px;
  background: #0d1117;
  color: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: auto;
}

.comic-details-wrapper h1 {
  font-size: 36px;
  color: #ffdd57;
  font-weight: bold;
  margin-bottom: 20px;
}

.comic-image {
  width: 100%;
  height: auto;
  max-width: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 4px solid #ffdd57;
}

.comic-description {
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
