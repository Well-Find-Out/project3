import Trips from "../components/Trips";
import AddTrip from "../components/AddTrip";
import RecentTrips from "../components/RecentTrips";
import Category from "../components/Category";

function Profile() {
  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-end px-4">
          <AddTrip />
        </div>
        <h1 className="text-center label-text mb-2">My Adventures</h1>
        <div className="d-flex p-4">
          <div className="col-sm-3">
            <RecentTrips />
            <Category />
          </div>
          <div className="col-sm-9">
            <Trips />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
