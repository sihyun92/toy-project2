import styled from "styled-components";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmout } from "./totalAmout";
import { useRecoilState } from "recoil";
import { todayAtom } from "../../state/today";

export function CalendarView() {
  const [monthlyCharge, setMonthlyCharge] = useState([]);
  const [today, setToday] = useRecoilState(todayAtom);
  const navMonth = today.getMonth();
  const navYear = today.getFullYear();

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRes = await getCalendarConsume({
          year: navYear,
          month: navMonth + 1,
          userId: "team1",
        });
        const result = fetchRes.data;
        setMonthlyCharge(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [navYear, navMonth]);
  
  return (
    <CalendarContainer>
      <Calendar
        value={today}
        calendarType={'US'}
        onChange={(value: any) => setToday(value)}
        onActiveStartDateChange={({ activeStartDate }: any) => setToday(activeStartDate)}
        showNeighboringMonth={false}
        tileContent={({ date, view }: { date: Date; view: string }) => 
          view === 'month' && Object.keys(monthlyCharge).map(a => a === date.getDate().toString() ?
            <div key={a}>
              {totalAmout(monthlyCharge[Number(a)])[0]!==0? <p className="amout-text">{totalAmout(monthlyCharge[Number(a)])[0].toLocaleString()}</p> : null}
              {totalAmout(monthlyCharge[Number(a)])[1]!==0? <p className="amout-text posi">{'+'+totalAmout(monthlyCharge[Number(a)])[1].toLocaleString()}</p> : null}
            </div>
            : null
        )}
        />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  .react-calendar {
    padding: 30px 20px 40px 20px;
    border: 0;
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    color: #222;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .amout-text {
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    opacity: .5;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 4.5rem;
    gap: 6px;
    .posi {
      color: #6f48eb;
      opacity: 1;
    }
  }
  .react-calendar__month-view__days__day--weekend {
    color: #6f48eb;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${(props) => props.theme.hoverColor};
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    .amout-text {
      color: white;
    }
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
`;
