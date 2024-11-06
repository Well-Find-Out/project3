import { useQuery } from "@apollo/client";
import { QUERY_TRIPS_BY_CATEGORY } from "../utils/queries.js";

function Category() {
  const { loading, error, data } = useQuery(QUERY_TRIPS_BY_CATEGORY);
  const trips = data?.tripsByCategory || [];
  console.log("Trips by Category", trips);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  return (
    <>
      <h5 className="mx-3">Trips By Category</h5>
      {!loading && !error && (
        <ul className="list-group list-group-flush">
          {/* {trips.map((trip) => (
            <li className="list-group-item" key={trip._id}>
              <a href={`/trips/${trip.category}`}>{trip.category}</a>
            </li>
          ))} */}
        </ul>
      )}
    </>
  );
}

export default Category;
