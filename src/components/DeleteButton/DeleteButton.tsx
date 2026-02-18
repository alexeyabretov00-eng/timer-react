import React from 'react';
import { ActionButton } from '../ActionButton';
import styled from 'styled-components';

interface DeleteButtonProps {
  isActive?: boolean;
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ isActive = true, onClick }) => {
  return (
    <DeleteButtonStyled isActive={isActive} onClick={onClick}>
      <ActionButton>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6h-1V4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v1h1v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9h1V7c0-1.1-.9-2-2-2zM7 4h10v2H7V4zm10 15H7V9h10v10zm-6-8h2v6h-2v-6z"
            fill="#9E9E9E"
          />
        </svg>
      </ActionButton>
    </DeleteButtonStyled>
  );
};

const DeleteButtonStyled = styled.div<{ isActive: boolean }>`
  path {
    fill: ${props => props.isActive ? '#ffffff' : '#9E9E9E'};
  }
`;
