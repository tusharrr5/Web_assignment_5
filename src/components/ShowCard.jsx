import { Link } from "react-router";

const defaultPoster =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22210%22%20height%3D%22295%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-size%3D%2218%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Poster%3C%2Ftext%3E%3C%2Fsvg%3E";

function ShowCard({ show }) {
  const posterUrl = show.image?.medium || show.image?.original || defaultPoster;
  const rating = show.rating?.average ? show.rating.average : "N/A";
  const genres =
    show.genres && show.genres.length > 0 ? show.genres.join(", ") : "N/A";

  return (
    <div className="card">
      <img
        src={posterUrl}
        alt={show.name}
        onError={(e) => {
          e.target.src = defaultPoster;
        }}
      />

      <h3>{show.name}</h3>

      <p>
        <strong>Genres:</strong> {genres}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {rating}
      </p>

      <Link to={`/shows/${show.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default ShowCard;
