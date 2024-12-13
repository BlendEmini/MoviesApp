"use client";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_FILMS } from "../queries/movieQueries";
import MovieCard from "./MovieCard";
import FilterSort from "./FilterSort";
import useInfiniteScroll from "../components/useInfiniteScroll";

const MoviesList = () => {
  const { loading, error, data } = useQuery(GET_FILMS);
  const [filters, setFilters] = useState({ director: "", year: "" });
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const itemsPerPage = 2;

  useEffect(() => {
    if (data) {
      applyFiltersAndSorting();
    }
  }, [filters, sortBy, data]);

  const applyFiltersAndSorting = () => {
    let movies = Array.from(data.allFilms.films);

    if (filters.director) {
      movies = movies.filter((movie) =>
        movie.director.toLowerCase().includes(filters.director.toLowerCase())
      );
    }
    if (filters.year) {
      movies = movies.filter((movie) =>
        movie.releaseDate.startsWith(filters.year)
      );
    }

    if (sortBy === "title") {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "releaseDate") {
      movies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    setCurrentPage(1);
    setDisplayedMovies(movies.slice(0, itemsPerPage));
  };

  const loadMore = async () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (data) {
      const movies = Array.from(data.allFilms.films);
      setDisplayedMovies((prev) => [
        ...prev,
        ...movies.slice(startIndex, endIndex),
      ]);
    }

    setCurrentPage((prev) => prev + 1);
  };

  const isFetching = useInfiniteScroll(loadMore);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center">
      <FilterSort onFilter={setFilters} onSort={setSortBy} />
      <div className="grid box-border p-3 max-w-4xl  justify-center items-center grid-cols-1 md:grid-cols-2  gap-4">
        {displayedMovies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            episodeID={movie.episodeID}
            director={movie.director}
            formattedReleaseDate={new Date(
              movie.releaseDate
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            producers={movie.producers}
          />
        ))}
      </div>
      <div id="scroll-anchor"></div>
      {isFetching && <p className="text-white text-center">Loading more...</p>}
    </div>
  );
};

export default MoviesList;
