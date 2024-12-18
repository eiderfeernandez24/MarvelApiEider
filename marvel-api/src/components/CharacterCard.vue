<template>
  <div class="character-card col-12 col-sm-6 col-md-4 col-lg-3">
    <!-- Imagen del personaje -->
    <img
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name"
      class="img-fluid"
    />
    <h3>{{ character.name }}</h3>

    <!-- Botón para ver detalles -->
    <router-link
      :to="{ name: 'characterDetails', params: { id: character.id } }"
      class="btn-details"
    >
      {{ $t("characterCard.viewDetails") }}
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
