import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getPeriodConsume } from "../../lib/api/consumeAPI";

interface IChartProps {
  userId: string;
  year: number;
  month: number;
}

function Chart() {
  const [period, setPeriod] = useState("");
  const [userId, setUserId] = useState("");
  const { data, isLoading } = useQuery(
    ["chart"],
    () => getPeriodConsume(period, userId),
    {
      refetchInterval: 10000,
    },
  );
  useEffect(() => {
    getPeriodConsume("daily", "user123");
    console.log(getPeriodConsume);
  }, []);

  return (
    <ChartContainer>
      <ApexCharts
        series={[1, 2, 3, 4, 5]}
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
`;

export default Chart;
