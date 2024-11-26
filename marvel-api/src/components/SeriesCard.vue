<template>
  <div class="series-card">
    <img
      :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      alt="Series image"
    />
    <h3>{{ serie.title }}</h3>
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
};
</script>

<style scoped>
.series-card {
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

.series-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.series-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #ffdd57;
  margin-top: 10px;
}

.view-characters-btn {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.view-characters-btn:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .series-card {
    width: 180px;
    height: 300px;
  }

  .series-card h3 {
    font-size: 16px;
  }
}
</style>
