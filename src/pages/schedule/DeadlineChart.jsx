import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { groupByMonth, formatMonth } from '../../utils/chartUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeadlineChart = ({ deadlines }) => {
  const monthlyData = groupByMonth(deadlines);

  const data = {
    labels: Object.keys(monthlyData).map(formatMonth),
    datasets: [
      {
        label: 'Overdue',
        data: Object.values(monthlyData).map(month => month.overdue),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
      {
        label: 'Upcoming',
        data: Object.values(monthlyData).map(month => month.upcoming),
        backgroundColor: 'rgba(234, 179, 8, 0.7)',
      },
      {
        label: 'Completed',
        data: Object.values(monthlyData).map(month => month.completed),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Deadlines by Month',
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeadlineChart;