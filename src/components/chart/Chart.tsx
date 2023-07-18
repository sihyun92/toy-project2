import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import MonthlyChart from "./MonthlyChart";

interface IExpense {
  _id: string;
  totalAmount: number;
}

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
      <MonthlyChart id={id} totalAmount={totalAmount} />
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
  background: #fff;
  border-radius: 14px;
`;

const DummyBox = styled.div`
  width: 200px;
  height: 200px;
  background: blueviolet;
`;

export default Chart;
