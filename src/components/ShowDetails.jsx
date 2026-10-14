import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.tvmaze.com/shows/${id}`).then((res) => {
        if (!res.ok) throw new Error("Show not found");
        return res.json();
      }),
      fetch(`https://api.tvmaze.com/shows/${id}/cast`).then((res) => res.json())
    ])
      .then(([showData, castData]) => {
        setShow(showData);
        setCast(castData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading show details...</h2>;
  if (error || !show) return <h2 style={{ textAlign: "center", color: "red" }}>{error || "Show not found"}</h2>;

  const poster = show.image?.original || show.image?.medium || "https://placehold.co/210x295?text=No+Poster";
  const summary = show.summary ? show.summary.replace(/<[^>]+>/g, "") : "No summary available.";

  return (
    <div className="container">
      <Link to="/shows" className="back-btn">← Back to Shows</Link>

      <div className="detail-card">
        <div className="detail-left">
          <img src={poster} alt={show.name} />
        </div>

        <div className="detail-right">
          <h1>{show.name}</h1>
          <p><strong>Genres:</strong> {show.genres?.join(", ") || "N/A"}</p>
          <p><strong>Language:</strong> {show.language || "N/A"}</p>
          <p><strong>Premiered:</strong> {show.premiered || "N/A"}</p>
          <p><strong>Rating:</strong> ⭐ {show.rating?.average || "N/A"}</p>

          <div className="summary-box">
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        </div>
      </div>

      <div className="cast-box">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((item, index) => (
            <div key={item.person?.id || index} className="cast-card">
              <img
                src={item.person?.image?.medium || "https://placehold.co/150x200?text=No+Photo"}
                alt={item.person?.name}
              />
              <h4>{item.person?.name}</h4>
              <p>as {item.character?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
