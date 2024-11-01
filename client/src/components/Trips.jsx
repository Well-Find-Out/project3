import { useQuery } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries.js";
import Trip from "./Trip.jsx";

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
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Public</th>
              <th>Created At</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <Trip key={trip._id} trip={trip} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Profile;
