import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 60%;
`;

const InputGroup = styled.div`
  label, input, select {
    margin: 0.5em;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  font-size: 1em;
  height: 2.2em;
  width: 100px;

  :hover {
    cursor: pointer;
  }
`;

const TrackForm = () => {
  const [inputs, setInputs] = useState({
    name: '',
    startDate: '',
    endDate: '',
    reminder: false,
    reminderTime: null,
    price: 0
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => {
      return {
        ...inputs, 
        [event.target.name]: event.target.value
      }
    });
  }

  const addItem = (event) => {
    event.preventDefault();
    // make POST request to backend
  }

  return (
    <React.Fragment>
      <Form onSubmit={addItem}>
        <h3>Add an item to your list</h3>
        <InputGroup>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={inputs.name} onChange={handleInputChange} />
        </InputGroup>

        <InputGroup>
          <label htmlFor="startDate">Start Date</label>
          <input type="date" name="startDate" value={inputs.startDate} onChange={handleInputChange} />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="endDate">End Date</label>
          <input type="date" name="endDate" value={inputs.endDate} onChange={handleInputChange} />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="price">Price per unit</label>
          <input 
            type="number" 
            name="price" 
            min="0" 
            max="1000" 
            value={inputs.price} 
            onChange={handleInputChange} 
          />
        </InputGroup>

        <InputGroup>
          <input type="checkbox" name="reminder" value="reminder" />
          <label htmlFor="reminder">
            Set a reminder to replace every
            <select name="reminderTime">
              <option value="30days">30 days</option>
              <option value="90days">90 days</option>
              <option value="3months">3 months</option>
            </select>
          </label>
        </InputGroup>

        <Button>Save</Button>
      </Form>
    </React.Fragment>
  );
};

export default TrackForm;