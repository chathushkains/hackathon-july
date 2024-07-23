"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});


const options: any = {
    plugins: {
        legend: true
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
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            //   label: 'GeeksforGeeks Line Chart',
            data: [65, 59, 80, 81, 56],
            fill: true,
            borderColor: '#4b0082',
            backgroundColor: '#d9d2e9',
            tension: 0.1,
        },
    ],
};
const LineChart = (props: any) => {
    return (
        <div style={{ width: '200', height: '150' }}>
            <h1 className='pt-4 text-lg font-semibold'>{props.title}</h1>
            <p className='text-sm'>Hover over the graph to see values</p>
            <p className='pb-4 text-sm font-thin'>{props.description}</p>
            <Line data={props?.data} options={options} />
        </div>
    );
};
export default LineChart;