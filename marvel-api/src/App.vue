<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(to bottom, #0d1117, #1e272e);
}

nav {
  padding: 20px;
  background: linear-gradient(to bottom, #0d1117, #1e272e);
}

.nav-link {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding: 10px;
  margin: 0 10px;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #42b983;
  color: white;
}
</style>
