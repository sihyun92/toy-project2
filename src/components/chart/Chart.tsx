import ApexCharts from "react-apexcharts";
import styled from "styled-components";

function Chart() {
  return (
    <ChartContainer>
      <ApexCharts
        series={[0, 10, 20, 30, 40]}
        type="donut"
        options={{
          labels: ["a", "b", "c", "d", "e"],
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val + "₩";
            },
          },
          title: {
            text: "title",
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    show: true,
                    formatter: (val) => {
                      return val;
                    },
                  },
                },
              },
            },
          },
        }}
      />
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
  &:last-child {
    background: goldenrod;
  }
`;

export default Chart;
