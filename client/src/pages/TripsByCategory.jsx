import React from "react";
import { QUERY_TRIPS_BY_CATEGORY } from "../utils/queries.js";

function TripsByCategory() {
  const { category } = useParams();
  console.log("category", category);
  // const { loading, error, data } = useQuery(QUERY_TRIPS_BY_CATEGORY, {
  //   variables: { category },
  // });
  // const trips = data?.tripsByCategory;
  // console.log("trips by category", trips);

  // if (loading) {
  //   return <h3>Loading...</h3>;
  // }
  // if (error) {
  //   return <h3>Error...</h3>;
  // }

  return (
    <section>
      <h5 className="mt-5 mx-3">CATEGORIES</h5>
      {/* {!loading && !error && (
        <div className="container">
          <Link className="navbar-brand mb-3" to="/profile">
            ← Go to Profile
          </Link>
          <div className="row">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} userId={trip.user._id} />
            ))}
          </div>
        </div>
      )} */}
    </section>
  );
}

export default TripsByCategory;
