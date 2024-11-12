import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TRIPS_BY_CATEGORY } from "../utils/queries.js";
import TripCard from "../components/TripCard.jsx";
import RecentTrips from "../components/RecentTrips";
import Category from "../components/Category";

function TripsByCategory() {
  const { category } = useParams();
  const { loading, error, data } = useQuery(QUERY_TRIPS_BY_CATEGORY, {
    variables: { category },
  });
  const trips = data?.tripsByCategory;
  console.log("trips by category", trips);

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
          <Link className="navbar-brand mb-3" to="/profile">
            ← Go to Profile
          </Link>
          <div className="row">
            <h1 className="text-center label-text mb-3">{category} Trips</h1>
            <div className="d-flex p-4">
              <div className="col-sm-3">
                <RecentTrips />
                <Category />
              </div>
              <div className="col-sm-9">
                <div className="row">
                  {trips.map((trip) => (
                    <TripCard
                      key={trip._id}
                      trip={trip}
                      userId={trip.user._id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TripsByCategory;
