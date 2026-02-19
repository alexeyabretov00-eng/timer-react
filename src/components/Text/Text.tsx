import React from "react";
import { TextStyled } from "./Text.styled";

export const Text: React.FC<{
  isActive: boolean;
}> = ({ isActive, children }) => {
  return <TextStyled isActive={isActive}>{children}</TextStyled>
}
