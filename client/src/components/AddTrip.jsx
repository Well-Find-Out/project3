import Select from "react-select";
import { FaEarthAmericas } from "react-icons/fa6";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_USER_TRIPS, QUERY_CATEGORY } from "../utils/queries";

const categories = [
  { value: "Business", label: "Business" },
  { value: "Cultural", label: "Cultural" },
  { value: "Educational", label: "Educational" },
  { value: "Leisure", label: "Leisure" },
];

function AddTrip() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [text, setText] = useState("");
  const [isPublic, setIsPublic] = useState(false); // Public - Initial state is unchecked
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [addTrip] = useMutation(ADD_TRIP, {
    variables: {
      trip: { name, category, destination, text, isPublic, thumbnail },
    },
    refetchQueries: [{ query: QUERY_USER_TRIPS }, { query: QUERY_CATEGORY }],
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

    addTrip(name, category, destination, text, isPublic, thumbnail);

    setName("");
    setCategory("");
    setDestination("");
    setText("");
    setIsPublic(false);
    setThumbnail(null);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTripModal"
      >
        <div className="d-flex align-items-center">
          <FaEarthAmericas className="icon" />
          <div>Create post</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addTripModal"
        aria-labelledby="addTripModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className="modal-title fs-5 label-text"
                id="addTripModalLabel"
              >
                Create Post
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
                  >
                    Create
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

export default AddTrip;
