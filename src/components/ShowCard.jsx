import { Link } from "react-router";

function ShowCard({ show }) {
  const posterUrl = show.image?.medium || "https://placehold.co/210x295?text=No+Poster";
  const rating = show.rating?.average || "N/A";
  const genres = show.genres?.length ? show.genres.join(", ") : "N/A";

  return (
    <div className="card">
      <img src={posterUrl} alt={show.name} />

      <h3>{show.name}</h3>

      <p><strong>Genres:</strong> {genres}</p>
      <p><strong>Rating:</strong> ⭐ {rating}</p>

      <Link to={`/shows/${show.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default ShowCard;
