import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/ImageContext';

const ImageUpload = () => {
  const { setFileName, setImageData } = useContext(ImageContext); // Use setImageData from context for preview
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Generate a preview URL for the image
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    setImageData(imageUrl); // Update imageData for preview component

    // Create form data to upload the image to the server
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFileName(data.fileName);  // Store the file name in context for processing
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/png, image/jpeg" />
      {previewUrl && (
        <div>
          <h4>Image Preview (Before Processing):</h4>
          <img src={previewUrl} alt="Image Preview" style={{ maxWidth: '300px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
