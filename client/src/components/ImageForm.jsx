import { useRef, useState } from "react";

function ImageForm({tripId}) {
    const [imageUrl, setImageUrl] = useState("")
    const form = useRef(null)
    const name = useRef(null)
    const description = useRef(null)
    const image = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMITTING FORM");
        const data = new FormData(form.current);

        for(var pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        const response = await fetch(`/upload?tripId=${tripId}`, {method: "POST", body: data});
        const answer = await response.json();
          console.log(answer)
          setImageUrl(answer.imageString)
    }
    return (
        <div>
            <form ref={form} onSubmit={handleSubmit}>
                <label>Choose Image
                <input type="file" ref={image} name="image" id="image" /></label><br></br>
                <label>Name your image:
                <input type="text" ref={name} name="name" id="name" /></label><br></br>
                <label>Add your description
                <input type="text" ref={description} name="description" id="description" /></label>
                <button>SEND</button>
            </form>
            <img src={`data:image/png;base64, ${imageUrl}`} alt="" />
        </div>
    )
}

export default ImageForm;