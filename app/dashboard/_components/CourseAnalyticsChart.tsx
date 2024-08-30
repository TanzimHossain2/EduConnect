'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, LineController, BarController, Title, Tooltip, Legend);

interface CourseAnalyticsChartProps {
  courses: number;
  enrollments: number;
  revenue: number;
  reviews: number;
  averageRating: number;
}

const CourseAnalyticsChart: React.FC<CourseAnalyticsChartProps> = ({ courses, enrollments, revenue, reviews, averageRating }) => {
  const chartData = {
    labels: ['Courses', 'Enrollments', 'Revenue', 'Reviews', 'Rating'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Course Stats',
        data: [courses, enrollments, revenue, reviews, averageRating],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
      {
        type: 'line' as const,
        label: 'Growth Trend',
        data: [courses, enrollments, revenue, reviews, averageRating],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Course Analytics (Bar & Line Chart)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // @ts-ignore
  return <Bar data={chartData} options={chartOptions} />;
};

export default CourseAnalyticsChart;
