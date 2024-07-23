'use client'

import { useEffect, useState } from 'react'
import LineChart from '../charts/LineChart'
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import PolarAreaChart from '../charts/PolarAreaChart';

export default function ActorMultipleResult(props: any) {


    const actors = props.data;
    console.log("actors" , actors)
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalRent, setTotalRent] = useState(0);

    useEffect(() => {
        if (actors) {
            let total = 0
            let totalPrice = 0
            let totalRent = 0

            actors.map((actor: any) => {
                total += actor?.properties?.length

                actor?.properties?.map((property: any) => {
                    totalPrice += property?.price
                    totalRent += property?.rent
                })
            })

            setTotalProperties(total)
            setTotalPrice(totalPrice)
            setTotalRent(totalRent)
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
                        <PieChart title={"Total Value"}></PieChart>
                    </div>
                    <div className='content-center '>
                        <LineChart title={"Last Seen Online"}></LineChart>
                    </div>
                </div>

                <h1 className='text-center font-bold text-4xl pt-24'>Here are the people</h1>
                <p className='text-center text-sm pt-2'>Click on each actor to drill down into details</p>
                <div className="grid grid-cols-4 justify-center gap-6 pt-8">
                    {actors.map((actor: any) => (
                        <a key={actor.id} href={actor.href} className="group cursor-pointer">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={actor.image}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="text-center mt-4 font-bold text-md text-gray-700">{actor.name}</h3>
                            <p className="text-center mt-1 capitalize text-sm text-gray-900">{actor.type}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
