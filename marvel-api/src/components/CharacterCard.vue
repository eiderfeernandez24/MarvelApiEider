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
@import url(../assets/characterCardStyles.scss);
</style>
