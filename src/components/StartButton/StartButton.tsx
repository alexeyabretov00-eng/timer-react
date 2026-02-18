import React from "react"
import { ActionButton } from "../ActionButton"
import styled from "styled-components";

export const StartButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
}> = ({ isActive, onClick }) => {
  return (<StartButtonStyled isActive={isActive} onClick={onClick}>
    <ActionButton>
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20V0L17 10L0 20Z" fill="#9E9E9E" />
      </svg>
    </ActionButton>
  </StartButtonStyled>
  )
}

const StartButtonStyled = styled.div<{ isActive: boolean; }>`
    path {
        fill: ${props => props.isActive ? '#ffffff' : '#9E9E9E'};
    }
`;
