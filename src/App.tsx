import React, { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { AddButton, Timer } from './components';
import styled from 'styled-components';

const uuidv4 = (): string => {
  return ([1e7] as any + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, (c: string) =>
    (parseInt(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> parseInt(c) / 4).toString(16)
  );
}

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
