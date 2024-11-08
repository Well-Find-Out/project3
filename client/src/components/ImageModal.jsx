import Select from "react-select";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRIP } from "../utils/mutations";
import { QUERY_USER_TRIPS } from "../utils/queries";

function ImageModalUpload({ trip }) {
  const [tripId, setTripId] = useState(trip._id);
  const [imageString, setImageString] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Choose </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <Select
            name="category"
            options={categories}
            value={category}
            onChange={handleSelect}
            searchable="true"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Destination</label>
          <input
            type="text"
            className="form-control"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Trip Info</label>
          <textarea
            className="form-control"
            id="text"
            rows="15"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">
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
          <label className="form-label">Thumbnail</label>
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        {/* <div>
                  <input
                    type="file"
                    // value={""}
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    accept="png, jpg"
                  />
                </div> */}
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
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTrip;
