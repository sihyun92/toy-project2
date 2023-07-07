import styled from "styled-components";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { getCallandar } from "../../lib/api/getCallandar";
import Button from "./Button";


interface IExpense {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

function CalendarSection() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [monthlyCharge, setMonthlyCharge] = useState([]);
  const [value, setValue] = useState(new Date());

  const nowMonth = value.getMonth();

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCallandar(nowMonth+1, 'team1');
        setMonthlyCharge(result);
        console.log('has been update')
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [value, nowMonth]);

  //호출값의 amout가 양수인지 음수인지 확인하고 각각 합을 return
  const totalAmout = (a:IExpense[]) => {
    let totalAmountPosi = 0;
    let totalAmountNeg = 0;
    for (let i = 0; i < a.length; i++) {
      a[i].amount > 0 ? totalAmountPosi += a[i].amount : totalAmountNeg += a[i].amount
    }
    return [totalAmountNeg, totalAmountPosi];
  }


  return (
    <>
      <h2>지출 내역</h2>
      <Button onClick={() => setToggleBtn(true)}>월별</Button>
      <Button onClick={() => setToggleBtn(false)}>주간별</Button>
      <Container>
        {toggleBtn === true ? (
          <Calendar 
          onClickMonth={(value, event) => alert( value)}
          showNeighboringMonth={false}
          value={value}
          onDrillUp={({ activeStartDate, view }) => alert(`'Drilled up to: ', ${view}`)}
          onChange={(value: any) => setValue(value)}
          tileContent	={({ date, view }: { date: Date; view: string }) => 
            view === 'month' && Object.keys(monthlyCharge).map(a => a === date.getDate().toString() ?
              <>
                {totalAmout(monthlyCharge[Number(a)])[0]!==0? <p className="amout-text">{totalAmout(monthlyCharge[Number(a)])[0].toLocaleString()}</p> : null}
                {totalAmout(monthlyCharge[Number(a)])[1]!==0? <p className="amout-text posi">{'+'+totalAmout(monthlyCharge[Number(a)])[1].toLocaleString()}</p> : null}
              </>
              : null)}
           />
        ) : (
          <div>주간리스트 ,, 캘린더 마무리 후 추가 예정</div>
        )}
      </Container>
    </>
  );
}


const Container = styled.div`
width : 30rem;
min-height: 32rem;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
border-radius: 8px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  color: rgba(0,0,0,0.5);
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
  align-items:center;
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

`
export default CalendarSection;
