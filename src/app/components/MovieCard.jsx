import Image from "next/image";
import React from "react";
import Background from "../assets/Star_wars.webp";
import { useLanguage } from "../LanguageContext";
const MovieCard = ({
  title,
  episodeID,
  director,
  formattedReleaseDate,
  producers,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative sm:max-w-96 rounded-3xl border border-gray-600">
      <Image
        className="absolute rounded-3xl w-full h-full object-cover opacity-50"
        src={Background}
        alt="background"
      />
      <div className="box-border relative h-full bg-gray-800/50 text-white shadow-md rounded-3xl p-4">
        <h2 className="text-lg font-bold mb-2 shadow-lg">
          {t("title")}: {title}
        </h2>
        <p className="mb-2">
          {t("episodeId")}: {episodeID}
        </p>
        <p className="mb-2">
          {t("director")}: {director}
        </p>
        <p className="mb-2">
          {t("releaseDate")}: {formattedReleaseDate}
        </p>
        <p>
          {t("producers")}: {producers.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
