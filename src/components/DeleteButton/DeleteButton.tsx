import React from 'react';
import { ActionButton } from '../ActionButton';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <ActionButton onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5h16M8.5 5V3.5a1 1 0 011-1h1a1 1 0 011 1V5m0 0h-6v12a1 1 0 001 1h4a1 1 0 001-1V5zm-4 3v6m2-6v6m2-6v6"
          stroke="#9E9E9E"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ActionButton>
  );
};
