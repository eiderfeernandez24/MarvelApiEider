<template>
  <div class="series-card">
    <img
      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      alt="Series image"
    />
    <div class="series-info">
      <h3>{{ serie.title }}</h3>
      <p v-if="serie.startYear">Año de inicio: {{ serie.startYear }}</p>
      <p v-if="serie.description && serie.description.length > 0">
        {{ truncateDescription(serie.description) }}
      </p>
      <p v-if="serie.comics.available">
        Comics disponibles: {{ serie.comics.available }}
      </p>
      <router-link
        :to="{ name: 'serieDetails', params: { seriesId: serie.id } }"
        class="view-details-btn"
      >
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Método para truncar la descripción si es demasiado larga
    truncateDescription(description) {
      const maxLength = 100;
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
      }
      return description;
    },
  },
};
</script>

<style scoped>
.series-card {
  background-color: #1e272e;
  color: white;
  padding: 15px;
  border-radius: 10px;
  width: 230px;
  height: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.series-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.series-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.series-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.series-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #ffdd57;
  margin-bottom: 10px;
}

.series-card p {
  font-size: 14px;
  color: #f0f0f0;
  margin: 5px 0;
  line-height: 1.4;
}

.view-details-btn {
  display: inline-block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.view-details-btn:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .series-card {
    width: 200px;
    height: 350px;
  }

  .series-card h3 {
    font-size: 16px;
  }

  .series-card p {
    font-size: 13px;
  }
}
</style>
