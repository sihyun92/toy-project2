import styled from "styled-components";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { CalendarView } from "./CalendarView";
import { WeeklyView } from "./WeeklyView";


function CalendarSection() {
  const [toggleBtn, setToggleBtn] = useState(true);

  return (
    <Section>
      <Header>
        <h2>지출 내역</h2>
        <div className="buttonContainer">
          <button
            onClick={() => setToggleBtn(false)}
            className={toggleBtn===false?'active':''}
          >주간별</button>
          <button 
          onClick={() => setToggleBtn(true)}
          className={toggleBtn===true?'active':''}
          >월별</button>
        </div>
      </Header>
      <Container>
        {toggleBtn === true ? 
          ( <CalendarView/> ) : 
          ( <WeeklyView /> )
        }
      </Container>
    </Section>
  );
}

const Section = styled.section`
width: 30rem;
`

const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
height: 3rem;
width: 100%;
padding: 0 10px;
h2 {
  font-weight: 700;
}
.buttonContainer {
  button {
    margin-left: 6px;
    padding: 4px 8px;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 6px;
    transition: .2s;
  }
  .active, button:hover {
    background-color: #6f48eb;
    border: 1px solid #6f48eb;
    color: white;
  }
}
`
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
border-radius: 8px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
background-color: ${(props) => props.theme.bgColor};
`
export default CalendarSection;
