import Select from "react-select";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRIP } from "../utils/mutations";
import { QUERY_USER_TRIPS } from "../utils/queries";

const categories = [
  { value: "Business", label: "Business" },
  { value: "Cultural", label: "Cultural" },
  { value: "Educational", label: "Educational" },
  { value: "Leisure", label: "Leisure" },
];

function EditTrip({ trip }) {
  const [tripId, setTripId] = useState(trip._id);
  const [name, setName] = useState(trip.name);
  const [category, setCategory] = useState(trip.category);
  const [destination, setDestination] = useState(trip.destination);
  const [text, setText] = useState(trip.text);
  const [isPublic, setIsPublic] = useState(trip.isPublic);
  const [thumbnail, setThumbnail] = useState(trip.thumbnail);

  const [updateTrip] = useMutation(UPDATE_TRIP, {
    variables: {
      tripId,
      name,
      category,
      destination,
      text,
      isPublic,
      thumbnail,
    },
    // onCompleted: () => navigate('/profile'),
    refetchQueries: [{ query: QUERY_USER_TRIPS }],
  });

  const handleIsChecked = () => {
    setIsPublic(!isPublic);
  };

  const handleSelect = (category) => {
    setCategory(category.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name === "" || category === "" || destination === "" || text === "") {
      return alert("Please provide input for all fields");
    }
    updateTrip(name, category, destination, text, isPublic, thumbnail);
  };
  const refreshPage = () => {
    window.location.reload(true);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-success btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#updateTripModal"
      >
        <FaEdit />
      </button>

      <div
        className="modal fade"
        id="updateTripModal"
        aria-labelledby="updateTripModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className="modal-title fs-5 label-text"
                id="updateTripModalLabel"
              >
                Edit Trip
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label label-text">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Category</label>
                  <Select
                    name="category"
                    options={categories}
                    value={trip.category}
                    onChange={handleSelect}
                    searchable="true"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Trip Info</label>
                  <textarea
                    className="form-control"
                    id="text"
                    rows="15"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isPublic"
                      checked={isPublic}
                      onChange={handleIsChecked}
                    />
                    Public
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Thumbnail</label>
                  <input
                    type="text"
                    className="form-control"
                    id="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                    onClick={refreshPage}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTrip;
