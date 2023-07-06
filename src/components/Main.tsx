import styled, { css } from "styled-components";
import { theme } from "../styles/theme";
import Button from "./common/Button";

function Main() {
  return (
    <MainContainer>
      <h1>안녕하세요</h1>
      <Button red="true">버튼</Button>
    </MainContainer>
  );
}

const MainContainer = styled.div<{ coral?: boolean }>`
  background: ${theme.colors.coral};
  h1 {
    font-size: 40px;
    color: ${theme.colors.black};
    &:hover {
      color: ${theme.colors.white};
    }
  }
  ${(props) => props.coral && css``}
`;

export default Main;
