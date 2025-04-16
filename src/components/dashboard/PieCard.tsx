"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type PieCardProps = {
  percent: number;
  statusText: string;
  color: string;
};

export default function PieCard({ percent, statusText, color }: PieCardProps) {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 120,
      width: 120,
      backgroundColor: "transparent",
    },
    title: {
      verticalAlign: "middle",
      floating: true,
      text: `<div style="font-size:14px;font-weight:600;color:#333">${percent}%</div>`,
      useHTML: true,
    },
    tooltip: { enabled: false },
    plotOptions: {
      pie: {
        dataLabels: { enabled: false },
        borderWidth: 0,
        size: "90%", 
        innerSize: "70%",
        center: ["50%", "50%"],
        states: { inactive: { enabled: false } },
      },
    },
    series: [
      {
        type: "pie",
        data: [
          { name: statusText, y: percent, color },
          { name: "Remaining", y: 100 - percent, color: "#F0F2F5" },
        ],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="pie-card">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="pie-card__info">
        <p className="pie-card__value">{percent}%</p>
        <span className="pie-card__status">{statusText}</span>
      </div>
    </div>
  );
}
