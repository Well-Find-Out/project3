import { useQuery } from "@apollo/client";
import { QUERY_PICTURES } from "../utils/queries.js";
import { Carousel } from "react-responsive-carousel";

function ImageDisplay({ tripId }) {
  const { loading, error, data } = useQuery(QUERY_PICTURES, {
    variables: { tripId },
  });

  const pictures = data?.picturesTrip.pictures;
  console.log("pictures", pictures);

  return (
    <>
      {!loading && !error && (
        <Carousel
          autoPlay="true"
          showArrows="true"
          responsive="responsive"
          infiniteLoop="true"
        >
          {pictures.map((item) => (
            <div>
              <img src={`data:image/png;base64, ${item.imageString}`} />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
}
export default ImageDisplay;
