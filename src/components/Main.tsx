import styled from "styled-components";
import Button from "./common/Button";
import CalendarSection from "./common/CalendarSection";

function Main() {
  return (
    <MainContainer>
      <Button black="true">버튼</Button>
      <CalendarSection></CalendarSection>
    </MainContainer>
  );
}

const MainContainer = styled.div``;

export default Main;
