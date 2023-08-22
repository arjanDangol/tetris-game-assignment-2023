import React from "react";
import { StyledButton } from "./styles/StyledButton";

const Button = ({ name, callback }) => (
  <StyledButton onClick={callback}>{name}</StyledButton>
);

export default Button;
