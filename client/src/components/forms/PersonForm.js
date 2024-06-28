import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries';
import './PersonForm.css';

const PersonForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerson({ variables: { firstName, lastName } })
      .then(() => {
        setFirstName('');
        setLastName('');
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
  };

  return (
    <form className="horizontal-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>First Name</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
      </div>
      <div className="form-field">
        <label >Last Name</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
      </div>
      <button className="submit-button" type="submit">Add Person</button>
    </form>
  );
};

export default PersonForm;