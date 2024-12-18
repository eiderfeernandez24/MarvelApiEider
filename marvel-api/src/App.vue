<template>
  <div id="app">
    <!-- Imagen centrada con margen superior de 20px -->
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmHn7hDycWvYvGnj50dxygz2EUz8MBKKCqg&s"
      alt="Marvel Logo"
      class="marvel-logo d-block mx-auto mt-3 mb-4"
    />

    <!-- Botones para cambiar idioma -->
    <div class="language-switcher">
      <button @click="switchLanguage('es')" class="language-button">
        Español
      </button>
      <button @click="switchLanguage('en')" class="language-button">
        English
      </button>
    </div>

    <router-view />

    <footer>
      <div class="container">
        <div class="footer-content row">
          <!-- Sección sobre nosotros -->
          <div class="footer-left col-12 col-md-4 mb-4 mb-md-0">
            <h3>{{ $t("footer.aboutUs") }}</h3>
            <p>{{ $t("footer.aboutDescription") }}</p>
          </div>

          <!-- Sección redes sociales -->
          <div class="footer-center col-12 col-md-4 text-center mb-4 mb-md-0">
            <h3>{{ $t("footer.socialMedia") }}</h3>
            <div class="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                class="social-link"
              >
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                class="social-link"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" class="social-link">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Sección contacto -->
          <div class="footer-right col-12 col-md-4 text-center mb-4 mb-md-0">
            <h3>{{ $t("footer.contact") }}</h3>
            <p>
              <i class="fa fa-envelope"></i> {{ $t("footer.contactEmail") }}
            </p>
            <p>
              <i class="fa fa-map-marker-alt"></i>
              {{ $t("footer.contactAddress") }}
            </p>
          </div>
        </div>

        <!-- Parte inferior del footer -->
        <div class="footer-bottom text-center mt-4">
          <p>{{ $t("footer.copyright") }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    switchLanguage(language) {
      this.$i18n.locale = language; // Cambiar el idioma
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(to bottom, #0d1117, #1e272e);
  overflow: hidden;
}

.language-switcher {
  margin: 10px 0;
}

.language-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.language-button:hover {
  background-color: #36a373;
}

footer {
  background-color: #1e272e;
  color: #fff;
  padding: 20px 0;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
}

.footer-left,
.footer-center,
.footer-right {
  padding: 10px;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-link {
  color: #fff;
  margin: 0 10px;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.social-link:hover {
  color: #42b983;
}

.footer-bottom {
  font-size: 0.9rem;
  text-align: center;
}
</style>
