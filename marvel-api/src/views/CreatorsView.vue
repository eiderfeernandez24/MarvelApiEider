<template>
  <div class="creator-list">
    <h1>LISTA DE CREADORES</h1>
    <div v-if="creators.length">
      <div v-for="creator in creators" :key="creator.id" class="creator-card">
        <img
          :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`"
          alt="Imagen del creador"
        />
        <h3>{{ creator.fullName }}</h3>
        <p>{{ creator.role }}</p>
        <router-link
          :to="{ name: 'CreatorDetail', params: { id: creator.id } }"
          class="details-link"
        >
          Ver detalles
        </router-link>
      </div>
    </div>
    <p v-else>Cargando creadores...</p>
    <button v-if="hasNextPage" @click="loadMoreCreators" class="load-more-btn">
      Cargar más creadores
    </button>
    <router-link to="/" class="link">Volver al Inicio</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatorsView",
  data() {
    return {
      creators: [], // Lista de creadores
      publicKey: "40039a88658df0ebef4ab4763898ca93", // Clave pública
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d", // Clave privada
      ts: new Date().getTime(), // Timestamp
      offset: 0, // Offset inicial
      limit: 10, // Número de creadores por página
      hasNextPage: true, // Indicador de más datos
    };
  },
  created() {
    this.fetchCreators();
  },
  methods: {
    async fetchCreators() {
      try {
        const hash = this.generateHash();

        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/creators",
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

        const newCreators = response.data.data.results;

        if (newCreators.length > 0) {
          this.creators = [...this.creators, ...newCreators];
          this.offset += this.limit;
        } else {
          this.hasNextPage = false;
        }
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    },
    loadMoreCreators() {
      this.fetchCreators();
    },
    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
.creator-list {
  text-align: center;
  padding: 20px;
}

.creator-card {
  display: inline-block;
  text-align: center;
  margin: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.creator-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s;
}

.creator-card img:hover {
  transform: scale(1.1);
}

.creator-card h3 {
  margin: 10px 0;
  font-size: 18px;
  color: #333;
}

.creator-card p {
  color: gray;
  font-size: 14px;
}

p {
  color: gray;
  font-size: 16px;
  padding-top: 20px;
}

.load-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.load-more-btn:hover {
  background-color: #0056b3;
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

.details-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
