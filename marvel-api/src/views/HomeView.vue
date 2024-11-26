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
          <i class="fa fa-film"></i> Ver Episodios
        </router-link>
        <router-link to="/creators" class="link creators-link">
          <i class="fa fa-users"></i> Ver Creadores
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
.home {
  font-family: "Arial", sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #0d1117, #1e272e);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-top: 50px;
  color: white;
}

.hero-section h1 {
  font-size: 36px;
  margin: 20px 0;
}

.hero-section p {
  font-size: 18px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 20px auto;
}

.hero-section .button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.link {
  font-size: 18px;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.episodes-link {
  background-color: #007bff;
  color: white;
}

.episodes-link:hover {
  background-color: #0056b3;
}

.creators-link {
  background-color: #42b983;
  color: white;
}

.creators-link:hover {
  background-color: #358d62;
}

.marvel-logo {
  width: 150px;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out;
}

/* Feature Section */
.feature-section {
  text-align: center;
  margin: 50px 0;
  color: white;
}

.feature-section h2 {
  font-size: 28px;
  margin-bottom: 30px;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background-color: #1e272e;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.card i {
  font-size: 36px;
  margin-bottom: 10px;
  color: #ffdd57;
}

.card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
  line-height: 1.5;
}

/* Footer */
footer {
  background-color: #1e272e;
  color: white;
  padding: 30px 20px;
  text-align: center;
  font-size: 14px;
  position: relative;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
}

.footer-left,
.footer-center,
.footer-right {
  max-width: 300px;
  flex: 1;
}

.footer-left h3,
.footer-center h3,
.footer-right h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ffdd57;
}

.footer-left p,
.footer-right p {
  font-size: 14px;
  line-height: 1.5;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-link {
  color: white;
  font-size: 18px;
  text-decoration: none;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-link:hover {
  color: #ffdd57;
  transform: scale(1.2);
}

.footer-right p {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.footer-bottom {
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 10px;
  font-size: 12px;
  color: #999;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
