import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';

const RotationComponent = () => {
  const { rotation, setRotation } = useContext(ImageContext);

  const handleRotate = (angle) => {
    setRotation(prevRotation => prevRotation + angle);
  };

  return (
    <div>
      <h4>Rotate Image:</h4>
      <button onClick={() => handleRotate(-90)} aria-label="Rotate Left">Rotate Left</button>
      <button onClick={() => handleRotate(90)} aria-label="Rotate Right">Rotate Right</button>
    </div>
  );
};

export default RotationComponent;
