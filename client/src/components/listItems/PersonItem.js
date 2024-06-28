import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON, GET_PEOPLE, UPDATE_PERSON } from '../../graphql/queries';
import CarItem from './CarItem';
import { Card } from 'antd';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import './PersonItem.css'; 

const PersonItem = ({ person }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const handleDelete = () => {
    deletePerson({ variables: { id: person.id } });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePerson({ variables: { id: person.id, firstName, lastName } });
    setEditMode(false);
  };

  return (
    <Card title={`${person.firstName} ${person.lastName}`}>
      <div className="person-content">
        {editMode ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <div>
              <label>First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div>
              <label>Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div className="buttons">
            <EditButton onClick={() => setEditMode(true)} />
            <DeleteButton onClick={handleDelete} />
            <Link to={`/people/${person.id}`}>LEARN MORE</Link>
          </div>
        )}
      </div>
      <div>
        {person.cars.map(car => (
          <CarItem key={car.id} car={car} />
        ))}
      </div>
    </Card>
  );
};

export default PersonItem;
