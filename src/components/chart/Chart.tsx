import styled from "styled-components";
import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import WeeklyChart from "./WeeklyChart";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface IExpense {
  _id: string;
  totalAmount: number;
}

const ChartTypes = ["daily", "weekly", "monthly"]; // 차트 유형 배열

function Chart() {
  const [activeChart, setActiveChart] = useState("daily"); // 현재 선택된 차트

  const handleChangeChart = (newIndex: any) => {
    setActiveChart(ChartTypes[newIndex]);
  };

  const renderChart = () => {
    switch (activeChart) {
      case "daily":
        return <DailyChart />;
      case "weekly":
        return <WeeklyChart />;
      case "monthly":
        return <MonthlyChart />;
      default:
        return null;
    }
  };

  return (
    <ChartContainer>
      <ArrowButton
        onClick={() =>
          handleChangeChart(
            (ChartTypes.indexOf(activeChart) - 1 + ChartTypes.length) %
              ChartTypes.length,
          )
        }
      >
        <FiChevronLeft />
      </ArrowButton>

      <ChartContent>{renderChart()}</ChartContent>
      <ArrowButton
        onClick={() =>
          handleChangeChart(
            (ChartTypes.indexOf(activeChart) + 1) % ChartTypes.length,
          )
        }
      >
        <FiChevronRight />
      </ArrowButton>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  width: 480px;
  height: 250px;
  padding: 30px 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 14px;
`;

const ArrowButton = styled.button`
  font-size: 2rem;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

const ChartContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default Chart;
