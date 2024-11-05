import { useQuery } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries.js";

import TripCard from "./TripCard.jsx";

function Profile() {
  const { loading, error, data } = useQuery(QUERY_USER_TRIPS);
  const trips = data?.trips || [];

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  return (
    <>
      {!loading && !error && (
        <div className="container">
          <div class="row">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
