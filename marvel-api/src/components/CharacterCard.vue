<template>
  <div class="character-card">
    <!-- Imagen del personaje -->
    <img
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name"
    />
    <h3>{{ character.name }}</h3>

    <!-- Botón para ver detalles -->
    <router-link
      :to="{ name: 'characterDetails', params: { id: character.id } }"
      class="btn-details"
    >
      Ver detalles
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Estilos de la tarjeta */
.character-card {
  background-color: #1e272e;
  color: white;
  padding: 15px;
  border-radius: 10px;
  width: 220px;
  height: 350px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.character-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.character-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s ease;
}

.character-card img:hover {
  transform: scale(1.05);
}

.character-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #ffdd57;
  margin-top: 10px;
  margin-bottom: 5px;
}

.character-card p {
  color: #ccc;
  font-size: 14px;
  margin-top: 10px;
}

/* Estilos para el botón de detalles */
.btn-details {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-details:hover {
  background-color: #0056b3;
}

/* Responsive adjustments using media queries */

/* Para pantallas de tamaño mediano (desde 600px hasta 900px) */
@media (max-width: 900px) {
  .character-card {
    width: 180px; /* Reducir el ancho de la tarjeta */
    height: 320px; /* Ajustar la altura */
  }

  .character-card h3 {
    font-size: 16px; /* Reducir el tamaño del título */
  }

  .btn-details {
    font-size: 12px; /* Ajustar el tamaño del botón */
    padding: 6px 12px;
  }
}

/* Para pantallas pequeñas (menos de 600px) */
@media (max-width: 600px) {
  .character-card {
    width: 160px; /* Reducir aún más el ancho de la tarjeta */
    height: 280px; /* Ajustar la altura */
  }

  .character-card h3 {
    font-size: 14px; /* Reducir el tamaño del título */
  }

  .btn-details {
    font-size: 10px; /* Reducir el tamaño del botón */
    padding: 4px 10px;
  }
}

/* Para pantallas muy pequeñas (menos de 400px) */
@media (max-width: 400px) {
  .character-card {
    width: 140px; /* Hacer la tarjeta aún más pequeña */
    height: 260px;
  }

  .character-card h3 {
    font-size: 12px; /* Reducir aún más el tamaño del título */
  }

  .btn-details {
    font-size: 8px; /* Reducir el tamaño del botón */
    padding: 3px 8px;
  }
}
</style>
