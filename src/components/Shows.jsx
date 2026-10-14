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
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch shows");
        return res.json();
      })
      .then((data) => {
        setShows(data.slice(0, 40));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  let result = shows.filter((show) => {
    return (
      show.name.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "all" || (show.genres && show.genres.includes(genre)))
    );
  });

  if (sort === "rating-high") {
    result.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
  }
  if (sort === "rating-low") {
    result.sort((a, b) => (a.rating?.average || 0) - (b.rating?.average || 0));
  }
  if (sort === "name-asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading shows...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div className="container">
      <h1>Browse TV Shows</h1>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <Filters genre={genre} setGenre={setGenre} sort={sort} setSort={setSort} />
      </div>

      <h3>Total Shows: {result.length}</h3>

      <ShowList shows={result} />
    </div>
  );
}

export default Shows;
