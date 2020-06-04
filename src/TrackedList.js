import React from 'react';

const TrackedList = ({ items }) => {
  const listItems = items.map(item => <li key={item.id}>{item.name}</li>);

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default TrackedList;