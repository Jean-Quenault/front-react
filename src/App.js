import React, { useState, useEffect } from 'react';

// 
const serverUrl = process.env.REACT_APP_SERVER_URL;

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

  // Add the user's informations to the database, by a POST request to the back

  const handleSubmit = () => {
    fetch(`${serverUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip: ip,
        navigateurs: browser,
        os: os,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Succès:', data);
      alert("Vos informations ont été ajoutées avec succès !");
    })
    .catch((error) => {
      console.error('Erreur:', error);
      alert("Une erreur est survenue lors de l'envoi de vos informations.");
    });
  };

  // Show all informations from the database, by a GET request to the back

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${serverUrl}/`)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, []);
  

  return (
    <div>
      <h1>Informations sur votre ordinateur</h1>
      <p>Adresse IP : {ip}</p>
      <p>Système d'exploitation : {os}</p>
      <p>Navigateur : {browser}</p>
      <button onClick={handleSubmit}>Envoyer mes informations</button>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            IP: {user.ip}, Navigateur: {user.navigateurs}, OS: {user.os}
          </li>
      ))}
    </ul>
    </div>
  );
}

export default App;
