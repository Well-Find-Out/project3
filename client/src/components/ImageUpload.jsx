import { useRef, useState } from "react";
// import { UPLOAD_PICTURE } from "../utils/mutations";
import { FaFileUpload } from "react-icons/fa";

function ImageUpload({ tripId }) {
  const [imageUrl, setImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const form = useRef(null);
  const name = useRef(null);
  const description = useRef(null);
  const image = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(form.current);

    const response = await fetch(`/upload?tripId=${tripId}`, {
      method: "POST",
      body: data,
    });
    const answer = await response.json();
    setImageUrl(answer.imageString);
    setShow(false);
  };
  const refreshPage = () => {
    window.location.reload(true);
  };
  return (
    <>
      {/* Button to open the modal */}
      <button
        type="button"
        className="btn btn-info btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#uploadImage"
      >
        <FaFileUpload />
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="uploadImage"
        aria-labelledby="uploadImageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className="modal-title fs-5 label-text"
                id="uploadImageModalLabel"
              >
                Upload Images
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                ref={form}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label className="form-label label-text">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={name}
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Description</label>
                  <textarea
                    className="form-control"
                    ref={description}
                    name="description"
                    id="description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label label-text">Upload Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    ref={image}
                    name="image"
                    id="image"
                    required
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
                    Upload
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

export default ImageUpload;
