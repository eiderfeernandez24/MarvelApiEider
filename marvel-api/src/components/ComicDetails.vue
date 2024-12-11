<template>
  <div class="comic-details container">
    <!-- Asegúrate de que 'comic' no sea null antes de intentar acceder a sus propiedades -->
    <div v-if="comic">
      <h1>{{ comic.title }}</h1>

      <!-- Mostrar imagen del cómic -->
      <img
        v-if="comic.thumbnail && comic.thumbnail.path"
        :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
        alt="Comic image"
        class="img-fluid"
      />

      <!-- Mostrar fecha de publicación -->
      <p><strong>Published:</strong> {{ publicationDate }}</p>

      <!-- Mostrar escritores -->
      <p v-if="writers.length">
        <strong>Writer:</strong> {{ writers.join(", ") }}
      </p>

      <!-- Mostrar dibujantes -->
      <p v-if="pencillers.length">
        <strong>Penciller:</strong> {{ pencillers.join(", ") }}
      </p>

      <!-- Mostrar portada -->
      <p v-if="coverArtist.length">
        <strong>Cover Artist:</strong> {{ coverArtist.join(", ") }}
      </p>

      <!-- Descripción del cómic -->
      <p>{{ comic.description || "No description available" }}</p>

      <!-- Botón de volver a la lista de cómics -->
      <button @click="goBackToComicsList" class="btn btn-primary mt-4">
        Back to Comics List
      </button>
    </div>

    <!-- Mostrar un mensaje mientras los datos están cargando -->
    <p v-else>Loading comic details...</p>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5"; // Asegúrate de tener esta dependencia instalada

export default {
  data() {
    return {
      comic: null,
      writers: [],
      pencillers: [],
      coverArtist: [],
      publicationDate: "",
      publicKey: "40039a88658df0ebef4ab4763898ca93", // Tu clave pública
      privateKey: "8e198fb531ca9c933681480119851a819f35a27d", // Tu clave privada
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
        const comicId = this.$route.params.id;
        const hash = this.generateHash();
        console.log("hash", hash);
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
        console.log("response", response);

        // Imprimir la respuesta completa para ver si los datos de los creadores están presentes
        console.log(response.data);

        // Acceder a los datos del cómic
        if (response.data.data.results.length) {
          const comicData = response.data.data.results[0];
          this.comic = comicData;

          // Obtener la fecha de publicación
          const publicationInfo = comicData.dates.find(
            (date) => date.type === "onsaleDate"
          );
          this.publicationDate = publicationInfo
            ? new Date(publicationInfo.date).toLocaleDateString()
            : "No date available";

          // Verificar los creadores en la consola
          console.log("Creators:", comicData.creators.items);

          // Obtener los escritores, dibujantes y artistas de portada
          this.writers = this.extractCreators(comicData, "writer");
          this.pencillers = this.extractCreators(comicData, "penciller");
          this.coverArtist = this.extractCreators(comicData, "cover");

          console.log("Writers:", this.writers);
          console.log("Pencillers:", this.pencillers);
          console.log("Cover Artists:", this.coverArtist);
        } else {
          console.error("Comic not found");
        }
      } catch (error) {
        console.error("Error fetching comic details:", error);
      }
    },

    extractCreators(comicData, role) {
      // Verificar que los datos de creadores estén disponibles
      if (comicData.creators && comicData.creators.items) {
        return comicData.creators.items
          .filter((item) => item.role === role)
          .map((item) => item.name);
      }
      return []; // Retornar un array vacío si no hay creadores
    },

    generateHash() {
      return md5(this.ts + this.privateKey + this.publicKey); // Generar el hash para la API
    },

    // Método para volver a la lista de cómics
    goBackToComicsList() {
      this.$router.push("/episodes");
    },
  },
};
</script>

<style scoped>
/* General */
.comic-details {
  padding: 30px 15px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Título */
.comic-details h1 {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
}

/* Imagen del cómic */
.comic-details img {
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Detalles del cómic */
.comic-details p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 12px;
}

.comic-details p strong {
  font-weight: bold;
  color: #333;
}

/* Sección de descripción */
.comic-details p:last-of-type {
  font-size: 1.2rem;
  font-style: italic;
  color: #777;
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

/* Estilos para la lista de creadores */
.comic-details p {
  padding-left: 15px;
}

.comic-details p:before {
  content: "• ";
  color: #007bff; /* Color del icono de la lista */
}

/* Fondo y sombra del contenedor */
.comic-details {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Botón de Volver */
.comic-details .btn {
  display: block;
  width: 100%;
  font-size: 1.2rem;
  padding: 12px;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}

.comic-details .btn:hover {
  background-color: #0056b3;
}

/* Resposive para pantallas pequeñas */
@media (max-width: 768px) {
  .comic-details {
    padding: 20px;
  }

  .comic-details h1 {
    font-size: 2rem;
  }

  .comic-details p {
    font-size: 1rem;
  }

  .comic-details img {
    max-width: 100%;
  }
}
</style>
