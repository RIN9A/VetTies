"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);



// Те же слоты, что и в предыдущем примере
const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Cуббота", "Воскресенье"];
const mockSlots = weekdays.flatMap((day, index) =>
  ["09:00", "12:00", "15:00", "18:00"].map((time) => {
    const doctorLoad = Math.random();
    const timePreference =
      time === "09:00" ? 1 : time === "12:00" ? 0.8 : time === "15:00" ? 0.6 : 0.3;
    const dayPreference = day === "Среда" ? 1 : day === "Четверг" || day === "Вторник" ? 0.8 : 0.5;
    const loadScore = 1 - doctorLoad;
    const priority = parseFloat(((timePreference + dayPreference + loadScore) / 3).toFixed(2));

    return {
      date: `2025-06-${index + 1}`,
      time,
      weekday: day,
      doctorLoad,
      priority,
    };
  })
);

export default function FuzzyChart() {
  const chartData = useMemo(() => {
    const labels = mockSlots.map((slot) => `${slot.date} ${slot.time}`);
    const data = mockSlots.map((slot) => slot.priority);

    return {
      labels,
      datasets: [
        {
          label: "Приоритет слота (Fuzzy)",
          data,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.4)",
          pointBorderColor: "#007BFF",
          tension: 0.2,
        },
      ],
    };
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: "Приоритет (0–1)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Слот времени",
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">График приоритетов (Fuzzy Logic)</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
