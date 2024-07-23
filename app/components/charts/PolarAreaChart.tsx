"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Pie, PolarArea } from 'react-chartjs-2';

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

const PolarAreaChart = (props: any) => {
    return (
        <div style={{ width: '', height: '' }}>
            <h1 className='pt-8  text-center text-lg font-semibold'>{props.title}</h1>
            <p className='text-sm text-center'>Hover over the graph to see values</p>
            <p className='pb-4 text-sm font-thin'>{props.description}</p>
            <PolarArea data={props.data} options={options} />
        </div>
    );
};
export default PolarAreaChart;