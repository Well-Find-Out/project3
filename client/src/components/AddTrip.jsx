import { FaEarthAmericas } from "react-icons/fa6";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_USER_TRIPS } from "../utils/queries";

function AddTrip() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [text, setText] = useState("");
  const [isPublic, setIsPublic] = useState(false); // Public - Initial state is unchecked

  const [addTrip] = useMutation(ADD_TRIP, {
    variables: { trip: { name, destination, text, isPublic } },
    refetchQueries: [{ query: QUERY_USER_TRIPS }],
  });

  const handleIsChecked = () => {
    setIsPublic(!isPublic);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name === "" || destination === "" || text === "") {
      return alert("Please provide input for all fields");
    }
    console.log(name, destination, text, isPublic);

    addTrip(name, destination, text, isPublic);

    setName("");
    setDestination("");
    setText("");
    setIsPublic(false);
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
          <div>Add Trip</div>
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
              <h3 className="modal-title fs-5" id="addTripModalLabel">
                Add Trip
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
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    Add
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
