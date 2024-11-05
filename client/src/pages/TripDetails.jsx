import { Link, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_TRIP } from "../utils/queries.js";
import EditTrip from "../components/EditTrip.jsx";

function TripDetails() {
  const { tripId } = useParams();
  const { loading, error, data } = useQuery(QUERY_TRIP, {
    variables: { tripId },
  });

  const trip = data?.trip;

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
          <Link className="mb-3" to="/profile">
            ← Go to Profile
          </Link>
          <div className="card-header d-flex justify-content-between">
            <h5 className="card-title">{trip.name}</h5>
            <p>{trip.isPublic ? <FaEye /> : <FaEyeSlash />}</p>
          </div>
          <div className="card mb-3">
            <img
              src={trip.thumbnail}
              className="card-img-top"
              alt={trip.title}
            ></img>

            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {trip.category}
              </h6>
              <p className="card-subtitle mb-2 text-body-secondary">
                {trip.text}
              </p>
            </div>
            <div className="card-footer text-body-secondary d-flex justify-content-between">
              <div>
                <small>Created: {trip.createdAt}</small>
              </div>
              <div className="d-flex gap-3 justify-content-end">
                <EditTrip trip={trip} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TripDetails;
