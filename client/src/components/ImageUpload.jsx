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

  // const [uploadPicture] = useMutation(UPLOAD_PICTURE, {
  //     variables: {
  //       tripId,
  //       imageString,
  //       name,
  //       description,
  //     },
  //     refetchQueries: [{ query: QUERY_USER_TRIPS }],
  //   });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SUBMITTING FORM");
    const data = new FormData(form.current);

    for (var pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    const response = await fetch(`/upload?tripId=${tripId}`, {
      method: "POST",
      body: data,
    });
    const answer = await response.json();
    console.log(answer);
    setImageUrl(answer.imageString);
    setShow(false);
  };
  return (
    <>
      {/* Button to open the modal */}
      {/* <button className="btn btn-primary" onClick={() => setShow(true)}>
        Open Upload Form
      </button> */}
      <button
        type="button"
        className="btn btn-info btn-sm"
        onClick={() => setShow(true)}
        // data-bs-toggle="modal"
        // data-bs-target="#uploadImage"
      >
        <FaFileUpload />
      </button>

      {/* Modal */}
      {show && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShow(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
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
                    <label htmlFor="description" className="form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      ref={description}
                      name="description"
                      id="description"
                      required
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
                      required
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
          {/* <div className="modal-backdrop fade show" onClick={() => setShow(false)}></div> */}
        </div>
      )}
    </>
    // <div>
    //     <form ref={form} onSubmit={handleSubmit}>
    //         <label>Choose Image
    //         <input type="file" ref={image} name="image" id="image" /></label><br></br>
    //         <label>Name your image:
    //         <input type="text" ref={name} name="name" id="name" /></label><br></br>
    //         <label>Add your description
    //         <input type="text" ref={description} name="description" id="description" /></label>
    //         <button>SEND</button>
    //     </form>
    //     {image == "" || image == null ? "": <div><h6>Your Image Preview</h6><img width={100} height={100} src={`data:image/png;base64, ${imageUrl}`} alt="" /></div>}
    // </div>
  );
}

export default ImageUpload;
