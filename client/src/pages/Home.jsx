import { useGlobalContext } from "../utils/GlobalState";
import Map from '../components/Map/';
import { QUERY_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { SET_TRIPS } from "../utils/actions";
import './Home.css';

const Home = () => {

    const [state, dispatch] = useGlobalContext();
    const {data, loading, error} = useQuery(QUERY_TRIPS);
    
    console.log('Data:', data);
    const trips = data?.trips || []

    console.log('Here is the trip data:', trips);

    useEffect(() => {
      if (data ) {
          dispatch({ type: SET_TRIPS, payload: data.trips }); 
      }
  }, [data, dispatch]);

    if (loading) {
        return <h3>Loading...</h3>
    }
    if (error) {
        console.error('Error fetching trips:', error);
        return <h3>Error: {error.message}</h3>;
    }
    const publicTrips = (state.trips || []).filter(trip => trip.isPublic);
    const destinations = publicTrips.map(trip => trip.destination);
          
    return (
      <div className="home-container">
          <div className="header-section">
              <h1 className="website-title">WRLD TRAVELLERS</h1>
              <span className="subtitle">A PLACE TO KEEP YOUR MEMORIES.</span><br /> 
          </div>

          <div className="map-section">
              <h2 className="map-title">Discover unforgettable travel experiences from around the world.</h2>
              <Map locations={destinations} /> 
          </div>

          <div className="trips-container">
              {publicTrips.length > 0 ? ( 
                  publicTrips.map(trip => (
                      <div key={trip._id} className="trip-card">
                          <h2 className="trip-title">{trip.name}</h2>
                          <p><strong>Destination:</strong> {trip.destination}</p>
                          <p><strong>Date:</strong> {trip.createdAt}</p>
                          <p className="trip-details">{trip.details.slice(0, 100)}...</p>
                      </div>
                  ))
              ) : (
                  <p>No public trips available.</p> 
              )}
          </div>
      </div>
  );
};

export default Home;

