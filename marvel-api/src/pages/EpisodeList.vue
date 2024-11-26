<template>
  <div class="comic-list">
    <h1>LISTA DE CÓMICS</h1>
    <div v-if="comics.length">
      <ComicCard v-for="comic in comics" :key="comic.id" :comic="comic" />
    </div>
    <p v-else>Cargando cómics...</p>
    <button v-if="hasNextPage" @click="loadMoreComics" class="load-more-btn">
      Cargar más cómics
    </button>
  </div>
</template>

<script>
import axios from "axios";
import ComicCard from "../components/ComicCard.vue"; // Asumiendo que tienes un componente ComicCard

export default {
  components: {
    ComicCard,
  },
  data() {
    return {
      comics: [], // Array para almacenar los cómics
      publicKey: "40039a88658df0ebef4ab4763898ca93", // Inserta tu clave pública de Marvel
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d", // Inserta tu clave privada de Marvel
      ts: new Date().getTime(), // Timestamp para la autenticación
      hash: "", // El hash se genera en base a ts + privateKey + publicKey
      offset: 0, // Offset inicial
      limit: 10, // Número de cómics por página
      hasNextPage: true, // Indicador de si hay más cómics para cargar
    };
  },
  created() {
    this.fetchComics();
  },
  methods: {
    async fetchComics() {
      try {
        const hash = this.generateHash();

        // Realiza la petición a la API de Marvel para obtener los cómics
        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/comics",
          {
            params: {
              apikey: this.publicKey,
              ts: this.ts,
              hash: hash,
              limit: this.limit, // Número de cómics a obtener
              offset: this.offset, // Offset para la paginación
            },
          }
        );

        const newComics = response.data.data.results;

        if (newComics.length > 0) {
          this.comics = [...this.comics, ...newComics]; // Agregar los nuevos cómics a la lista existente
          this.offset += this.limit; // Actualizar el offset para la siguiente página
        } else {
          this.hasNextPage = false; // Si no hay más cómics, deshabilitar el botón
        }
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    },

    loadMoreComics() {
      // Llamar a la función para cargar más cómics
      this.fetchComics();
    },

    // Método para generar el hash (md5)
    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
.comic-list {
  text-align: center;
  padding: 20px;
}

.comic-card {
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

.comic-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s;
}

.comic-card img:hover {
  transform: scale(1.1);
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
</style>
