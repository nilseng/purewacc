import React from "react";
import ChartComponent, { Line, Bar, Doughnut } from "react-chartjs-2";

interface IProps {
  chartType?: ChartTypes;
}

export enum ChartTypes {
  Line = "line",
  Bar = "bar",
  Doughnut = "doughnut",
}

const AnalysisChart = ({ chartType }: IProps) => {
  const data = {
    labels: ["7%", "10%", "15%"],
    datasets: [
      {
        label: "Test 1",
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.5)",
        data: [150, 125, 100],
      },
      {
        label: "Test 2",
        borderColor: "rgba(0,150,192,1)",
        backgroundColor: "rgba(0,150,192,0.5)",
        data: [300, 275, 200],
      },
    ],
  };
  return <ChartComponent data={data} type={chartType || ChartTypes.Line} />;
};

export default AnalysisChart;
