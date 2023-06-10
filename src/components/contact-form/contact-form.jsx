import React from 'react';
import PropTypes from 'prop-types';
import css from './contact-form.module.css';
import { useState } from 'react';
// import { useEffect } from 'react';
// import { useMemo } from 'react';
// import { useRef } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    resetForm();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    let sanitizedValue = value;

    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-Zа-яА-Я\s'-]/g, '');
      setName(sanitizedValue);
    } else if (name === 'number') {
      sanitizedValue = value.replace(/[^0-9\s()-+]/g, '');
      setNumber(sanitizedValue);
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactNameForm} onSubmit={handleSubmit}>
      <label className={css.contactLabel} htmlFor="contact-name">
        Name
      </label>
      <input
        id="contact-name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.contactLabel} htmlFor="contact-number">
        Number
      </label>
      <input
        id="contact-number"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={css.addContactBtn}>
        ✅
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
