import React from 'react';
import { ImageProvider } from './context/ImageContext';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';
import Controls from './components/Controls';
import ImageCropper from './components/ImageCropper'; // Import the ImageCropper component
import RotationComponent from './components/RotationComponent';

const App = () => {
  return (
    <ImageProvider>
      <div className="App">
        <h1>Image Processing App</h1>
        <ImageUpload />
        <Controls />
        <ImageCropper /> {/* Add ImageCropper component here */}
        <ImagePreview />
        <RotationComponent/>
      </div>
    </ImageProvider>
  );
};

export default App;
