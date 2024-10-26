import { Link } from "react-router-dom"




function Liststudent(){

    return (
        <>
        <div className='flex flex-wrap justify-center items-center gap-4 '>

              <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5 w-44">
                    <div class="flex justify-end px-4 pt-4 ">

                    </div>

                    <div class="flex flex-col items-center pb-5 ">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/hadi-chopan.jpeg" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">عرفان عارفی</h5>
                     
                        <div class="flex mt-4 mb-2 md:mt-6">

                         

                            <Link to="/coachinfo">
                                <button className='hover:bg-pink-700  mt-1  w-32 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>اطلاعات شاگرد</button>
                            </Link>
                        </div>

                    </div>
                </div>
            
              <div class=" bg-[#c6d8d3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-5 w-44">
                    <div class="flex justify-end px-4 pt-4 ">

                    </div>

                    <div class="flex flex-col items-center pb-5 ">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/hadi-chopan.jpeg" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">عرفان عارفی</h5>
                     
                        <div class="flex mt-4 mb-2 md:mt-6">

                         

                            <Link to="/coachinfo">
                                <button className='hover:bg-pink-700  mt-1  w-32 h-8 border  border-x-4 rounded-full mr-0 flex justify-center items-center text-sm'>اطلاعات شاگرد</button>
                            </Link>
                        </div>

                    </div>
                </div>
            
        </div>
        

        </>
    )
}
export default Liststudent