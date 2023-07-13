import { useEffect, useState } from "react";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmout } from "./totalAmout";
import { styled } from "styled-components";


export function WeeklyView() {
  const now = new Date();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  const [thisMonthData, setThisMonthData] = useState([]);
  const [navMonth, setNavMonth] = useState<number>(nowMonth+1);
  const [navYear, setNavYear] = useState<number>(nowYear);

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCalendarConsume({ year: navYear, month: navMonth, userId: 'team1' });
        setThisMonthData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navYear, navMonth]);

  const thisMonthDataKey = Object.keys(thisMonthData)
  const nowMonthFirst = new Date(navYear, navMonth-1, 1).getDay();
  console.log(nowMonthFirst)
  const nowMonthLastDate = new Date(navYear, navMonth, 0).getDate();
  const weekDevide = thisMonthDataKey.map(a => Math.ceil((Number(a) + nowMonthFirst) / 7));
  const weeks = Math.ceil((nowMonthFirst + nowMonthLastDate) / 7);

  const weekTotal = (weeknum : number) => {

    let weekIndex = [weekDevide.indexOf(weeknum), weekDevide.lastIndexOf(weeknum)]
    let weekExpenses = 0;
    let weekIncome = 0;
    console.log(weekDevide)
    for (let i=weekIndex[0]; i<=weekIndex[1]; i++) {
      let thisMonthDataIndex = Number(thisMonthDataKey[i]);
      weekExpenses += totalAmout(thisMonthData[thisMonthDataIndex])[0];
      weekIncome += totalAmout(thisMonthData[thisMonthDataIndex])[1];
    }
    return [weekExpenses, weekIncome]
  }

  const weekList = () => {
    const result = [];
    for(let i = 1; i <= weeks; i++) {
      result.push(
        <WeekList key={i}>
          <div>{i}째주</div>
          { weekTotal(i)[0]===0&&weekTotal(i)[1]===0?
            <div className="nodata">내역없음</div> :
            <div className="totalWrap">
              {weekTotal(i)[0]!==0?<div>{weekTotal(i)[0].toLocaleString()}원</div>:null}
              {weekTotal(i)[1]!==0?<div className="posi">+{weekTotal(i)[1].toLocaleString()}원</div>:null}
            </div>
          }
        </WeekList>
      );
    }
    return result;
  }

  const handleNavNext = () => {
    if (navMonth === 12) {
      setNavMonth(1);
      setNavYear(navYear+1);
    } else {
      setNavMonth(navMonth+1);
    }
  }
  const handleNavPrev = () => {
    if (navMonth === 1) {
      setNavMonth(12);
      setNavYear(navYear-1);
    } else {
      setNavMonth(navMonth-1);
    }
  }

  return (
    <>
    <Container>
      <Navigation>
        <button onClick={()=>handleNavPrev()}>‹</button>
        <div className="navTitle">{navYear}년 {navMonth}월</div>
        <button onClick={()=>handleNavNext()}>›</button>
      </Navigation>
      {weekList()}
    </Container>
    </>
  )
}

const Navigation = styled.nav`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 44px;
margin-bottom: 16px;
.navTitle {
  width: 264px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1px 6px;
  margin-top:8px;
  color: #6f48eb;
}
.navTitle:hover {
  background-color: #f8f8fa;
}
button {
  width: 44px;
  height: 36px;
  padding: 1px 6px;
  margin-top: 8px;
  font-size: 16px;
  font-family: arial;
  color: #6f48eb;
}
button:hover {
  background-color: #f8f8fa;
}
`

const Container = styled.div`
padding: 30px 30px;
width: 30rem;
display: flex;
flex-wrap: wrap;
border-radius: 8px;
font-size: 16px;
font-family: arial;
`
const WeekList = styled.div`
height: 3.8rem;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 20px;
.posi {
  color: #6f48eb;
  padding-top:8px;
}
.totalWrap {
  text-align: right;
}
.nodata {
  color: #ccc;
}
`