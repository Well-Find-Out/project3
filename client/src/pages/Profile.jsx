import Trips from "../components/Trips";
import AddTrip from "../components/AddTrip";

function Profile() {
  return (
    <>
      <h1 className="mx-3 mb-4">My Trips</h1>
      <div className="d-flex gap-3 mb-4">
        <hr />
        <AddTrip />
      </div>
      <Trips />
    </>
  );
}

export default Profile;
