<template>
  <div class="character-list">
    <h1>{{ $t("characterList.title") }}</h1>

    <!-- Campo de búsqueda -->
    <div>
      <input
        type="text"
        v-model="searchTerm"
        @input="debouncedSearch"
        :placeholder="$t('characterList.searchPlaceholder')"
        class="search-input"
      />
    </div>

    <!-- Lista de personajes -->
    <div v-if="filteredCharacters.length">
      <div class="row g-4">
        <!-- Cada tarjeta de personaje -->
        <div
          v-for="character in filteredCharacters"
          :key="character.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center"
        >
          <CharacterCard :character="character" />
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay personajes -->
    <p v-else>{{ $t("characterList.loading") }}</p>

    <!-- Botón "Cargar más" (se oculta si hay una búsqueda activa) -->
    <button
      v-if="!searchTerm && hasNextPage"
      @click="loadMoreCharacters"
      class="load-more-btn"
    >
      {{ $t("characterList.loadMore") }}
    </button>

    <!-- Enlace para volver al inicio -->
    <router-link to="/" class="load-more-btn">{{
      $t("characterList.backToHome")
    }}</router-link>
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

/* CSS para asegurar que las tarjetas no se vean aplastadas */
.row {
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se distribuyan en múltiples filas */
  justify-content: space-between; /* Asegura que las tarjetas tengan espacio entre ellas */
}

.character-card {
  background-color: #1e272e; /* Fondo oscuro para las tarjetas */
  color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character-card img {
  width: 100%;
  height: auto; /* Ajustar la altura de la imagen para mantener la proporción */
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

/* Asegurar que las tarjetas no se estiren o se hagan pequeñas */
.col-12,
.col-sm-6,
.col-md-4,
.col-lg-3,
.col-xl-2 {
  display: flex;
  justify-content: center;
  align-items: stretch; /* Asegura que las tarjetas no se estiren en exceso */
}

.col-12.col-sm-6.col-md-4.col-lg-3 {
  flex: 1 1 20%; /* Evitar que las tarjetas se hagan demasiado pequeñas */
}

/* MEDIA QUERIES PARA DISPOSITIVOS MÓVILES Y PEQUEÑAS PANTALLAS */

/* En pantallas de 500px o menos, se deben mostrar una tarjeta por fila */
@media (max-width: 500px) {
  .row {
    display: block; /* Las tarjetas se apilan en lugar de distribuirse en fila */
  }

  .col-12 {
    margin-bottom: 20px; /* Espaciado entre las tarjetas */
  }
}
</style>
