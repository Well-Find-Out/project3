import { useGlobalContext } from "../utils/GlobalState";
import { QUERY_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { SET_USERS } from "../utils/actions";

const Home = () => {

    
    const [state, dispatch] = useGlobalContext();
    const {data, loading} = useQuery(QUERY_USERS);
    
    
    const users = data?.users || []
    console.log(users);

    useEffect(() => {
        dispatch({type: SET_USERS, payload: users})
    }, [data])

    if (loading) {
        return <h3>Loading...</h3>
    }
    const publicTrips = users.flatMap(user => 
      user.trips
          .filter(trip => trip.public)
          .map(trip => ({
              ...trip,
              author: user.username, 
              preview: trip.description.split(" ").slice(0, 50).join(" ") 
          }))
  );
  return (
    <div className="container">
     <h1>Travel Blog</h1>
     {publicTrips.map(trip => (
                <div key={trip.id} className="trip-card">
                    <h2>{trip.title}</h2>
                    <p><strong>Destination:</strong> {trip.destination}</p>
                    <p><strong>Date:</strong> {trip.date}</p>
                    <p><strong>Author:</strong> {trip.author}</p>
                    <p>{trip.preview}...</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
