'use client'

import { useEffect, useState } from 'react'

export default function NoResult() {
    const [firstLoad, setFirstLoad] = useState(false)

    useEffect(() => {
        setFirstLoad(true)
    }, [])

    return (
        <>
            {firstLoad ? "" :
                <main className="grid min-h-full place-items-center bg-white px-6">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Sorry we couldn't make your wish come true</h1>
                        <p className="mt-4 text-base leading-7 text-gray-600">Please make another (a little more practical) wish.</p>
                    </div>
                </main>
            }
        </>
    )
}
