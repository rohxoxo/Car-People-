import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_PEOPLE} from '../../graphql/queries';
import './PersonForm.css';

const CarForm = () => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [personId, setPersonId] = useState('');

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });
 
  const { data } = useQuery(GET_PEOPLE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar({ variables: { year: parseInt(year), make, model, price: parseFloat(price), personId } })
      .then(() => {
        setYear('');
        setMake('');
        setModel('');
        setPrice('');
        setPersonId('');
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  };

  return (
    <form className="horizontal-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Year</label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
        />
      </div>
      <div className="form-field">
        <label>Make</label>
        <input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
        />
      </div>
      <div className="form-field">
        <label>Model</label>
        <input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
        />
      </div>
      <div className="form-field">
        <label>Price</label>
        <input 
          type="number" 
          step="0.01"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
      </div>
      <div className="form-field">
        <label>Owner</label>
        <select 
          value={personId} 
          onChange={(e) => setPersonId(e.target.value)}
        >
          <option value="">Select Owner</option>
          {data && data.people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
        </select>
      </div>
      <button className="submit-button" type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;