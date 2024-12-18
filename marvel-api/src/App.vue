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
        <img
          src="https://th.bing.com/th/id/R.1eea68ff9050ba013cf554ea4f6f7fa1?rik=gd%2b2cXkEHRwN%2fg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f05%2fSpain-Flag.png&ehk=a5gp9MdULAuhoyyi5mEUfhs5EdglaAWNm%2f6e0u4VoE8%3d&risl=&pid=ImgRaw&r=0"
          alt="Español"
          class="flag-icon"
        />
      </button>
      <button @click="switchLanguage('en')" class="language-button">
        <img
          src="https://static.vecteezy.com/system/resources/previews/001/176/889/non_2x/flag-of-england-background-vector.jpg"
          alt="English"
          class="flag-icon"
        />
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
/* Fondo de pantalla */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(to bottom, #0d1117, #1e272e);
  overflow: hidden;
}

/* Animación de entrada para el logo */
.marvel-logo {
  animation: fadeInLogo 1.5s ease-out;
}

/* Botones para cambiar idioma, ubicados en la esquina superior derecha */
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
}

.language-button {
  background-color: transparent;
  border: none;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.language-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.6);
}

.flag-icon {
  width: 30px;
  height: 20px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.language-button:hover .flag-icon {
  transform: rotate(10deg);
}

/* Animación para los íconos de redes sociales */
.social-icons {
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease;
}

.social-link {
  color: #fff;
  margin: 0 10px;
  font-size: 1.5rem;
  transition: color 0.3s, transform 0.3s;
}

.social-link:hover {
  color: #42b983;
  transform: rotate(360deg);
}

/* Animación de aparición del footer */
footer {
  background-color: #1e272e;
  color: #fff;
  padding: 20px 0;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInFooter 1s forwards 0.5s;
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

.footer-bottom {
  font-size: 0.9rem;
  text-align: center;
}

/* Animaciones definidas */
@keyframes fadeInLogo {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInFooter {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
