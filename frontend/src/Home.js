import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [criteria, setCriteria] = useState({
    name: '',
    firstName: '',
    address: '',
    company: '',
    position: '',
  });

  const handleChange = (e) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value,
    });
  };

  const searchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts/search', {
        params: criteria,
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Il y a eu une erreur lors de la recherche des contacts!", error);
    }
  };

  return (
    <div className="home">
      <h1>Rechercher des Contacts</h1>
      <div className="search-form">
        <input type="text" name="name" value={criteria.name} onChange={handleChange} placeholder="Nom" />
        <input type="text" name="firstName" value={criteria.firstName} onChange={handleChange} placeholder="Prénom" />
        <input type="text" name="address" value={criteria.address} onChange={handleChange} placeholder="Adresse" />
        <input type="text" name="company" value={criteria.company} onChange={handleChange} placeholder="Entreprise" />
        <input type="text" name="position" value={criteria.position} onChange={handleChange} placeholder="Poste" />
        <button onClick={searchContacts}>Rechercher</button>
      </div>
      <div className="results">
        <h2>Résultats</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact._id}>
              {contact.name} {contact.firstName} - {contact.company} ({contact.position})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
