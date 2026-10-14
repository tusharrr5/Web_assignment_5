import ShowCard from "./ShowCard";

function ShowList({ shows }) {
  if (shows.length === 0) {
    return <h2>No Shows Found</h2>;
  }

  return (
    <div className="products">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}

export default ShowList;
