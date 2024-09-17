import React, { useRef, useState, useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropperComponent = () => {
  const { imageData, setCroppedImage } = useContext(ImageContext);
  const cropperRef = useRef(null); // Use useRef to store the Cropper instance
  const [showCropper, setShowCropper] = useState(false);

  const handleCropToggle = () => {
    setShowCropper(prevState => !prevState);
  };

  const handleCropFinalize = () => {
    const cropper = cropperRef.current?.cropper; // Access the Cropper instance
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas(); // Use the cropper instance's method
      const croppedImg = croppedCanvas.toDataURL();
      setCroppedImage(croppedImg);
      setShowCropper(false); // Hide cropper after cropping
    }
  };

  return (
    <div>
      <button onClick={handleCropToggle} aria-label={showCropper ? 'Cancel Crop' : 'Start Crop'}>
        {showCropper ? 'Cancel Crop' : 'Crop'}
      </button>
      {showCropper && imageData && (
        <div>
          <Cropper
            src={imageData}
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9} // Adjust this ratio if needed
            guides={false}
            ref={cropperRef}
            viewMode={1} // Ensure the cropping area fits within the image
          />
          <button onClick={handleCropFinalize} aria-label="Finalize Crop">
            Finalize Crop
          </button>
        </div>
      )}
    </div>
  );
};

export default CropperComponent;
