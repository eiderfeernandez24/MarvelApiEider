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
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4"
      >
        <!-- Cada tarjeta de personaje -->
        <div
          v-for="character in filteredCharacters"
          :key="character.id"
          class="col d-flex justify-content-center"
        >
          <CharacterCard :character="character" />
        </div>
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
import CharacterCard from "../components/CharacterCard.vue";
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
@import url(../assets/characterListStyles.scss);
</style>
