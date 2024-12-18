import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n"; // Asegúrate de que la ruta sea correcta

const app = createApp(App);

app.use(router); // Usa el router
app.use(i18n); // Usa i18n en la aplicación

app.mount("#app");
