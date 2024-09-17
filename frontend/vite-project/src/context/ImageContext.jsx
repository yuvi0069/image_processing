import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const contextValue = {
    imageData,
    setImageData,
    fileName,
    setFileName,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    croppedImage, setCroppedImage,
    rotation,setRotation
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
