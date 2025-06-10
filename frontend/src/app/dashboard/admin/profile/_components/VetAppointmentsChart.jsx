"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { mockAppointmentsByDate, mockCancellationsByDate } from "./data/mockData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


export default function VetAppointmentsChart({
  appointmentsByDate,
  cancellationsByDate,
}) {

  appointmentsByDate = mockAppointmentsByDate;
  cancellationsByDate = mockCancellationsByDate;

  const labels = Object.keys(appointmentsByDate);

  const data = {
    labels,
    datasets: [
      {
        label: "Количество приёмов",
        data: labels.map((date) => appointmentsByDate[date] || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Количество отмен",
        data: labels.map((date) => cancellationsByDate[date] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

