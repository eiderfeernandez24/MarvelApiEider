<template>
  <div class="series-card">
    <img
      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      alt="Series image"
    />
    <div class="series-info">
      <h3>{{ serie.title }}</h3>
      <!-- <p v-if="serie.startYear">Año de inicio: {{ serie.startYear }}</p>
      <p v-if="serie.description && serie.description.length > 0">
        {{ truncateDescription(serie.description) }}
      </p> -->
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
@import url(../assets/seriesCardStyles.scss);
</style>
