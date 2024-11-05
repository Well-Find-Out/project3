import { useQuery } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries.js";
// import { QUERY_RECENT_TRIPS } from "../utils/queries.js";

function RecentTrips() {
  const { loading, error, data } = useQuery(QUERY_USER_TRIPS);
  //   const { loading, error, data } = useQuery(QUERY_RECENT_TRIPS);
  const trips = data?.trips || [];

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }
  //   if (!trips.length) {
  //     return <h3>No recent trips yet</h3>;
  //   }
  console.log(trips);
  return (
    <>
      <h5 className="mx-3">Recent Trips</h5>
      {!loading && !error && (
        <ul className="list-group list-group-flush">
          {trips.map((trip) => (
            <li className="list-group-item" key={trip._id}>
              {trip.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default RecentTrips;
