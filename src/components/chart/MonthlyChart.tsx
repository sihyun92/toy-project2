import { useEffect, useState } from "react";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import ApexCharts from "react-apexcharts";

// Date
const now = new Date();
const nowMonth = now.getMonth() + 1;
const monthLabel = `${nowMonth}월`;

// Component
function MonthlyChart() {
  // hooks
  const [amount, setAmount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPeriodConsume("month", "team1");
        setAmount(result.data);
        console.log(result.data);
      } catch (e) {
        console.error(e, "오류 발생!");
      }
    };
    fetchData();
  }, []);

  // Render
  return (
    <ApexCharts
      series={amount}
      type="donut"
      options={{
        labels: [monthLabel],
        dataLabels: {
          enabled: true,
          formatter: (val) => {
            return val + "₩";
          },
        },
        title: {
          text: `${nowMonth}월 차트`,
        },
      }}
    />
  );
}

export default MonthlyChart;
