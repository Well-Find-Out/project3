

function ImageDisplay({...trip}) {
  if (!trip.pictures) {
    return(<div></div>)
  }
  console.log(trip)
return (
  <img src={`data:image/png;base64, ${trip.pictures[0].imageString}`} alt="" style={{width: '200px', height: '200px'}} />)
}
export default ImageDisplay;


