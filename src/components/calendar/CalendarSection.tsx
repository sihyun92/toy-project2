import styled from "styled-components";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Button from "../common/Button";
import { CalendarView } from "./CalendarView";
import { WeeklyView } from "./WeeklyView";


function CalendarSection() {
  const [toggleBtn, setToggleBtn] = useState(true);

  return (
    <>
      <h2>지출 내역</h2>
      <Button onClick={() => setToggleBtn(true)}>월별</Button>
      <Button onClick={() => setToggleBtn(false)}>주간별</Button>
      <Container>
        {toggleBtn === true ? ( <CalendarView /> ) : ( <WeeklyView /> )}
      </Container>
    </>
  );
}


const Container = styled.div`
width : 30rem;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
border-radius: 8px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
background-color: white;
`
export default CalendarSection;
