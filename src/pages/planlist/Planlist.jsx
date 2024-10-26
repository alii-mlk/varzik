import React from 'react'
import { Link } from 'react-router-dom'

function Planlist() {
    return (
        <div>

            <div>

            </div>
            <div className='flex justify-center mt-[422px] '>
                <Link to="/user">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border  border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>بازگشت</button>
                </Link>

            </div>

        </div>
    )
}

export default Planlist
