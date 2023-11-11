import React, { useState, useEffect } from 'react';

function App() {
  const [ip, setIp] = useState('');
  const [os, setOs] = useState('');
  const [browser, setBrowser] = useState('');

  useEffect(() => {
    // Get the IP address using a request to a third-party service
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'adresse IP : ', error);
      });

    // Get operating system and browser information

    setOs(navigator.platform);
    setBrowser(navigator.userAgent);
  }, []);

  return (
    <div>
      <h1>Informations sur votre ordinateur</h1>
      <p>Adresse IP : {ip}</p>
      <p>Système d'exploitation : {os}</p>
      <p>Navigateur : {browser}</p>
    </div>
  );
}

export default App;
