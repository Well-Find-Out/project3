import Trips from "../components/Trips";
import AddTrip from "../components/AddTrip";
import RecentTrips from "../components/RecentTrips";

function Profile() {
  return (
    <>
      <h1 className="text-center mb-4">My Trips</h1>
      <div className="row">
        <div className="col-sm-10">
          <AddTrip />
          <Trips />
        </div>
        <div className="col-sm-2">
          <RecentTrips />
        </div>
      </div>
    </>
  );
}

export default Profile;
