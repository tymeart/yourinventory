import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TrackedList from './TrackedList';
import TrackForm from './TrackForm';
import axios from 'axios';

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
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const response = await axios.get('/api/items');
      setItems(response.data);
    }
    getItems();
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Your Inventory</h1>
        <h2>Keep track of stuff you need to replace eventually.</h2>
      </Header>
      <Main>
        <TrackForm items={items} setItems={setItems} />
        <hr />
        <TrackedList items={items} />
      </Main>
    </Wrapper>
  );
}

export default App;
