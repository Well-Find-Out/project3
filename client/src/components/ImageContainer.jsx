import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';

const ImageContainer = () => {
  const [imageURL, setImageURL] = useState(null);

  return (
    <div>
      <ImageUpload tripId={tripId} />
      <ImageDisplay image={image} />
    </div>
  );
};

export default ImageContainer;