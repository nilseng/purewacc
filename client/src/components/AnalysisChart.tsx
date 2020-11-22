import React from "react";
import ChartComponent from "react-chartjs-2";

interface IProps {
  chartType?: ChartTypes;
  config: any;
}

export enum ChartTypes {
  Line = "line",
  Bar = "bar",
  Doughnut = "doughnut",
}

const AnalysisChart = ({ chartType, config }: IProps) => {
  return (
    <ChartComponent
      height={240}
      data={config.data}
      options={config.options}
      type={chartType || ChartTypes.Line}
    />
  );
};

export default AnalysisChart;
