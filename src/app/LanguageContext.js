import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    episodeId: "Episode ID",
    title: "Title",
    director: "Director",
    releaseDate: "Release Date",
    producers: "Producers",
    filterByDirector: "Filter by Director",
    filterByYear: "Filter by Release Year",
    sortByTitle: "Sort by Title",
    sortByReleaseDate: "Sort by Release Date",
    loading: "Loading...",
    error: "Error",
  },
  de: {
    episodeId: "Episoden-ID",
    title: "Titel",
    director: "Regisseur",
    releaseDate: "Erscheinungsdatum",
    producers: "Produzenten",
    filterByDirector: "Nach Regisseur filtern",
    filterByYear: "Nach Erscheinungsjahr filtern",
    sortByTitle: "Nach Titel sortieren",
    sortByReleaseDate: "Nach Erscheinungsdatum sortieren",
    loading: "Lade...",
    error: "Fehler",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "de" : "en";
      if (typeof window !== "undefined") {
        localStorage.setItem("language", newLang);
      }
      return newLang;
    });
  };

  const t = (key) => translations[language][key];

  return (
    <LanguageContext.Provider
      value={{
        language,
        isEn: language === "en",
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
