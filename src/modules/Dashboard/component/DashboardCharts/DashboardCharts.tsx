import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface DonutChartProps {
  series: number[];
  labels: string[];
  colors: string[];
}

const TaskDonutChart: React.FC<DonutChartProps> = ({ series, labels, colors }) => {
  
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: colors,
    labels: labels, 
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#000"],
      },
      formatter: function (val: number) {
        return Math.round(val) + "%";
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    stroke: {
      colors: ["#fff"],
      width: 1,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={380}
      />
    </div>
  );
};

export default TaskDonutChart;