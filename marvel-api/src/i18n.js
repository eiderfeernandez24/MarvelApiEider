import { createI18n } from "vue-i18n";

// Definir todas las traducciones en este archivo
const messages = {
  es: {
    hero: {
      title: "Explora el Universo Marvel",
      description:
        "Descubre a tus creadores favoritos, los episodios más emocionantes, y más detalles sobre el vasto multiverso de Marvel.",
    },
    buttons: {
      comics: "Ver Comics",
      characters: "Ver Personajes",
      series: "Ver Series",
    },
    feature: {
      title: "¿Qué puedes explorar?",
      episodes: {
        title: "Episodios",
        description:
          "Sumérgete en el catálogo completo de episodios de tus series y películas favoritas de Marvel.",
      },
      creators: {
        title: "Creadores",
        description:
          "Aprende más sobre los genios detrás de las historias y personajes icónicos.",
      },
      heroes: {
        title: "Héroes",
        description:
          "Explora a los héroes que han definido el universo Marvel, desde Iron Man hasta Spider-Man.",
      },
    },
    footer: {
      aboutUs: "Sobre Nosotros",
      aboutDescription:
        "Esta página está dedicada a todos los fans del universo Marvel, con el objetivo de explorar los creadores y episodios que dieron vida a los héroes más icónicos.",
      socialMedia: "Redes Sociales",
      contact: "Contacto",
      contactEmail: "contacto@marvelfans.com",
      contactAddress: "Universo Marvel, Multiverso",
      copyright:
        "© 2024 Creado por Eider Fernández Crespo. Todos los derechos reservados.",
    },
    episodes: {
      listTitle: "LISTA DE CÓMICS",
      loadingComics: "Cargando cómics...",
      loadMore: "Cargar más cómics",
      backToHome: "Volver al Inicio",
    },
    comicDetails: {
      descriptionTitle: "Descripción:",
      noDescription: "No hay descripción disponible.",
      creatorsTitle: "Creadores:",
      backToList: "Volver a la lista",
    },
    comicCard: {
      viewDetails: "Ver detalles",
    },
    characterList: {
      title: "LISTA DE PERSONAJES",
      searchPlaceholder: "Buscar personaje",
      loading: "Cargando personajes...",
      loadMore: "Cargar más personajes",
      backToHome: "Volver al Inicio",
    },
    characterDetails: {
      noDescription: "No hay descripción disponible.",
      comics: "Comics",
      backToList: "Volver a la lista",
    },
    characterCard: {
      viewDetails: "Ver detalles",
    },
    seriesList: {
      title: "LISTA DE SERIES",
      loading: "Cargando series...",
      loadMore: "Cargar más series",
      backToHome: "Volver al Inicio",
    },
    serieDetails: {
      creators: "Creadores",
      backToList: "Volver a la lista",
      loading: "Cargando detalles de la serie...",
    },
    seriesCard: {
      comicsAvailable: "Comics disponibles: {count}",
      viewDetails: "Ver detalles",
    },
  },
  en: {
    hero: {
      title: "Explore the Marvel Universe",
      description:
        "Discover your favorite creators, the most exciting episodes, and more details about the vast Marvel multiverse.",
    },
    buttons: {
      comics: "View Comics",
      characters: "View Characters",
      series: "View Series",
    },
    feature: {
      title: "What can you explore?",
      episodes: {
        title: "Episodes",
        description:
          "Dive into the complete catalog of episodes from your favorite Marvel series and movies.",
      },
      creators: {
        title: "Creators",
        description:
          "Learn more about the geniuses behind iconic stories and characters.",
      },
      heroes: {
        title: "Heroes",
        description:
          "Explore the heroes who have defined the Marvel Universe, from Iron Man to Spider-Man.",
      },
    },
    footer: {
      aboutUs: "About Us",
      aboutDescription:
        "This page is dedicated to all fans of the Marvel Universe, with the goal of exploring the creators and episodes that brought the most iconic heroes to life.",
      socialMedia: "Social Media",
      contact: "Contact",
      contactEmail: "contact@marvelfans.com",
      contactAddress: "Marvel Universe, Multiverse",
      copyright:
        "© 2024 Created by Eider Fernández Crespo. All rights reserved.",
    },
    episodes: {
      listTitle: "COMIC LIST",
      loadingComics: "Loading comics...",
      loadMore: "Load more comics",
      backToHome: "Back to Home",
    },
    comicDetails: {
      descriptionTitle: "Description:",
      noDescription: "No description available.",
      creatorsTitle: "Creators:",
      backToList: "Back to the list",
    },
    comicCard: {
      viewDetails: "View details",
    },
    characterList: {
      title: "CHARACTER LIST",
      searchPlaceholder: "Search for character",
      loading: "Loading characters...",
      loadMore: "Load more characters",
      backToHome: "Back to Home",
    },
    characterDetails: {
      noDescription: "No description available.",
      comics: "Comics",
      backToList: "Back to the list",
    },
    characterCard: {
      viewDetails: "View details",
    },
    seriesList: {
      title: "SERIES LIST",
      loading: "Loading series...",
      loadMore: "Load more series",
      backToHome: "Back to Home",
    },
    serieDetails: {
      creators: "Creators",
      backToList: "Back to list",
      loading: "Loading series details...",
    },
    seriesCard: {
      comicsAvailable: "Comics available: {count}",
      viewDetails: "View details",
    },
  },
};

// Crear la instancia de i18n
const i18n = createI18n({
  locale: "es", // Idioma predeterminado
  fallbackLocale: "en", // Idioma de respaldo en caso de no encontrar una traducción
  messages, // Pasar las traducciones definidas directamente
});

export default i18n;
