import { Link } from "react-router";

function ShowCard({ show }) {
  let poster = "https://placehold.co/210x295?text=No+Poster";
  if (show.image && show.image.medium) {
    poster = show.image.medium;
  }

  let rating = "N/A";
  if (show.rating && show.rating.average) {
    rating = show.rating.average;
  }

  let genres = "N/A";
  if (show.genres && show.genres.length > 0) {
    genres = show.genres.join(", ");
  }

  return (
    <div className="card">
      <img src={poster} alt={show.name} />

      <h3>{show.name}</h3>

      <p>Rating: ⭐ {rating}</p>

      <p>Genres: {genres}</p>

      <Link to={`/shows/${show.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default ShowCard;
