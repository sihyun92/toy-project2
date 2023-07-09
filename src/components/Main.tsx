import styled from "styled-components";
import AddConsume from "./add/AddConsume";
import CalendarSection from "./common/CalendarSection";

function Main() {
  return (
    <MainContainer>
      <AddConsume />
      <CalendarSection />
    </MainContainer>
  );
}

const MainContainer = styled.div``;

export default Main;
