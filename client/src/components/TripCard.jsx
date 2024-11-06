import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
import DeleteTrip from "../components/DeleteTrip";
// import UpdateTrip from "./UpdateTrip";

function TripCard({ trip }) {
  const text = trip.text;
  const shortText = text.length > 150 ? text.substring(0, 150) + "..." : text;

  const title = trip.name;
  const shortTitle = title.length > 40 ? title.substring(0, 40) + "..." : title;

  return (
    <>
      <div className="col-md-6">
        <div className="card mb-3">
          <img
            src={trip.thumbnail}
            className="card-img-top"
            alt={trip.title}
          ></img>
          <div className="card-header d-flex justify-content-between">
            <h5 className="card-title">
              <a href={`/trips/${trip._id}`}>{shortTitle}</a>
            </h5>
            <p>{trip.isPublic ? <FaEye /> : <FaEyeSlash />}</p>
          </div>
          <div className="card-body">
            {/* <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6> */}
            <p className="card-subtitle mb-2 text-body-secondary">
              {shortText}
            </p>
          </div>
          <div className="card-footer text-body-secondary d-flex justify-content-between">
            <div className="d-flex">
              <small>Created on: {trip.createdAt}</small>
            </div>
            <div className="d-flex gap-3 justify-content-end">
              {/* <UpdateTrip trip={trip} /> */}
              <DeleteTrip trip={trip} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TripCard;
