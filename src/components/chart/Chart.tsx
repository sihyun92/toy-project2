import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
// import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
// import WeeklyChart from "./WeeklyChart";

interface IExpense {
  _id: string;
  totalAmount: number;
}

// interface IChartProps {
//   type: string;
// }

// interface ITextMap {
//   [key: string]: string;
// }

// Variable / Constant
// const textMap: ITextMap = {
//   monthly: "월별",
//   weekly: "주별",
//   daily: "일별",
// };

// const typeMap: ITextMap = {
//   monthly: "monthly",
//   weekly: "weekly",
//   daily: "daily",
// };

function Chart() {
  const [totalAmount, setTotalAmount] = useState<number[]>([]);
  const [id, setId] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPeriodConsume("monthly", "team1");
        setTotalAmount(result.data.map((item: IExpense) => item.totalAmount));
        setId(result.data.map((item: IExpense) => item._id));
        console.log(result.data);
        console.log(result.data.map((item: IExpense) => item.totalAmount));
      } catch (e) {
        console.error(e, "오류 발생!");
      }
    };
    fetchData();
  }, []);
  return (
    <ChartContainer>
      {/* <Tab>
        <TabButton>일별</TabButton>
        <TabButton>주별</TabButton>
        <TabButton>월별</TabButton>
      </Tab>
      <DailyChart />
      <WeeklyChart /> */}
      <MonthlyChart type="월별" id={id} totalAmount={totalAmount} />
      <DummyBox />
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 14px;
`;

const DummyBox = styled.div`
  width: 200px;
  height: 200px;
  background: blueviolet;
`;

// const Tab = styled.div``;

// const TabButton = styled.button``;

export default Chart;
