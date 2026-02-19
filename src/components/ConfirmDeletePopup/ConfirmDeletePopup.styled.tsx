import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Popup = styled.div`
  background: #444648;
  border-radius: 6px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 220px;
`;

export const Message = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Gotham Pro', sans-serif;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;

const BaseBtn = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Gotham Pro', sans-serif;
  cursor: pointer;
`;

export const ConfirmBtn = styled(BaseBtn)`
  background: #c0392b;
  color: #ffffff;
  &:hover { background: #e74c3c; }
`;

export const CancelBtn = styled(BaseBtn)`
  background: #9e9e9e;
  color: #ffffff;
  &:hover { background: #bdbdbd; }
`;
