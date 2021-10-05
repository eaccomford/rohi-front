import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
  } from "@heroicons/react/solid";
function PaymentHistory() {
    
      
    return (
        <div>
            <div data-aos="zoom-in-up">
            <h1 className="py-3 mb-3 text-2xl font-bold border-b-2">Payment History</h1>
            
            <div className="w-full pr-2">
              <div
                className="block p-2 my-3 rounded-lg shadow-lg"
              >
                  <select className="w-full p-2 ml-2 text-gray-500 focus:outline-none">
                    <option>Select Payment Type</option>
                    <option>Tithe</option>
                    <option>Mission</option>
                    <option>Needy Fund</option>
                  </select>
              </div>
                <div className="transition-all ease-in-out transform duration-600">
                  <div className="flex justify-between p-3 mb-1 text-gray-600 bg-gray-200 rounded-lg ">
                    <div className="text-xl font-bold">Total Payment</div>
                    <div className="text-xl font-bold">GHC1600</div>
                  </div>
                  <div className="flex justify-between p-3 mb-1 text-gray-600 bg-gray-100 rounded-lg ">
                    <CheckCircleIcon className="h-6" />
                    <div>02/04/2021</div>
                    <div>400</div>
                  </div>
                  <div className="flex justify-between p-3 mb-1 text-gray-600 bg-gray-100 rounded-lg ">
                    <CheckCircleIcon className="h-6" />
                    <div>02/04/2021</div>
                    <div>400</div>
                  </div>
                  <div className="flex justify-between p-3 text-gray-600 bg-gray-100 rounded-lg">
                    <CheckCircleIcon className="h-6" />
                    <div>02/04/2021</div>
                    <div>400</div>
                  </div>
                </div>
                <div>
                <div className="flex inline-flex p-2 mt-5 text-white bg-green-400 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-lg active:scale-90">
                  <ChevronDoubleRightIcon className="h-6" />
                  <span>Load More...</span>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default PaymentHistory
