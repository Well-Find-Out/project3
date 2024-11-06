import Trips from "../components/Trips";
import AddTrip from "../components/AddTrip";
import RecentTrips from "../components/RecentTrips";
import Category from "../components/Category";

function Profile() {
  return (
    <>
      <h1 className="text-center mb-4">My Trips</h1>
      <div className="row">
        <div className="col-sm-3">
          <AddTrip />
          <RecentTrips />
          {/* <Category /> */}
          <div>
            <h5 className="mt-5 mx-3">CATEGORIES</h5>

            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <a href={`/trips/category`}>Business</a>
              </li>
              <li class="list-group-item">
                <a href={`/trips/category`}>Cultural</a>
              </li>
              <li class="list-group-item">
                <a href={`/trips/category`}>Educational</a>
              </li>
              <li class="list-group-item">
                <a href={`/trips/category`}>Leisure</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-9">
          <Trips />
        </div>
      </div>
    </>
  );
}

export default Profile;
