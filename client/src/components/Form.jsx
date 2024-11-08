import React from 'react';
// import axios from 'axios'

import imageToBase64 from 'image-to-base64/browser';

// Steps for image upload to database

//import imageToBase64 package check
//take image from upload
//convert image into base64 string
//save string to database

//step for display
//retrieving image from database
// convert base64 back to string


// const imageToBase64 = require('image-to-base64');
//or
//import imageToBase64 from 'image-to-base64/browser';

imageToBase64("") // Path to the image
    .then(
        (response) => {
            console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )
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
    await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64String }),
    });
    console.log("Image uploaded successfully");
  } catch (error) {
    console.error("Error uploading image", error);
  }
};

// imageToBase64("path/to/file.jpg") // Path to the image
//     .then(
//         (response) => {
//             console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
//         }
//     )
//     .catch(
//         (error) => {
//             console.log(error); // Logs an error if there was one
//         }
//     )

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = event => {
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

    // Request made to the backend api
    // Send formData object
  //   axios.post("api/uploadfile", formData);
  };

  render() {
    return (
      <div>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
// import { useState } from 'react';

// const Form = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = {
//         method: 'POST',
//         body: formData,
//       };
//       console.log(formData)

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message);
//       } else {
//         setMessage('File upload failed');
//       }
//     } catch (error) {
//       setMessage('File upload failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Upload an Image</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Form;
