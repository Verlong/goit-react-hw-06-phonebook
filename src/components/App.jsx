import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import ContactForm from './contact-form/contact-form';
import ContactList from './contact-list/contact-list';
import Filter from './filter/filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const equalName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (equalName) return alert(equalName.name + ' is already in contacts.');

    data.id = nanoid();
    setContacts(prevContacts => [data, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />
      <h3 className={css.subtitle}>Contacts</h3>

      <Filter value={filter} onChange={changeFilter} />
      {contacts.length ? (
        <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
      ) : (
        <p className={css.message}>No any contacts</p>
      )}
    </div>
  );
};

export default App;
