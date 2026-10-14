import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ShowList from "./ShowList";

function Shows() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((res) => res.json())
      .then((data) => {
        setShows(data.slice(0, 40));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load shows. Please try again.");
        setLoading(false);
      });
  }, []);

  let result = shows.filter((show) => {
    return (
      show.name
        .toLowerCase()
        .includes(search.toLowerCase())
      &&
      (genre === "all" || (show.genres && show.genres.includes(genre)))
    );
  });

  if (sort === "rating-high") {
    result.sort((a, b) => {
      let rA = a.rating && a.rating.average ? a.rating.average : 0;
      let rB = b.rating && b.rating.average ? b.rating.average : 0;
      return rB - rA;
    });
  }

  if (sort === "rating-low") {
    result.sort((a, b) => {
      let rA = a.rating && a.rating.average ? a.rating.average : 0;
      let rB = b.rating && b.rating.average ? b.rating.average : 0;
      return rA - rB;
    });
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container">
      <h1>TV Shows Explorer</h1>

      <div className="filters">
        <SearchBar search={search} setSearch={setSearch} />

        <Filters
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <h3>Total Shows: {result.length}</h3>

      <ShowList shows={result} />
    </div>
  );
}

export default Shows;
