import React, { useRef } from 'react'; 

function ImageUploadForm() { 
    const fileInputRef = useRef(null); 
    const handleSubmit = async (event) => { event.preventDefault(); 
    const file = fileInputRef.current.files[0]; 
    if (!file) { 
        console.error('No file selected!'); 
        return; 
    }
    const formData = new FormData(); // Use FormData for file uploads 
    formData.append('image', file); 
    try { 
        console.log(formData);
        // const response = await fetch('/your-api-endpoint', { 
        //     method: 'POST', 
        //     body: formData, 
        // }); 
        // if (response.ok) { 
        //     const data = await response.json();  
        //     console.log('Success:', data); 
        // } else { 
        //     console.error('Upload failed:', response.status); 
        // } 
    } 
    catch (error) { console.error('Error:', error); } 
    }; 
    return ( 
        <form onSubmit={handleSubmit}> 
            <div> <label htmlFor="image">Choose Image:</label> 
            <input type="file" id="image" ref={fileInputRef} /> 
            </div> 
            <button type="submit">Upload</button> 
            </form> 
        ); 
    } 
    
    export default ImageUploadForm;