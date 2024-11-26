<template>
  <div class="home">
    <div class="hero-section">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmHn7hDycWvYvGnj50dxygz2EUz8MBKKCqg&s"
        alt="Marvel Logo"
        class="marvel-logo"
      />
      <h1>Explora el Universo Marvel</h1>
      <p>
        Descubre a tus creadores favoritos, los episodios más emocionantes, y
        más detalles sobre el vasto multiverso de Marvel.
      </p>
      <div class="button-group">
        <router-link to="/episodes" class="link episodes-link">
          <i class="fa fa-film"></i> Ver Comics
        </router-link>
        <router-link to="/characters" class="link creators-link">
          <i class="fa fa-users"></i> Ver Personajes
        </router-link>
        <router-link to="/series" class="link games-link">
          <i class="fa fa-gamepad"></i> Ver Series
        </router-link>
      </div>
    </div>

    <div class="feature-section">
      <h2>¿Qué puedes explorar?</h2>
      <div class="feature-cards">
        <div class="card">
          <i class="fa fa-video-camera"></i>
          <h3>Episodios</h3>
          <p>
            Sumérgete en el catálogo completo de episodios de tus series y
            películas favoritas de Marvel.
          </p>
        </div>
        <div class="card">
          <i class="fa fa-pencil"></i>
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

    <footer>
      <div class="footer-content">
        <div class="footer-left">
          <h3>Sobre Nosotros</h3>
          <p>
            Esta página está dedicada a todos los fans del universo Marvel, con
            el objetivo de explorar los creadores y episodios que dieron vida a
            los héroes más icónicos.
          </p>
        </div>
        <div class="footer-center">
          <h3>Redes Sociales</h3>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" class="social-link">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-link">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-link">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div class="footer-right">
          <h3>Contacto</h3>
          <p><i class="fa fa-envelope"></i> contacto@marvelfans.com</p>
          <p>
            <i class="fa fa-map-marker-alt"></i> Universo Marvel, Multiverso
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          © 2024 Creado por Eider Fernández Crespo. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
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
