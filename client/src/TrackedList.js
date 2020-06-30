import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListWrapper = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  border: 1px solid #000;
  display: flex;
  list-style: none;
  margin: 1em 0;
  width: 100%;

  div {
    margin-right: 50px;
    min-width: 10em;
  }
`;

const TrackedList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const response = await axios.get('/api/items');
      setItems(response.data);
    }
    getItems();
  }, []);
  
  const listItems = items.map(item => (
    <ListItem key={item.id}>
      <div>{item.brand}</div>
      <div>{item.startDate}</div>
    </ListItem>
  ));

  return (
    <ListWrapper>
      {listItems}
    </ListWrapper>
  );
};

export default TrackedList;