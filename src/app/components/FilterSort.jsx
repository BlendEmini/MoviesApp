import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import SelectLanguageBtn from "./SelectLanguageBtn";
const FilterSort = ({ onFilter, onSort }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({ director: "", year: "" });
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilter({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="flex w-full flex-col justify-center items-center md:flex-row gap-4 mb-4 bg-slate-800 p-4 rounded-lg shadow-lg">
      <input
        type="text"
        name="director"
        placeholder={t("filterByDirector")}
        value={filters.director}
        onChange={handleFilterChange}
        className="border border-gray-300 p-2 rounded text-white bg-slate-700 placeholder-gray-400"
      />
      <input
        type="text"
        name="year"
        placeholder={t("filterByYear")}
        value={filters.year}
        onChange={handleFilterChange}
        className="border border-gray-300 p-2 rounded text-white bg-slate-700 placeholder-gray-400"
      />
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="border border-gray-300 p-2 rounded text-white bg-slate-700"
      >
        <option value="">{t("sortByTitle")}</option>
        <option value="releaseDate">{t("sortByReleaseDate")}</option>
      </select>
      <SelectLanguageBtn />
    </div>
  );
};

export default FilterSort;
