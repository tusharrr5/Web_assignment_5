function Filters({ genre, setGenre, sort, setSort }) {
  return (
    <div className="filters">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="all">All Genres</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Science-Fiction">Science-Fiction</option>
        <option value="Thriller">Thriller</option>
        <option value="Crime">Crime</option>
        <option value="Romance">Romance</option>
        <option value="Horror">Horror</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="rating-high">Rating: High to Low</option>
        <option value="rating-low">Rating: Low to High</option>
      </select>
    </div>
  );
}

export default Filters;
