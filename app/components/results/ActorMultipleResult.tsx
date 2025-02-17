'use client'

import { useEffect, useState } from 'react'
import LineChart from '../charts/LineChart'
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import PolarAreaChart from '../charts/PolarAreaChart';

export default function ActorMultipleResult(props: any) {
    const actors = props.data;
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalRent, setTotalRent] = useState(0);

    const [pieData, setPieData] = useState<any>({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    })

    const [lineData, setLineData] = useState<any>({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    })

    useEffect(() => {
        if (actors) {
            let total = 0
            let totalPrice = 0
            let totalRent = 0

            let stateNames: any = []
            let stateValues: any = []
            let stateRentValues: any = []
            let stateBondValues: any = []

            actors.map((actor: any) => {
                total += actor?.properties?.length

                actor?.properties?.map((property: any) => {
                    totalPrice += property?.price
                    totalRent += property?.rent
                    stateNames.push(property?.state)
                    stateValues.push(property?.price)
                    stateRentValues.push(property?.rent)
                    stateBondValues.push(property?.bond)
                })
            })

            setTotalProperties(total)
            setTotalPrice(totalPrice)
            setTotalRent(totalRent)
            setPieData(
                {
                    labels: stateNames,
                    datasets: [
                        {
                            data: stateValues,
                            backgroundColor: [
                                '#4b0082',
                                '#5D3FD3',
                                '#d9d2e9'
                            ],
                        }
                    ],

                }
            )

            setLineData(
                {
                    labels: stateNames,
                    datasets: [
                        {
                            label: 'Price',
                            data: stateValues,
                            borderColor: '#4b0082',
                            backgroundColor: '#4b0082',
                            tension: 0.1,
                        },
                        {
                            label: 'Rent',
                            data: stateRentValues,
                            borderColor: '#5D3FD3',
                            backgroundColor: '#5D3FD3',
                            tension: 0.1,
                        },
                        {
                            label: 'Bond',
                            data: stateBondValues,
                            borderColor: '#d9d2e9',
                            backgroundColor: '#d9d2e9',
                            tension: 0.1,
                        }
                    ],

                }
            )
        }
    }, [actors])


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                <div className='flex flex-row text-center gap-6 py-8'>
                    <div className='content-center basis-1/3'>
                        <h1 className='pt-4 text-lg font-semibold'>Total Properties</h1>
                        <p className='text-sm'>Hover over the graph to see values</p>
                        <div>
                            <p className='text-8xl font-bold py-8'>{totalProperties}</p>
                        </div>
                    </div>


                    <div className='content-center basis-1/3'>
                        <h1 className='pt-4 text-lg font-semibold'>Total Rent</h1>
                        <p className='text-sm'>Hover over the graph to see values</p>
                        <div>
                            <p className='text-8xl font-bold py-8'>${totalRent}</p>
                        </div>
                    </div>

                    <div className='content-center basis-1/3'>
                        <h1 className='pt-4 text-lg font-semibold'>Total Value</h1>
                        <p className='text-sm'>Hover over the graph to see values</p>
                        <div>
                            <p className='text-8xl font-bold py-8'>${totalPrice}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 text-center'>
                    <div className='flex flex-row justify-center items-center basis-1/3'>
                        <PieChart title={"Total Value By State"} data={pieData}></PieChart>
                    </div>
                    <div className='content-center '>
                        <LineChart title={"Value Based on Type"} data={lineData}></LineChart>
                    </div>
                </div>

                <h1 className='text-center font-bold text-4xl pt-44'>Here are the people</h1>
                <p className='text-center text-sm pt-2'>Click on each actor to drill down into details</p>
                <div className="grid grid-cols-4 justify-center gap-6 pt-8">
                    {actors.map((actor: any) => (
                        <a key={actor.id} href={actor.href} className="group cursor-pointer">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={actor.image}
                                    className="h-64 w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="text-center mt-4 font-bold text-md text-gray-700">{actor.name}</h3>
                            <p className="text-center mt-1 capitalize text-sm text-gray-900">{actor.type}</p>
                        </a>
                    ))}
                </div>
            </div>

            <h1 className='text-center font-bold text-4xl pt-24'>Here are all the results</h1>
            <p className='text-center text-sm pt-2 pb-12'>Click on each actor to drill down into details</p>
            <div className='flex justify-center '>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Member Since
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date of Birth
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {actors.map((actor: any, i: any) => {
                                return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className='h-12 w-12 rounded-full' src={actor.image}></img>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {actor.name}
                                    </th>
                                    <td className="px-6 py-4 capitalize">
                                        {actor.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {actor.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {actor.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {actor.createdAt}
                                    </td>
                                    <td className="px-6 py-4">
                                        {actor.dob}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
