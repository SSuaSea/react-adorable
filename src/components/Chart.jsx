import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Chart({ chartData, title }) {
    const chartProps = {
        data: {
            ...chartData,
            datasets: chartData.datasets.map(dataset => ({
                ...dataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  // Red
                    'rgba(54, 162, 235, 0.2)',  // Blue
                    'rgba(255, 206, 86, 0.2)',  // Yellow
                    'rgba(75, 192, 192, 0.2)',  // Green
                    'rgba(153, 102, 255, 0.2)', // Purple
                    'rgba(255, 159, 64, 0.2)'   // Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',  // Red
                    'rgba(54, 162, 235, 1)',  // Blue
                    'rgba(255, 206, 86, 1)',  // Yellow
                    'rgba(75, 192, 192, 1)',  // Green
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)'   // Orange
                ],
                borderWidth: 1,
            })),
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <Pie {...chartProps} />
        </div>
    );
}

export default Chart;
