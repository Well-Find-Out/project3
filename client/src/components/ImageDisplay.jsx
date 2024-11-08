import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useQuery } from "@apollo/client";
import { QUERY_PICTURES } from "../utils/queries.js";

function ImageDisplay({ tripId }) {
  // if (!trip.pictures) {
  //   return <div></div>;
  // }
  const { loading, error, data } = useQuery(QUERY_PICTURES, {
    variables: { tripId },
  });

  const pictures = data?.picturesTrip.pictures;
  console.log("pictures", pictures);

  return (
    <>
      {!loading && !error && (
        <Carousel>
          <div>
            {pictures.map((img) => (
              <img
                // width={200}
                // height={200}
                src={`data:image/png;base64, ${img.imageString}`}
                alt={img.name}
              />
            ))}

            <p className="legend">Legend 1</p>
          </div>
        </Carousel>
      )}
    </>
  );
}
export default ImageDisplay;
