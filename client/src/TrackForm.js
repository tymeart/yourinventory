import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const TrackForm = ({ items, setItems }) => {
  const [inputs, setInputs] = useState({
    brand: '',
    category: 'Toilet Paper',
    startDate: '',
    endDate: '',
    price: 0,
    quantityNumber: 0,
    quantityUnit: 'unit',
    reminder: false,
    reminderLength: 1,
  });

  const handleInputChange = (event) => {
    event.persist();

    setInputs(inputs => {
      if (event.target.type === "checkbox") {
        return { ...inputs, [event.target.name]: event.target.checked };
      }

      return { ...inputs, [event.target.name]: event.target.value };
    });
  }

  const saveItem = async (event) => {
    event.preventDefault();
    
    const response = await axios.post('/api/items', inputs);
    // restructure category to match items from GET request
    const newItem = {
      ...response.data,
      category: {name: inputs.category, id: response.data.category}
    }
    setItems([...items, newItem]);

    // reset form
    setInputs({
      brand: '',
      category: 'Toilet Paper',
      startDate: '',
      endDate: '',
      price: 0,
      quantityNumber: 0,
      quantityUnit: 'unit',
      reminder: false,
      reminderLength: 1,
    });
  }

  return (
    <React.Fragment>
      <Form onSubmit={saveItem}>
        <h3>Add an item to your list</h3>
        <InputGroup>
          <label htmlFor="brand">Brand</label>
          <input type="text" name="brand" value={inputs.brand} onChange={handleInputChange} />
        </InputGroup>

        <InputGroup>
          <label htmlFor="category">Category</label>
          <select name="category" onChange={handleInputChange} >
            <option value="Toilet Paper">Toilet Paper</option>
            <option value="Toothbrush">Toothbrush</option>
            <option value="Hand Soap">Hand Soap</option>
          </select>
          <input type="button" value="Create New Category" />
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
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            name="price" 
            min="0" 
            max="1000" 
            step="0.01"
            value={inputs.price} 
            onChange={handleInputChange} 
          />
          <label htmlFor="quantityNumber">Quantity</label>
          <input 
            type="number" 
            name="quantityNumber" 
            min="0"
            max="1000"
            step="0.01"
            value={inputs.quantityNumber}
            onChange={handleInputChange}
          />
          <select name="quantityUnit" onChange={handleInputChange} >
            <option value="unit">unit</option>
            <option value="oz">ounce</option>
            <option value="floz">fluid ounce</option>
            <option value="roll">roll</option>
          </select>
        </InputGroup>

        <InputGroup>
          <input type="checkbox" name="reminder" checked={inputs.reminder} onChange={handleInputChange} />
          <label htmlFor="reminder">Set a reminder to replace every</label>
          <select name="reminderLength" onChange={handleInputChange} >
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
          </select>
        </InputGroup>

        <Button>Save</Button>
      </Form>
    </React.Fragment>
  );
};

export default TrackForm;