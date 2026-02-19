import React from "react"
import { ActionButton } from "../ActionButton"

export const DeleteButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <ActionButton onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.22266" y="0.808594" width="24" height="2" rx="1" transform="rotate(45 2.22266 0.808594)" fill="#9E9E9E" />
        <rect x="0.808594" y="17.7773" width="24" height="2" rx="1" transform="rotate(-45 0.808594 17.7773)" fill="#9E9E9E" />
      </svg>
    </ActionButton>
  )
}
