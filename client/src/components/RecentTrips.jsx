import { useQuery } from "@apollo/client";
import { QUERY_RECENT_TRIPS } from "../utils/queries.js";

function RecentTrips() {
  const { loading, error, data } = useQuery(QUERY_RECENT_TRIPS);
  const trips = data?.recentTrips || [];
  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }
  if (!trips.length) {
    return <h3>No recent trips</h3>;
  }

  return (
    <>
      <h5 className="label-text mx-3">RECENT POSTS</h5>
      {!loading && !error && (
        <ul className="list-group list-group-flush">
          {trips.map((trip) => (
            <li className="list-group-item" key={trip._id}>
              <img
                src={trip.thumbnail}
                class="thumbnail mx-2"
                alt={trip.title}
              />
              <a href={`/trips/${trip._id}`}>
                {trip.name.length > 22
                  ? trip.name.substring(0, 22) + "..."
                  : trip.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default RecentTrips;
