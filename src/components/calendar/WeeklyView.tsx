import { useEffect, useState } from "react";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmout } from "./totalAmout";
import { styled } from "styled-components";


export function WeeklyView() {
  const [thisMonth, setThisMonth] = useState([]);

  const now = new Date();
  const nowMonth = now.getMonth();
  const nowMonthFirst = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const nowYear = now.getFullYear();

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCalendarConsume({ year: nowYear, month: nowMonth + 1, userId: 'team1' });
        setThisMonth(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [nowYear, nowMonth]);

  const thisMonthKey = Object.keys(thisMonth)
  const weekDevide = thisMonthKey.map(a => Math.ceil((Number(a) + nowMonthFirst) / 7));
  const weeks = weekDevide.slice(-1)[0];

  const weekTotal = (weeknum : number) => {

    if (thisMonth.length === 0) {
      return [0, 0];
    }

    let weekIndex = [weekDevide.indexOf(weeknum), weekDevide.lastIndexOf(weeknum)]
    let weekExpenses = 0;
    let weekIncome = 0;

    for (let i=weekIndex[0]; i<=weekIndex[1]; i++) {
      let thisMonthIndex = Number(thisMonthKey[i]);
      weekExpenses += totalAmout(thisMonth[thisMonthIndex])[0];
      weekIncome += totalAmout(thisMonth[thisMonthIndex])[1];
    }

    return [weekExpenses, weekIncome]
  }

  const weekList = () => {
    const result = [];
    for(let i = 1; i <= weeks; i++) {
      result.push(
        <WeekList key={i}>
          <div>{i}째주</div>
          <div>
            {weekTotal(i)[0]!==0?<div>{weekTotal(i)[0].toLocaleString()}원</div>:null}
            {weekTotal(i)[1]!==0?<div>{weekTotal(i)[1].toLocaleString()}원</div>:null}
          </div>
        </WeekList>
      );
    }
    return result;
  }

  return (
    <>
    <Container>
      {weekList()}
    </Container>
    </>
  )
}

const Container = styled.div`
padding: 30px 20px 40px 20px;
width: 30rem;
min-height: 32rem;
display: flex;
flex-wrap: wrap;
border-radius: 8px;
`
const WeekList = styled.div`
height: 72px;
width: 100%;
display: flex;
justify-content: space-between;
`