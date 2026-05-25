import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface DonutChartProps {
  series: number[];
  labels: string[];
  colors: string[];
}

const TaskDonutChart: React.FC<DonutChartProps> = ({ series, labels, colors }) => {
  // معرفين الـ State بنوع boolean صريح للـ TypeScript
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // نحدث الحالة أول ما الكومبوننت يفتح
    updateDarkMode();

    // الـ Observer السري عشان يراقب الـ Dark Mode أول ما يتغير
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // الـ Options هنا واخدة نوع ApexOptions صريح
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
        // الألوان بتتغير بناءً على حالة الـ Dark Mode
        colors: [isDarkMode ? "#ffffff" : "#333333"],
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
      // الفواصل بين ألوان الدائرة
      colors: [isDarkMode ? "#161619" : "#ffffff"],
      width: 2,
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
        // الـ Key السحري عشان يجبر الـ ApexCharts تعيد بناء نفسها أول ما تقلبي الـ Mode
        key={isDarkMode ? "dark-chart" : "light-chart"} 
        options={options}
        series={series}
        type="donut"
        width={300}
      />
    </div>
  );
};

export default TaskDonutChart;