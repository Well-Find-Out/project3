import { Link, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_TRIP } from "../utils/queries.js";

import ImageDisplay from "../components/ImageDisplay.jsx";

function TripDetailsHome() {
  const { tripId } = useParams();
  const { loading, error, data } = useQuery(QUERY_TRIP, {
    variables: { tripId },
  });
  const trip = data?.trip;
  // console.log("TripDetails", trip);
  const canEdit = data?.trip?.canEdit;

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  return (
    <section>
      {!loading && !error && (
        <div className="container">
          <Link className="navbar-brand mb-3" to="/">
            ← Go to Home
          </Link>

          <div className="mb-3">
              <ImageDisplay tripId={tripId} />
            </div>

          <div className="card-header d-flex justify-content-between">
            <h5 className="card-title label-text">{trip.name}</h5>
            <p>{trip.isPublic ? <FaEye /> : <FaEyeSlash />}</p>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-body-secondary label-text">
                {trip.category}
              </h6>
              <p className="card-subtitle mb-2 text-body-secondary">
                {trip.text}
              </p>
            </div>
            <div className="card-footer text-body-secondary d-flex justify-content-between">
              <div>
                <small className="label-text">
                  Created on: {trip.createdAt}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TripDetailsHome;
