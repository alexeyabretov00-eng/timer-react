import { FC, ReactNode } from "react";
import styled from "styled-components";

export const Text: FC<{
  isActive: boolean;
  children?: ReactNode;
}> = ({ isActive, children }) => {
  return <TextStyled isActive={isActive}>{children}</TextStyled>
}

const TextStyled = styled.span<{ isActive: boolean; }>`
  font-size: 22px;
  line-height: 21px;

  color: ${props => props.isActive ? '#FFFFFF' : '#9E9E9E' };
`;
