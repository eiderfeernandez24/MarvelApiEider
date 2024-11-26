<template>
  <div class="character-list">
    <h1>LISTA DE PERSONAJES</h1>

    <!-- Campo de búsqueda -->
    <div>
      <input
        type="text"
        v-model="searchTerm"
        @input="debouncedSearch"
        placeholder="Buscar personaje"
        class="search-input"
      />
    </div>

    <div v-if="filteredCharacters.length">
      <div class="character-card-container">
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :character="character"
        />
      </div>
    </div>

    <p v-else>Cargando personajes...</p>

    <button
      v-if="hasNextPage"
      @click="loadMoreCharacters"
      class="load-more-btn"
    >
      Cargar más personajes
    </button>

    <router-link to="/" class="load-more-btn"> Volver al Inicio </router-link>
  </div>
</template>

<script>
import axios from "axios";
import CharacterCard from "../components/CharacterCard.vue"; // Componente CharacterCard
import { debounce } from "lodash"; // Importamos debounce de lodash

export default {
  components: {
    CharacterCard,
  },
  data() {
    return {
      characters: [], // Lista de personajes
      searchTerm: "", // Término de búsqueda
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
    this.fetchCharacters();
  },

  computed: {
    // Filtra los personajes basados en el término de búsqueda
    filteredCharacters() {
      return this.characters.filter((character) =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  methods: {
    // Método que realiza la búsqueda con retraso (debounced)
    debouncedSearch: debounce(function () {
      this.filteredCharacters; // Reactiva el filtrado cuando el término cambia
    }, 500),

    async fetchCharacters() {
      try {
        const hash = this.generateHash();

        const response = await axios.get(
          "https://gateway.marvel.com/v1/public/characters",
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

        const newCharacters = response.data.data.results;

        if (newCharacters.length > 0) {
          this.characters = [...this.characters, ...newCharacters]; // Agregar personajes al array
          this.offset += this.limit; // Actualizar el offset para cargar más
        } else {
          this.hasNextPage = false; // No hay más personajes para cargar
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    },

    loadMoreCharacters() {
      this.fetchCharacters();
    },

    generateHash() {
      const md5 = require("md5");
      return md5(this.ts + this.privateKey + this.publicKey);
    },
  },
};
</script>

<style scoped>
.character-list {
  text-align: center;
  padding: 20px;
  background: #0d1117; /* Fondo completamente negro */
  color: white;
  min-height: 100vh; /* Asegura que ocupa toda la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.character-card-container {
  display: grid; /* Usamos CSS Grid */
  grid-template-columns: repeat(5, 1fr); /* 5 columnas iguales */
  gap: 20px; /* Espaciado entre las tarjetas */
  justify-items: center; /* Centrar las tarjetas dentro de cada columna */
  margin-top: 20px; /* Espaciado superior */
}

/* Estilo para el campo de búsqueda */
.search-input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2e3338;
  color: white;
}

.search-input::placeholder {
  color: #aaa;
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
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none; /* Eliminar subrayado del enlace */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.load-more-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px); /* Botón se eleva ligeramente */
}

.character-list h1 {
  font-size: 28px;
  color: #ffdd57; /* Amarillo para mantener consistencia */
  margin-bottom: 20px;
}

.character-card {
  background-color: #1e272e; /* Fondo oscuro para las tarjetas */
  color: white;
  padding: 15px;
  border-radius: 10px;
  width: 220px; /* Ancho fijo para las tarjetas */
  height: 350px; /* Altura fija para las tarjetas */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.character-card:hover {
  transform: translateY(-10px); /* Efecto hover: tarjeta se eleva */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Sombra más intensa en hover */
}

.character-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0; /* Bordes redondeados superiores */
  transition: transform 0.3s ease;
}

.character-card img:hover {
  transform: scale(1.05); /* Efecto zoom al pasar el ratón sobre la imagen */
}

.character-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #ffdd57; /* Color amarillo para destacar */
  margin-top: 10px;
  margin-bottom: 5px;
}

.character-card p {
  color: #ccc; /* Texto gris claro */
  font-size: 14px;
  margin-top: 10px;
}
</style>
