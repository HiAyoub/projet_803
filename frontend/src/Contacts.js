import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contacts.css';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error("Il y a eu une erreur lors de la récupération des contacts!", error);
    }
  };

  const addContact = async () => {
    try {
      await axios.post('http://localhost:3001/contacts', { name, firstName, address, company, position });
      fetchContacts();
      setName('');
      setFirstName('');
      setAddress('');
      setCompany('');
      setPosition('');
    } catch (error) {
      console.error("Il y a eu une erreur lors de l'ajout du contact!", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Il y a eu une erreur lors de la suppression du contact!", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contacts">
      <h1>Gestion des Contacts</h1>
      <div>
        <h2>Ajouter un Contact</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" />
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Entreprise" />
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Poste" />
        <button onClick={addContact}>Ajouter</button>
      </div>
      <div>
        <h2>Tous les Contacts</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact._id}>
              {contact.name} {contact.firstName} - {contact.company} ({contact.position})
              <button onClick={() => deleteContact(contact._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
