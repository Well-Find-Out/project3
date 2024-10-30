import { useGlobalContext } from "../utils/GlobalState";
import { QUERY_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { SET_TRIPS } from "../utils/actions";

const Home = () => {

    
    const [state, dispatch] = useGlobalContext();
    const {data, loading} = useQuery(QUERY_TRIPS);
    
    
    const trips = data?.trips || []
    console.log(trips);

    useEffect(() => {
        dispatch({type: SET_TRIPS, payload: trips})
    }, [data, dispatch])

    if (loading) {
        return <h3>Loading...</h3>
    }
    const publicTrips = trips
          .filter(trip => trip.public)
          .map(trip => ({
              ...trip,
              preview: trip.details.split(" ").slice(0, 50).join(" ") 
          }));
  return (
    <div className="container">
     <h1>WRLD TRAVELLERS</h1>
     {publicTrips.map(trip => (
                <div key={trip._id} className="trip-card">
                    <h2>{trip.name}</h2>
                    <p><strong>Destination:</strong> {trip.destination}</p>
                    <p><strong>Date:</strong> {trip.date}</p>
                    <p><strong>Author:</strong> {trip.userId.firstName}{trip.userId.lastName} </p>
                    <p>{trip.preview}...</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
