import { useEffect, useState } from "react";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import ApexCharts from "react-apexcharts";

interface IExpense {
  _id: string;
  totalAmount: number;
}

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
        const result = await getPeriodConsume("monthly", "team1");
        setAmount(result.data.map((item: IExpense) => item.totalAmount));
        console.log(result.data[0]);
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
