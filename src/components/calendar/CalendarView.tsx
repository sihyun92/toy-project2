import styled from "styled-components";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmout } from "./totalAmout";



export function CalendarView(props:any) {
  const [monthlyCharge, setMonthlyCharge] = useState([]);
  const [value, setValue] = useState(new Date(`${props.nowYear}-${props.nowMonth+1}-${new Date().getDate()}`));
  const navMonth = value.getMonth();
  const navYear = value.getFullYear();


  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCalendarConsume({
          year: navYear,
          month: navMonth + 1,
          userId: "team1",
        });
        setMonthlyCharge(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [navYear, navMonth]);
  
  //CalendarSection으로 값이 바뀔 때마다 prop 재전달
  useEffect(() => {
    const setNowYear = () => {
      props.getYearData(navYear);
    };
    const setNowMonth = () => {
      props.getMonthData(navMonth);
    };
    setNowYear();
    setNowMonth();
  }, [navYear, navMonth])
  

  return (
    <CalendarContainer>
      <Calendar
        value={value}
        calendarType={'US'}
        onActiveStartDateChange={({ action, activeStartDate }: any) => setValue(activeStartDate)}
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
    background-color: #fff;
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
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
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
    }
  }
  .react-calendar__month-view__days__day--weekend {
    color: #6f48eb;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
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
