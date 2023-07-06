import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface IButtonProps {
  [rest: string]: any;
}

function Button({ ...rest }: IButtonProps) {
  return <StyledButton {...rest} />;
}

const StyledButton = styled.button<{ black?: boolean; red?: boolean }>`
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
      background: ${theme.colors.black};
      color: ${theme.colors.white};
    `}
  ${(rest) =>
    rest.red &&
    css`
      background: #f00;
      color: ${theme.colors.white};
    `}
`;

export default Button;
