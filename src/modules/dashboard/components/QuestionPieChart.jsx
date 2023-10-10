import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import StreakChart from "./StreakChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Easy", "Medium", "Hard"],
  datasets: [
    {
      data: [106, 208, 74],
      backgroundColor: [
        "rgb(92, 196, 109)",
        "rgb(230, 189, 128)",
        "rgb(218, 79, 60)",
        // ],
        // borderColor: [
        //   'rgb(92, 196, 109)',
        //   'rgb(230, 189, 128)',
        //   'rgb(218, 79, 60)',
      ],
      borderWidth: 0,
    },
  ],
};

export default function QuestionPieChart() {
  return (
    <div className="pieChart">
      <Doughnut data={data} />
      {/* <StreakChart/> */}
    </div>
  );
}
