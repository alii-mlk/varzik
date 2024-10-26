import React from 'react'



function Edit() {
    return (
        <div className='flex flex-col justify-center items-center '>
            <div className='flex flex-col  absolute top-20 right-18'>
                <div className='flex justify-center items-center mb-6 text-3xl text-gray-800 font-bold vazir'>
                    <h1>هدف خود را انتخاب کنید</h1>
                </div>


                <div className='flex  flex-col mb-6 justify-center items-center'>
                    <div >
                        <button className='hover:bg-pink-700 w-44 h-11 border  border-x-4 rounded-full  mb-4'>کاهش وزن و تناسب اندام</button>

                    </div>

                    <div>
                        <button className='hover:bg-pink-700   w-44 h-11 border  border-x-4 rounded-full mb-3'>عضله‌سازی و قدرت</button>

                    </div>

                    <div>
                        <button className='hover:bg-pink-700 w-44 h-11 border  border-x-4 rounded-full mb-3'>فیتنس فانکشنال</button>

                    </div>

                    <div>
                        <button className='hover:bg-pink-700  w-44 h-11 border  border-x-4 rounded-full mb-3'>بهبود عملکرد ورزشی</button>

                    </div>

                    <div className='mb-6 mt-4 text-3xl text-gray-800 font-bold vazir'>
                        <h1>سطح ورزشی خود را انتخاب کنید؟</h1>
                    </div>

                    <div className='flex  flex-col mb-6 justify-center items-center'>

                        <button className='hover:bg-pink-700   w-44 h-11 border   focus:ring-violet-300  border-x-4 rounded-full  mb-3'>مبتدی</button>
                        <button className='hover:bg-pink-700    w-44 h-11 border    focus:ring-violet-300   border-x-4 rounded-full  mb-3'>متوسط</button>
                        <button className='hover:bg-pink-700   w-44 h-11 border    focus:ring-violet-300   border-x-4 rounded-full  '>حرفه ای</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Edit
