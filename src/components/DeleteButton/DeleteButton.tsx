import { FC } from "react"
import { ActionButton } from "../ActionButton"

export const DeleteButton: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (<ActionButton onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="4" x2="16" y2="16" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="4" x2="4" y2="16" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </ActionButton>
  )
}
