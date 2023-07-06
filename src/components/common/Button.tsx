import styled, { css } from "styled-components";

interface IButtonProps {
  [rest: string]: any;
}

function Button({ ...rest }: IButtonProps) {
  return <StyledButton {...rest} />;
}

const StyledButton = styled.button<{ black?: boolean; }>`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background: #707070;
  color: #fff;
  width: 200px;
  height: 40px;
  font-size: 20px;
  ${(rest) =>
    rest.black &&
    css`
      background: black;
      color: $white;
    `}
`;

export default Button;
