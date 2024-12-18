<template>
  <div class="home">
    <div class="hero-section">
      <h1>{{ $t("hero.title") }}</h1>
      <p>{{ $t("hero.description") }}</p>
      <div class="button-group row">
        <!-- Botón Ver Comics -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/episodes" class="link episodes-link">
            <i class="fa fa-film"></i> {{ $t("buttons.comics") }}
          </router-link>
        </div>

        <!-- Botón Ver Personajes -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/characters" class="link creators-link">
            <i class="fa fa-users"></i> {{ $t("buttons.characters") }}
          </router-link>
        </div>

        <!-- Botón Ver Series -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/series" class="link games-link">
            <i class="fa fa-gamepad"></i> {{ $t("buttons.series") }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="feature-section">
      <h2>{{ $t("feature.title") }}</h2>
      <div class="feature-cards">
        <div class="card">
          <i class="fas fa-video"></i>
          <h3>{{ $t("feature.episodes.title") }}</h3>
          <p>{{ $t("feature.episodes.description") }}</p>
        </div>
        <div class="card">
          <i class="fas fa-pencil-alt"></i>
          <h3>{{ $t("feature.creators.title") }}</h3>
          <p>{{ $t("feature.creators.description") }}</p>
        </div>
        <div class="card">
          <i class="fa fa-star"></i>
          <h3>{{ $t("feature.heroes.title") }}</h3>
          <p>{{ $t("feature.heroes.description") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
@import url(../assets/styles.scss);
</style>
