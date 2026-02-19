import React, { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { AddButton, Timer } from './components';
import styled from 'styled-components';

const uuidv4 = (): string => crypto.randomUUID();

export const App = () => {
  const [timers, setTimers] = useState<Array<{
    id: string
  }>>([]);

  const onAdd = () => {
    setTimers([
      ...timers,
      {
        id: uuidv4()
      }
    ])
  };

  const onDeleteTimer = (id: string) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (<AppStyled>
      <GlobalStyles />
      {timers.map(x => <Timer key={x.id} id={x.id} onDelete={onDeleteTimer} />)}
      <AddButton onClick={onAdd} />
    </AppStyled>
  )
}

const AppStyled = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 45px;
  column-gap: 50px;
  flex-wrap: wrap;

  padding: 72px 212px;
`;
