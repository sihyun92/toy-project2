import { useEffect, useState } from "react";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

interface IExpense {
  _id: string;
  totalAmount: number;
}

// Component
function MonthlyChart() {
  // hooks
  const [amount, setAmount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPeriodConsume("monthly", "team1");
        setAmount(result.data.map((item: IExpense) => item.totalAmount));
        console.log(result.data);
      } catch (e) {
        console.error(e, "오류 발생!");
      }
    };
    fetchData();
  }, []);

  // Render
  return null;
}

export default MonthlyChart;
