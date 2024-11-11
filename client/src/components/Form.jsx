import React from "react";
import imageToBase64 from "image-to-base64/browser";

imageToBase64("") // Path to the image
  .then((response) => {
    console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
  })
  .catch((error) => {
    console.log(error); // Logs an error if there was one
  });
function imageUpload() {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const base64String = await imageToBase64(URL.createObjectURL(file));
      uploadImage(base64String);
    }
  };
}

const uploadImage = async (base64String) => {
  try {
    await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64String }),
    });
    console.log("Image uploaded successfully");
  } catch (error) {
    console.error("Error uploading image", error);
  }
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);
  };

  render() {
    return (
      <div>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
      </div>
    );
  }
}

export default Form;
