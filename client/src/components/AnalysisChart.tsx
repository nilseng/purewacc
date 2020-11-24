import React from "react";
import ChartComponent from "react-chartjs-2";

interface IProps {
  chartType?: ChartTypes;
  config: any;
  height?: number;
}

export enum ChartTypes {
  Line = "line",
  Bar = "bar",
  Doughnut = "doughnut",
}

const AnalysisChart = ({ chartType, config, height }: IProps) => {
  return (
    <ChartComponent
      height={height || 240}
      data={config.data}
      options={config.options}
      type={chartType || ChartTypes.Line}
    />
  );
};

export default AnalysisChart;
