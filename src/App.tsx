import { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { AddButton, Timer } from './components';
import styled from 'styled-components';

export const App = () => {
  const [timers, setTimers] = useState<Array<{
    id: string
  }>>([]);

  const onAdd = () => {
    setTimers([
      ...timers,
      {
        id: crypto.randomUUID()
      }
    ])
  };

  const onDelete = (id: string) => {
    setTimers(timers.filter(t => t.id !== id));
  };

  return (<AppStyled>
      <GlobalStyles />
      {timers.map(x => <Timer key={x.id} onDelete={() => onDelete(x.id)} />)}
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
