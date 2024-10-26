import { Link } from "react-router-dom"




function Coachprof() {

    return (
        <>
            <div>

                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5">
                    <div class="flex justify-end px-4 pt-4 ">

                    </div>

                    <div class="flex flex-col items-center pb-5 ">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/hadi-chopan.jpeg" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">عرفان عارفی</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400" >:تخصص اصلی </span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">:مدرک تحصیلی</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">: سابقه کاری </span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">:سایر تخصص در رشته های دیگر</span>
                        <div class="flex mt-4 mb-2 md:mt-6">



                            <Link to="/coachinfo">
                                <button className='hover:bg-pink-700  mt-1  w-32 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>ویرایش اطلاعات</button>
                            </Link>
                        </div>

                    </div>
                </div>

                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5">
                    <div class="flex flex-col items-center pb-5 ">

                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">آموزش ربات</h5>

                        <div class="flex mt-4 mb-2 md:mt-6">

                            <Link to="/coach-bot">
                                <button className='hover:bg-pink-700  mt-1  w-32 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>شروع آموزش</button>
                            </Link>
                        </div>

                    </div>
                </div>



                <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5">

                   

                    <div class="flex  flex-col items-center pb-5 ">
                        <h5 class="mb-1 mt-3 text-xl font-medium text-gray-900 dark:text-white">فهرست شاگردان فعال</h5>
                        <div class="flex mt-4 mb-2 md:mt-6">


                        </div>
                    </div>

                    <div className="flex  flex-col items-center">
                        <Link to="/coach-students">
                            <button className='hover:bg-pink-700  mt-3 mb-4  w-32 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>مشاهده وضعیت</button>
                        </Link>
                    </div>

                </div>





               



            </div>



        </>
    )
}

export default Coachprof