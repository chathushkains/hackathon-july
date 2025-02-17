'use client'

import { useEffect, useState } from 'react'
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';

export default function ActorSingleResult(props: any) {
    const actor = props?.data;
    useEffect(() => {
        if (actor.properties) {
            let states : any = []
            let stateValues : any = []

            actor?.properties.map((property: any) => {
                states.push(property.state)
                stateValues.push(property.price)
            })
        }
    }, [actor])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className='flex flex-row'>
                    {/* Image gallery */}
                    <div className="mx-auto w-[50%] h-64 mt-6 sm:px-6 lg:grid pt-10 ">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={actor.image}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{actor.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <form className="mt-10">
                                <div className='text-xl font-bold py-4'>Contact</div>
                                <div className='text-sm pb-4'>Reach out to {actor.name} and see how we can help them improve sales.</div>
                                <textarea id="message" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-800 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>


                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{actor.bio}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2'>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Date of Birth</h3>
                                    <div className="mt-2">
                                        {actor.dob}
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                                    <div className="mt-2">
                                        {actor.phone}
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                                    <div className="mt-2">
                                        {actor.email}
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Sex</h3>
                                    <div className="mt-2">
                                        {actor.sex}
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Member since</h3>
                                    <div className="mt-2">
                                        {actor.createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='grid grid-cols-3 text-center gap-6 py-8'>
                    <div className='content-center'>
                        <BarChart title={"Total Properties"}></BarChart>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <PieChart title={"Total Value"}></PieChart>
                    </div>
                    <div className='content-center '>
                        <LineChart title={"Last Seen Online"}></LineChart>
                    </div>
                </div> */}

                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Here are {actor?.name}`s property list</h2>
                        <p className='pt-2 pb-4'>Click on the following properties to drill down to details</p>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {actor.properties.map((property: any) => (
                                <div key={property.id} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={property.image}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-md text-gray-700">
                                                <a href={property.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {property.address}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-400">Created {property.createdAt}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">${property.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
