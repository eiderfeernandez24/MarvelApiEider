<template>
  <div class="comic-card">
    <img
      :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
      alt="Comic image"
    />
    <h3>{{ comic.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    comic: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url(../assets/comicCardStyles.scss);
</style>
