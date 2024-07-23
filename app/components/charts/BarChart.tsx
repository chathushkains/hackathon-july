"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});


const options: any = {
    plugins: {
        legend: false
    },
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            display: false,
            grid: {
                display: false
            }
        }
    }
}

const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [
        {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                '#4b0082',
                '#5D3FD3',
                '#d9d2e9'
            ],
            hoverOffset: 4
        },
    ],
};
const BarChart = (props: any) => {
    return (
        <div style={{ width: '', height: '' }}>
            <h1 className='py-4 text-lg font-semibold'>{props.title}</h1>
            <p className='text-sm'>Hover over the graph to see values</p>
            <p className='pb-4 text-sm font-thin'>{props.description}</p>
            <Bar data={data} options={options} />
        </div>
    );
};
export default BarChart;