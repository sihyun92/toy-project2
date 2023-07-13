import styled from "styled-components";
import MonthlyChart from "./MonthlyChart";

function Chart() {
  return (
    <ChartContainer>
      <MonthlyChart />
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
  border-radius: 15px;
`;

const DummyBox = styled.div`
  width: 200px;
  height: 200px;
  background: blueviolet;
`;

export default Chart;
