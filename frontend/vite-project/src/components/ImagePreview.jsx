import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';

const ImagePreview = () => {
  const { imageData, croppedImage, fileName,rotation } = useContext(ImageContext);

  // Determine which image to display based on whether it's cropped or not
  const previewImage = croppedImage || imageData;

  return (
    <div>
      {previewImage ? (
        <>
          <h4>Image Preview (Processed, Cropped, or Uploaded):</h4>
          <img
            src={previewImage}
            alt="Processed or Cropped Preview"
            style={{ maxWidth: '300px', marginTop: '10px' ,
              transform: `rotate(${rotation}deg)`,
            }}

          />
          
          {/* Download Button */}
          <div>
            <a
              href={previewImage}
              download={`processed-${fileName}`} // Set a meaningful name for the downloaded file
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <button
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Download Image
              </button>
            </a>
          </div>
        </>
      ) : (
        <p>No image uploaded</p>
      )}
    </div>
  );
};

export default ImagePreview;
