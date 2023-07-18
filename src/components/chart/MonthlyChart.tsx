import ApexCharts from "react-apexcharts";

// Interface
interface MonthlyChartProps {
  id: string[];
  totalAmount: number[];
}

// Component
function MonthlyChart({ id, totalAmount }: MonthlyChartProps) {
  // Render
  return (
    <ApexCharts
      series={totalAmount}
      type="donut"
      options={{
        labels: id,
        dataLabels: {
          enabled: true,
          formatter: (val: number) => {
            return `${val.toLocaleString()}₩`;
          },
        },
        title: {
          text: "월별",
        },
      }}
    />
  );
}

export default MonthlyChart;
