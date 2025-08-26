import React from 'react'
import { GiArrowsShield } from "react-icons/gi";

function RateLimit() {
  return (
    <div className='max-w-4xl mx-auto bg-[#021003] text-white p-6 gap-3 rounded border-gray-200 flex justify-start items-center my-8'>

        <div>
            <i className='font-black text-6xl text-green-400'>
                <GiArrowsShield/>
            </i>
        </div>

        <div>
            <h2 className='text-2xl font-semibold text-blue-400' >Rate Limit Reached</h2>
            <p>You've made too many request in a short period. please wait a momment.</p>
            <p className='text-sm text-gray-300' >Try again in few seconds for best experience.</p>
        </div>

    </div>
  )
}

export default RateLimit