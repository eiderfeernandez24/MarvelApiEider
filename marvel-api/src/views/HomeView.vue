<template>
  <div class="home">
    <h1>Bienvenido a la página de Marvel creada por Eider Fernández Crespo</h1>
    <router-link to="/episodes" class="link">Ver Episodios</router-link>
    <router-link to="/creators" class="link"
      >Ver Todos los Creadores</router-link
    >
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  text-align: center;
  background-color: #f5f5dc;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  width: 35%;
}

.link {
  font-size: 18px;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #333;
  color: white;
}

.link:hover {
  background-color: #42b983;
  color: white;
}
</style>
