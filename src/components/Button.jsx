import React from "react";
import { StyledButton } from "./styles/StyledButton";

const Button = ({ name, callback, isDisabled, classes }) => (
  <StyledButton
    className={`${classes} disabled:text-gray-400`}
    onClick={callback}
    disabled={isDisabled}
  >
    {name}
  </StyledButton>
);

export default Button;
