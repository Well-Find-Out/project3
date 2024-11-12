import { useGlobalContext } from "../utils/GlobalState";
import Map from "../components/Map/";
import { QUERY_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SET_TRIPS } from "../utils/actions";
import "./Home.css";
import { Link } from "react-router-dom";
// import TripDetailsHome from "./TripDetailsHome.jsx";
// import ImageDisplay from "../components/ImageDisplay.jsx";

const Home = () => {
  const [state, dispatch] = useGlobalContext();
  const { data, loading, error } = useQuery(QUERY_TRIPS);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // console.log('Data:', data);
  const trips = data?.trips || [];

  // console.log('Here is the trip data:', trips);

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_TRIPS, payload: data.trips });
    }
  }, [data, dispatch]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    // console.error("Error fetching trips:", error);
    return <h3>Error: {error.message}</h3>;
  }
  const publicTrips = (state.trips || []).filter((trip) => trip.isPublic);
  const filteredTrips = selectedDestination
    ? publicTrips.filter((trip) => trip.destination === selectedDestination)
    : publicTrips;
  // console.log("Public trips after filter:", publicTrips);
  const destinations = [
    ...new Set(publicTrips.map((trip) => trip.destination)),
  ];
  const resetFilter = () => {
    setSelectedDestination(null);
  };
  return (
    <div className="home-container">
      <div className="header-section">
        <h1 className="website-title">WRLD TRAVELLERS</h1>
        <span className="subtitle">A PLACE TO KEEP YOUR MEMORIES.</span>
        <br />
      </div>

      <div className="map-section">
        <h2 className="map-title">
          Discover unforgettable travel experiences from around the world.
        </h2>
        <Map locations={destinations} onMarkerClick={setSelectedDestination} />
        {/* <button className="reset-button" onClick={resetFilter}>
          View All Trips
        </button> */}
      </div>

      <div className="trips-container">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <Link
              to={`/trips/${trip._id}`}
              key={trip._id}
              className="trip-link"
            >
              <div key={trip._id} className="trip-card">
                <h2 className="trip-title">
                  <a href={`/${trip._id}`}>{trip.name}</a>
                </h2>
                <p>
                  <strong>Destination:</strong> {trip.destination}
                </p>
                <p>
                  <strong>Date:</strong> {trip.createdAt}
                </p>
                <p className="trip-details">{trip.text.slice(0, 100)}...</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No public trips available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
