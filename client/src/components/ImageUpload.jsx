import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

function ImageUpload({ tripId }) {
  const [imageUrl, setImageUrl] = useState("");
  // const [show, setShow] = useState(false);
  const form = useRef(null);
  const name = useRef(null);
  const description = useRef(null);
  const image = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("SUBMITTING FORM");
    const data = new FormData(form.current);

    for (var pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    const response = await fetch(`/upload?tripId=${tripId}`, {
      method: "POST",
      body: data,
    });
    const answer = await response.json();
    // console.log(answer);
    setImageUrl(answer.imageString);
    // setShow;
  };

  return (
    <>
      {/* Button to open the modal */}

      <button
        type="button"
        className="btn btn-info btn-sm"
        // onClick={() => setShow(true)}
        data-bs-toggle="modal"
        data-bs-target="#uploadImage"
      >
        <FaFileUpload />
      </button>

      {/* Modal */}

      {/* {show && ( */}
      <div
        // className="modal show d-block"
        className="modal fade"
        id="uploadModal"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title fs-5 label-text">Upload Image</h5> */}
              <h3 className="modal-title fs-5 label-text" id="uploadModalLabel">
                Upload Image
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={() => setShow(false)}
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
                    // onChange={(e) => setName(e.target.value)}
                    // required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label label-text"
                  >
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    ref={description}
                    name="description"
                    id="description"
                    // required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    ref={image}
                    name="image"
                    id="image"
                    // required
                  />
                </div>
                {/* {image == "" || image == null ? "": <div><h6>Your Image Preview</h6><img width={100} height={100} src={`data:image/png;base64, ${imageUrl}`} alt="" /></div>} */}
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <div
            className="modal-backdrop fade show"
            onClick={() => setShow(false)}
          ></div> */}
      </div>
      {/* )} */}
    </>
  );
}

export default ImageUpload;
