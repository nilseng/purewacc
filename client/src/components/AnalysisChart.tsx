import React from "react";
import { Line } from "react-chartjs-2";

const AnalysisChart = () => {
  const data = {
    labels: ["7%", "10%", "15%"],
    datasets: [
      {
        label: "Test chart",
        borderColor: "rgba(75,192,192,1)",
        data: [300, 275, 200],
      },
    ],
  };
  return <Line data={data} />;
};

export default AnalysisChart;
