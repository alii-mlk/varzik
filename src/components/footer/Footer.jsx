import { MdDashboard } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import { useEffect, useState } from "react";

import { CgProfile } from "react-icons/cg";
import { GoGoal } from "react-icons/go";
import { IoMdList } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../providers/auth_provider";

function Footer() {
    const location = useLocation();

    const auth = useAuth()
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        if (auth.loading) return
        console.log(auth)
        if (auth.user) setUser(auth.user)
    }, [auth])
    useEffect(() => {
        console.log(user)
    }, [user])
    if (!user) return undefined
    return (
        <div className='bottom-0 left-0 z-50 bg-[#331832] shadow-2xl w-full  text-center '>
            <div className='flex justify-center gap-24 mt-4 items-center text-center   '>

                {user.access == 0 ? location.pathname.indexOf("/edit") != -1 ?
                    <Link to="/goal">
                        <button >
                            <GoGoal className={`
                            ${location.pathname.indexOf("/goal") != -1  ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                        </button>
                    </Link >
                    :
                    <Link to={user.access == 0 ? `/user` : "/coach-prof"}>
                        <CgProfile className={`
                            ${location.pathname.indexOf("/user") != -1 ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </Link >
                    :
                    undefined
                }


                <Link to="/mainPage">
                    <button>
                        <GoHomeFill className={`
                            ${location.pathname.indexOf("/mainpage") != -1 ?'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link>

                <Link to="/coach-list">
                    <button >
                        <IoMdList className={`
                            ${location.pathname.indexOf("/coach-list") ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Footer
