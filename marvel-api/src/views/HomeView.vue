<template>
  <div class="home">
    <div class="hero-section">
      <h1>Explora el Universo Marvel</h1>
      <p>
        Descubre a tus creadores favoritos, los episodios más emocionantes, y
        más detalles sobre el vasto multiverso de Marvel.
      </p>
      <div class="button-group row">
        <!-- Botón Ver Comics -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/episodes" class="link episodes-link">
            <i class="fa fa-film"></i> Ver Comics
          </router-link>
        </div>

        <!-- Botón Ver Personajes -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/characters" class="link creators-link">
            <i class="fa fa-users"></i> Ver Personajes
          </router-link>
        </div>

        <!-- Botón Ver Series -->
        <div class="col-6 col-md-4 mb-3">
          <router-link to="/series" class="link games-link">
            <i class="fa fa-gamepad"></i> Ver Series
          </router-link>
        </div>
      </div>
    </div>

    <div class="feature-section">
      <h2>¿Qué puedes explorar?</h2>
      <div class="feature-cards">
        <div class="card">
          <i class="fas fa-video"></i>
          <h3>Episodios</h3>
          <p>
            Sumérgete en el catálogo completo de episodios de tus series y
            películas favoritas de Marvel.
          </p>
        </div>
        <div class="card">
          <i class="fas fa-pencil-alt"></i>
          <h3>Creadores</h3>
          <p>
            Aprende más sobre los genios detrás de las historias y personajes
            icónicos.
          </p>
        </div>
        <div class="card">
          <i class="fa fa-star"></i>
          <h3>Héroes</h3>
          <p>
            Explora a los héroes que han definido el universo Marvel, desde Iron
            Man hasta Spider-Man.
          </p>
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
