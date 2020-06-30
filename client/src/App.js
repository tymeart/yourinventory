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

const Main = styled.main`
  width: 70vw;
`;

function App() {
  const [trackedItems, setTrackedItems] = useState([
    {
      name: 'Toothbrush',
      startDate: '05/14/20',
      reminder: true,
      reminderTime: '3months',
      price: 5,
      id: 1
    },
    {
      name: 'Toilet paper',
      startDate: '05/28/20',
      reminder: false,
      reminderTime: null,
      price: 1.25,
      id: 2
    },
    {
      name: 'Sunscreen',
      startDate: '05/02/20',
      reminder: false,
      reminderTime: null,
      price: 15,
      id: 3
    }
  ]);

  return (
    <Wrapper>
      <Header>
        <h1>Your Inventory</h1>
        <h2>Keep track of stuff you need to replace eventually.</h2>
      </Header>
      <Main>
        <TrackForm />
        <TrackedList />
      </Main>
    </Wrapper>
  );
}

export default App;
