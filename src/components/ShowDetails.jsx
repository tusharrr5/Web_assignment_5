import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const defaultPoster =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22210%22%20height%3D%22295%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-size%3D%2218%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Poster%3C%2Ftext%3E%3C%2Fsvg%3E";

const defaultCastPhoto =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2334495e%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch show data
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Show not found or failed to load");
        }
        return res.json();
      })
      .then((showData) => {
        setShow(showData);

        // Fetch cast data
        return fetch(`https://api.tvmaze.com/shows/${id}/cast`);
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load cast");
        }
        return res.json();
      })
      .then((castData) => {
        setCast(castData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load show details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading show details...</h2>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="container">
        <h2>{error || "Show Not Found"}</h2>
        <Link to="/shows" className="back-btn">
          ← Back to Shows
        </Link>
      </div>
    );
  }

  // Tip: summary contains HTML like <p>; remove tags with summary.replace(/<[^>]+>/g, "")
  const cleanSummary = show.summary
    ? show.summary.replace(/<[^>]+>/g, "")
    : "No summary available for this show.";

  const poster = show.image?.original || show.image?.medium || defaultPoster;
  const rating = show.rating?.average ? show.rating.average : "N/A";
  const genres =
    show.genres && show.genres.length > 0 ? show.genres.join(", ") : "N/A";

  return (
    <div className="container">
      <Link to="/shows" className="back-btn">
        ← Back to Shows
      </Link>

      <div className="detail-card">
        <div className="detail-left">
          <img
            src={poster}
            alt={show.name}
            onError={(e) => {
              e.target.src = defaultPoster;
            }}
          />
        </div>

        <div className="detail-right">
          <h1>{show.name}</h1>
          <p>
            <strong>Genres:</strong> {genres}
          </p>
          <p>
            <strong>Language:</strong> {show.language || "N/A"}
          </p>
          <p>
            <strong>Premiere Date:</strong> {show.premiered || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {rating}
          </p>

          <div className="summary-box">
            <h3>Summary</h3>
            <p>{cleanSummary}</p>
          </div>
        </div>
      </div>

      <div className="cast-box">
        <h2>Cast</h2>
        {cast.length === 0 ? (
          <p>No cast details available for this show.</p>
        ) : (
          <div className="cast-grid">
            {cast.map((item, index) => {
              // Cast items are person.name, person.image.medium, character.name
              const actorPhoto =
                item.person.image?.medium ||
                item.person.image?.original ||
                defaultCastPhoto;

              return (
                <div key={item.person.id || index} className="cast-card">
                  <img
                    src={actorPhoto}
                    alt={item.person.name}
                    onError={(e) => {
                      e.target.src = defaultCastPhoto;
                    }}
                  />
                  <h4>{item.person.name}</h4>
                  <p>as {item.character.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowDetails;
