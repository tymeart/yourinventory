import React from 'react';
import styled from 'styled-components';

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
    margin-right: 30px;
    min-width: 10em;
  }

  button:hover {
    cursor: pointer;
  }
`;

const TrackedList = ({ items }) => {
  const formatDate = (date) => {
    if (date) {
      return date.slice(0, 10);
    }
  }

  const listItems = items.map(item => (
    <ListItem key={item.id}>
      <div>{item.category.name}</div>
      <div>{item.brand}</div>
      <div>{formatDate(item.startDate)}</div>
      <div>{formatDate(item.endDate)}</div>

      <button>Edit</button>
      <button>Delete</button>
    </ListItem>
  ));

  return (
    <ListWrapper>
      {listItems}
    </ListWrapper>
  );
};

export default TrackedList;