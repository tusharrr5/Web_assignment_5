import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch(() => {
        setError("Failed to load show details");
        setLoading(false);
      });

    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => {
        setCast(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !show) {
    return <h2>{error || "Show Not Found"}</h2>;
  }

  let cleanSummary = "";
  if (show.summary) {
    cleanSummary = show.summary.replace(/<[^>]+>/g, "");
  }

  let poster = "https://placehold.co/210x295?text=No+Poster";
  if (show.image && show.image.medium) {
    poster = show.image.medium;
  }

  return (
    <div className="container">
      <Link to="/shows" className="back-btn">
        Back to Shows
      </Link>

      <div className="detail-card">
        <div className="detail-left">
          <img src={poster} alt={show.name} />
        </div>

        <div className="detail-right">
          <h1>{show.name}</h1>
          <p>Language: {show.language}</p>
          <p>Premiered: {show.premiered}</p>
          <p>Rating: ⭐ {show.rating ? show.rating.average : "N/A"}</p>
          <p>Genres: {show.genres ? show.genres.join(", ") : "N/A"}</p>

          <div className="summary-box">
            <h3>Summary</h3>
            <p>{cleanSummary}</p>
          </div>
        </div>
      </div>

      <div className="cast-box">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((item, index) => {
            let photo = "https://placehold.co/150x200?text=No+Photo";
            if (item.person && item.person.image && item.person.image.medium) {
              photo = item.person.image.medium;
            }

            return (
              <div key={index} className="cast-card">
                <img src={photo} alt={item.person.name} />
                <h4>{item.person.name}</h4>
                <p>as {item.character.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
