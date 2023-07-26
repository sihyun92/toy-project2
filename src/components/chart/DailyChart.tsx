import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import { IExpense } from "./Chart";
import styled, { useTheme } from "styled-components";

// Component
function DailyChart() {
  const theme = useTheme();
  const [totalAmount, setTotalAmount] = useState<number[]>([]);
  const [id, setId] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPeriodConsume("daily", "team1");
        setTotalAmount(result.data.map((item: IExpense) => item.totalAmount));
        setId(result.data.map((item: IExpense) => item._id));
      } catch (e) {
        console.error(e, "오류 발생!");
      }
    };
    fetchData();
  }, []);

  // Render
  return (
    <CustomApexCharts
      series={totalAmount}
      type="donut"
      options={{
        labels: id,
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "일별 차트",
          style: {
            color: theme.textColor,
            fontSize: "18px",
            fontWeight: "medium",
          },
        },
        theme: {
          mode: "dark",
        },
      }}
    />
  );
}

export default DailyChart;

const CustomApexCharts = styled(ApexCharts)`
  .apexcharts-legend .apexcharts-legend-series .apexcharts-legend-text {
    color: ${(props) => props.theme.textColor} !important;
  }
`;
