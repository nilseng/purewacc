import React from "react";
import ChartComponent from "react-chartjs-2";

interface IProps {
  chartType?: ChartTypes;
  data: any;
}

export enum ChartTypes {
  Line = "line",
  Bar = "bar",
  Doughnut = "doughnut",
}

const AnalysisChart = ({ chartType, data }: IProps) => {
  return <ChartComponent data={data} type={chartType || ChartTypes.Line} />;
};

export default AnalysisChart;
