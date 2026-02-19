import React from "react"
import { ActionButton } from "../ActionButton"
import { StopButtonStyled } from "./StopButton.styled";

export const StopButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
}> = ({ isActive, onClick }) => {
  return (<StopButtonStyled isActive={isActive} onClick={onClick}>
    <ActionButton>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" />
      </svg>
    </ActionButton>
  </StopButtonStyled>
  )
}
