import UpdateTrip from "./UpdateTrip";
import DeleteTrip from "./DeleteTrip";
import UploadPicture from "./UploadPicture";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function TripRow({ trip }) {
  return (
    <tr>
      <td>{trip.name}</td>
      <td>{trip.destination}</td>
      <td>{trip.isPublic ? <FaEye /> : <FaEyeSlash />}</td>
      <td>{trip.createdAt}</td>
      <td>
        <UpdateTrip trip={trip} />
      </td>
      <td>
        <DeleteTrip trip={trip} />
      </td>
      <td>
        <UploadPicture trip={trip} />
      </td>
    </tr>
  );
}

export default TripRow;
