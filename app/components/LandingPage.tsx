"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NoResult from "./results/NoResult";
import ActorSingleResult from "./results/ActorSingleResult";
import ActorMultipleResult from "./results/ActorMultipleResult";
import PropertySingleResult from "./results/PropertySingleRresult";
import PropertyMultipleResult from "./results/PropertyMultipleResult";
import axios from "axios";

const navigation = [
  { name: "", href: "#" },
  { name: "", href: "#" },
  { name: "", href: "#" },
  { name: "", href: "#" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleWish = async () => {

    if (!search) {
      setError(true)
      return false
    }

    setResults({});
    setFirstSearch(true);
    setLoading(true);
    setError(false)

    axios.post("api/test/speech", { question: search }).then((res) => {
      setResults(res?.data);
      setLoading(false);
    });

    // const response = {
    //     "category": "actor",
    //     "data": [
    //         {
    //             "id": "550e8400-e29b-41d4-a716-446655440009",
    //             "name": "Benjamin",
    //             "dob": "1981-02-27",
    //             "bio": null,
    //             "sex": "Male",
    //             "phone": "4364344598",
    //             "email": "benjamin.clark@example.com",
    //             "createdAt": null,
    //             "type": "actor",
    //             "image": "https://i.pravatar.cc/250",
    //             "properties": [
    //                 {
    //                     "id": 9,
    //                     "name": "Spruce Point",
    //                     "address": "606 Spruce St, NSW 1023",
    //                     "state": "NSW",
    //                     "image": "https://i.pravatar.cc/261",
    //                     "price": 800,
    //                     "rent": 350,
    //                     "bond": 500,
    //                     "createdAt": "2020-03-24"
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "550e8400-e29b-41d4-a716-446655440009",
    //             "name": "Benjamin",
    //             "dob": "1981-02-27",
    //             "bio": null,
    //             "sex": "Male",
    //             "phone": "4364344598",
    //             "email": "benjamin.clark@example.com",
    //             "createdAt": null,
    //             "type": "actor",
    //             "image": "https://i.pravatar.cc/250",
    //             "properties": [
    //                 {
    //                     "id": 9,
    //                     "name": "Spruce Point",
    //                     "address": "606 Spruce St, NSW 1023",
    //                     "state": "VIC",
    //                     "images": ["https://i.pravatar.cc/261"],
    //                     "price": 12000,
    //                     "rent": 120,
    //                     "bond": 1000,
    //                     "createdAt": "2020-03-24"
    //                 },
    //                 {
    //                     "id": 9,
    //                     "name": "Spruce Point",
    //                     "address": "606 Spruce St, NSW 1023",
    //                     "state": "NT",
    //                     "images": ["https://i.pravatar.cc/261"],
    //                     "price": 956,
    //                     "rent": 400,
    //                     "bond": 4000,
    //                     "createdAt": "2020-03-24"
    //                 }
    //             ]
    //         }
    //     ]
    // }

    // const response = {
    //     "category": "property",
    //     "data": [
    //         {
    //             "id": 9,
    //             "name": "Spruce Point",
    //             "address": "606 Spruce St, NSW 1023",
    //             "state": "VIC",
    //             "image": "https://i.pravatar.cc/261",
    //             "price": 80050,
    //             "rent": 350,
    //             "bond": 500,
    //             "createdAt": "2020-03-24",
    //             "actors": [
    //                 {
    //                     "id": "550e8400-e29b-41d4-a716-446655440009",
    //                     "name": "Benjamin",
    //                     "dob": "1981-02-27",
    //                     "bio": null,
    //                     "sex": "Male",
    //                     "phone": "4364344598",
    //                     "email": "benjamin.clark@example.com",
    //                     "createdAt": null,
    //                     "type": "actor",
    //                     "image": "https://i.pravatar.cc/250",
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 9,
    //             "name": "Spruce Point",
    //             "address": "606 Spruce St, NSW 1023",
    //             "state": "NSW",
    //             "image": "https://i.pravatar.cc/261",
    //             "price": 11000,
    //             "rent": 200,
    //             "bond": 150,
    //             "createdAt": "2020-03-24",
    //             "actors": [
    //                 {
    //                     "id": "550e8400-e29b-41d4-a716-446655440009",
    //                     "name": "Benjamin",
    //                     "dob": "1981-02-27",
    //                     "bio": null,
    //                     "sex": "Male",
    //                     "phone": "4364344598",
    //                     "email": "benjamin.clark@example.com",
    //                     "createdAt": null,
    //                     "type": "actor",
    //                     "image": "https://i.pravatar.cc/250",
    //                 }
    //             ]
    //         },
    //     ]
    // }

    // setResults(response)
  };

  const handleClear = () => {
    setFirstSearch(false);
    setResults({});
    setError(false)
  };

  return (
    <div className="bg-purple-800">
      <header className="absolute inset-x-0 top-0 z-50 bg-white">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8">
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="https://www.hutly.com"
              target="_blank"
              className="text-sm font-semibold leading-6 text-gray-900">
              Visit Website <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden">
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
                className="-m-2.5 rounded-md p-2.5 text-gray-700">
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="https://www.hutly.com"
                    target="_blank"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog> */}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-tr from-white to-gray-50 ">
        <div className="-z-1 absolute -top-12 -left-3 h-44 w-44 rounded-full bg-white bg-gradient-to-b from-white to-gray-300 opacity-20"></div>
        <div className="-z-1 absolute -top-36 -right-32 h-[500px] w-[500px] rounded-full bg-white bg-gradient-to-b from-white to-gray-300 opacity-20"></div>
        <div className="-z-1 absolute top-3 -right-50 h-64 w-64 rounded-full bg-white bg-gradient-to-b from-white to-gray-300 opacity-20"></div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:pt-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hutly Genie 🧞
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-60">
              Please type in your wishes, one at a time.
            </p>
            <div className="mt-4">
              <input
                id="price"
                name="price"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target?.value);
                }}
                placeholder="Who are the best performing agents in my team?"
                className="rounded-full block w-full border-0 py-6 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <input
                type="submit"
                value="Make a wish!"
                className="rounded-full bg-purple-800 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleWish()}
              />

              <a
                href="#"
                className="text-lg font-semibold leading-6 text-gray-900"
                onClick={() => handleClear()}>
                Clear
              </a>
            </div>
          </div>
          {error && <p className="text-center text-sm p-4 rounded-full mt-6 text-black">⚠️ Please enter your wish and click on Make a Wish!</p>}
        </div>
      </div>

      {firstSearch && (
        <div className="bg-purple-800 w-full h-full p-16">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
            <div className="bg-white p-24 rounded-lg">
              {results?.data?.length == 0 && <NoResult></NoResult>}

              {results?.data?.length == 1 && (
                <div className="">
                  <h1 className="m-auto text-3xl font-bold text-center">
                    Tadaa! Your wish is my command!
                  </h1>
                  <p className="m-auto pt-2 text-lg font-thin text-center">
                    Scroll down to see your search results based on our data
                  </p>
                  {"actor|agent|landlord|tenant".includes(results?.category.toLowerCase()) ? (
                    <ActorSingleResult
                      data={results?.data[0]}></ActorSingleResult>
                  ) : (
                    <PropertySingleResult
                      data={results?.data[0]}></PropertySingleResult>
                  )}
                </div>
              )}

              {results?.data?.length > 1 && (
                <>
                  <h1 className="m-auto text-3xl font-bold text-center">
                    Tadaa! Your wish is my command!
                  </h1>
                  <p className="m-auto pt-2 text-lg font-thin text-center">
                    Scroll down to see your search results based on our data
                  </p>
                  {"actor|agent|landlord|tenant".includes(results?.category.toLowerCase()) ? (
                    <ActorMultipleResult
                      data={results?.data}></ActorMultipleResult>
                  ) : (
                    <PropertyMultipleResult
                      data={results?.data}></PropertyMultipleResult>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
