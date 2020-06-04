import React, { useState } from 'react';
import styled from 'styled-components';
import TrackedList from './TrackedList';
import TrackForm from './TrackForm';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3em;
    margin-bottom: 0;
  }

  h2 {
    font-size: 1.25em;
  }
`;

function App() {
  const [trackedItems, setTrackedItems] = useState([]);

  return (
    <Wrapper>
      <Header>
        <h1>Untitled Inventory</h1>
        <h2>Keep track of stuff you need to replace eventually.</h2>
      </Header>
      <main>
        <TrackForm />
        <TrackedList items={trackedItems} />
      </main>
    </Wrapper>
  );
}

export default App;
