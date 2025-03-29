import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GraphGenerator = ({ prompt }) => {
  // Sample data generation based on prompt keywords
  const generateChartData = () => {
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    if (prompt.toLowerCase().includes('company') || prompt.toLowerCase().includes('insight')) {
      return {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Revenue (Millions)',
              data: [5.2, 7.8, 6.9, 9.2],
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            },
            {
              label: 'Expenses (Millions)',
              data: [3.8, 4.2, 5.1, 4.9],
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Company Financial Insights'
            }
          }
        }
      };
    }
    
    if (prompt.toLowerCase().includes('growth')) {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Growth Rate %',
              data: [12, 19, 15, 24],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Growth Analysis'
            }
          }
        }
      };
    }
    
    if (prompt.toLowerCase().includes('market share')) {
      return {
        type: 'pie',
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Others'],
          datasets: [
            {
              label: 'Market Share %',
              data: [35, 25, 20, 20],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Market Share Distribution'
            }
          }
        }
      };
    }
    
    return null;
  };

  const chartConfig = generateChartData();

  if (!chartConfig) return null;

  return (
    <div className="chart-container" style={{ marginTop: '2rem', height: '400px' }}>
      {chartConfig.type === 'bar' && <Bar data={chartConfig.data} options={chartConfig.options} />}
      {chartConfig.type === 'line' && <Line data={chartConfig.data} options={chartConfig.options} />}
      {chartConfig.type === 'pie' && <Pie data={chartConfig.data} options={chartConfig.options} />}
    </div>
  );
};

export default GraphGenerator;