<template>
  <div class="comic-card">
    <!-- Imagen del cómic -->
    <img
      :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
      :alt="comic.title"
    />
    <h3>{{ comic.title }}</h3>
    <!-- Descripción del cómic -->
    <p v-if="comic.description">{{ comic.description }}</p>
    <p v-else>Sin descripción disponible.</p>
  </div>
</template>

<script>
export default {
  props: {
    // Propiedad para recibir un cómic
    comic: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.comic-card {
  display: inline-block;
  text-align: center;
  margin: 10px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  height: 320px; /* Altura fija para todas las tarjetas */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden; /* Para que el contenido no se desborde si hay una gran diferencia de tamaño */
}

.comic-card img {
  width: 100%;
  height: 180px; /* Establece una altura consistente para las imágenes */
  object-fit: cover; /* Recorta la imagen si es necesario para mantener su proporción */
  border-radius: 8px;
  margin-bottom: 10px; /* Espacio entre la imagen y el texto */
}

.comic-card h3 {
  margin: 10px 0;
  font-size: 1.1em;
  font-weight: bold;
}

.comic-card p {
  font-size: 0.9em;
  color: #666;
  margin: 0;
}
</style>
