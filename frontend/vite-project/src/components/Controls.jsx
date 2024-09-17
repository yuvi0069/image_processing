import React, { useContext } from 'react';
import axios from 'axios';
import { ImageContext } from '../context/ImageContext';

const Controls = () => {
  const { fileName, brightness, setBrightness, contrast, setContrast, setImageData } = useContext(ImageContext);

  const handleBrightnessChange = async (event) => {
    const value = event.target.value;
    setBrightness(value);
    await processImage(value, contrast);
  };

  const handleContrastChange = async (event) => {
    const value = event.target.value;
    setContrast(value);
    await processImage(brightness, value);
  };

  const processImage = async (brightness, contrast) => {
    try {
      const response = await axios.post('http://localhost:5000/process', {
        fileName,
        brightness,
        contrast,
      }, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageData(imageUrl);
    } catch (error) {
      console.error('Error processing image', error);
    }
  };

  return (
    <div>
      <label>Brightness: {brightness}</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={brightness}
        onChange={handleBrightnessChange}
      />
      <label>Contrast: {contrast}</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={contrast}
        onChange={handleContrastChange}
      />
    </div>
  );
};

export default Controls;
