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

  // Fetch initial 40 shows on mount
  useEffect(() => {
    loadShows();
  }, []);

  function loadShows() {
    setLoading(true);
    setError(null);
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch shows from TVMaze");
        }
        return res.json();
      })
      .then((data) => {
        // Tip: /shows?page=0 returns 250 shows; use .slice(0, 40)
        setShows(data.slice(0, 40));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load shows");
        setLoading(false);
      });
  }

  // Bonus: Search all shows with https://api.tvmaze.com/search/shows?q=:query
  function handleSearchSubmit(e) {
    if (e) e.preventDefault();
    if (!search.trim()) {
      loadShows();
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search.trim())}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Search failed, please try again");
        }
        return res.json();
      })
      .then((data) => {
        // Each item is { score, show }
        const searchResults = data.map((item) => item.show);
        setShows(searchResults);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error searching shows");
        setLoading(false);
      });
  }

  // Controlled input filter
  let result = shows.filter((show) => {
    const matchesSearch = show.name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || (show.genres && show.genres.includes(genre));
    return matchesSearch && matchesGenre;
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
  if (sort === "name-desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="container">
      <h1>Browse TV Shows</h1>

      <form className="controls-form" onSubmit={handleSearchSubmit}>
        <SearchBar search={search} setSearch={setSearch} />

        <button type="submit" className="search-btn">
          Search All
        </button>

        {search && (
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              setSearch("");
              loadShows();
            }}
          >
            Reset
          </button>
        )}

        <Filters
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
        />
      </form>

      <div className="shows-header">
        <h3>Total Shows: {result.length}</h3>
      </div>

      {loading && <h2>Loading shows...</h2>}

      {error && (
        <div className="error-box">
          <p>⚠️ {error}</p>
          <button onClick={loadShows} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && <ShowList shows={result} />}
    </div>
  );
}

export default Shows;
