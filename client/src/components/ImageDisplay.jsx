import { useParams } from "react-router-dom";

function ImageDisplay() {
  const { tripId } = useParams()
  const { loading, error, data } = useQuery(QUERY_TRIP, {
    variables: { tripId },
  });

  const trip = data?.trip
  
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
            <div className="card mb-3">
              <img
                id="image-size"
                src={trip.pictures[0].imageString}
                class="img-fluid img-thumbnail"
                alt={trip.pictures[0].description}
              />
            </div>
            
           
          </div>
        )}
      </section>
    );
  }

//   export default function ImageDisplay()
// //   return (
// //     <div>
// //       {imageUrl ? (
// //         <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
// //       ) : (
// //         <p>No image uploaded.</p>
// //       )}
// //     </div>
// //   );
}

export default ImageDisplay;


