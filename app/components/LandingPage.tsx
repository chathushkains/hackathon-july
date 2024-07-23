'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NoResult from './results/NoResult'
import ActorSingleResult from './results/ActorSingleResult'
import ActorMultipleResult from './results/ActorMultipleResult'

const navigation = [
    { name: '', href: '#' },
    { name: '', href: '#' },
    { name: '', href: '#' },
    { name: '', href: '#' },
]

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [firstSearch, setFirstSearch] = useState(false)
    const [search, setSearch] = useState("")

    const handleWish = () => {
        setFirstSearch(true)
    }

    const handleClear = () => {
        setFirstSearch(false)
    }

    const results: { type: string, data: any[] } = {
        type: "landlord",
        data: [
            {
                name: 'Jeremy Hastings',
                bio: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
                dob: 'Mar 16, 2020',
                sex: 'Male',
                phone: "0515151515",
                email: "rod@peters.com",
                createdAt: '2020-03-16',
                type: "landlord",
                image: "https://media.licdn.com/dms/image/D5603AQF0-xrTkQ20Ww/profile-displayphoto-shrink_200_200/0/1708592318824?e=2147483647&v=beta&t=5R1Z-DAzCSlcC5MlHAuKy6d6YTNC0zVgq4w1bU6mv5Q",
                forms: [
                    {
                        propertyAddress: "123, Temple St, VIC 3145",
                        propertyImages: [
                            "https://rimh2.domainstatic.com.au/aOy_2RdRAZnxU40AhLcPwMCQlWU=/660x440/filters:format(jpeg):quality(80)/2018702154_1_1_230813_113349-w2000-h1250",
                        ],
                        price: "500000",
                        rent: "500",
                        bond: "5000",
                        createdAt: '2020-03-16',
                    },
                ],
            }
        ]
    }

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://cdn.prod.website-files.com/6551b58c864d515f879b7215/655548d17f1da3241b6f665d_Logo%20Horizontal%20%20RGB.png"
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="https://www.hutly.com" className="text-sm font-semibold leading-6 text-gray-900">
                            Visit Website <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="https://www.hutly.com"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Visit Website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:pt-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Hutly Genie
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-60">
                            Please type in your wishes, one at a time.
                        </p>
                        <div className='mt-4'>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                value={search}
                                placeholder="Who are the best performing agents in my team?"
                                className="rounded-full block w-full border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <input
                                type='submit'
                                value='Make a wish!'
                                className="rounded-full bg-purple-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => handleWish()}
                            />


                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => handleClear()}>
                                Clear
                            </a>
                        </div>
                    </div>
                </div>

                {firstSearch &&

                    <div className="bg-white">
                        {results?.data?.length == 0 && <NoResult></NoResult>}

                        {
                            results?.data?.length == 1 &&
                            <div className=''>
                                <h1 className='m-auto text-3xl font-bold text-center'>Tadaa! Your wish is my command!</h1>
                                <p className='m-auto pt-2 text-lg font-thin text-center'>Scroll down to see your search results based on our data</p>
                                {results?.type == "actor" ?
                                    <ActorSingleResult data={results?.data[0]}></ActorSingleResult>
                                    :
                                    <ActorSingleResult data={results?.data[0]}></ActorSingleResult>
                                }
                            </div>
                        }

                        {
                            results?.data?.length > 1 &&
                            <>
                                <h1 className='m-auto text-3xl font-bold text-center'>Tadaa! Your wish is my command!</h1>
                                <p className='m-auto pt-2 text-lg font-thin text-center'>Scroll down to see your search results based on our data</p>
                                <div className='grid grid-cols-3 gap-8'>
                                    {results?.type == "actor" ?
                                        <ActorMultipleResult></ActorMultipleResult>
                                        :
                                        <ActorMultipleResult></ActorMultipleResult>
                                    }
                                </div>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
