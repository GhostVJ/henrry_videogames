import React from 'react';
import { useHistory } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();

  const handleEnterClick = () => {
    history.push('/Home');
  };

  return (
    <div>
      <h1>Video Games</h1>
      <img src="ruta-de-la-imagen.jpg" alt="Imagen de fondo" />
      <button onClick={handleEnterClick}>Ingresar</button>
    </div>
  );
};

export default LandingPage;
