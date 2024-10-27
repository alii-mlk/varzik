/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
    if (!user) return undefined
    return (
        <div css={css`height:5vh;`} className='bg-[#331832] shadow-2xl w-full text-center'>
            <div css={css`display:flex;align-items:center;flex-direction:row;justify-content:space-around;`}>
                {user.access == 0 ? location.pathname.indexOf("/edit") != -1 ?
                    <Link to="/goal">
                        <button >
                            <GoGoal className={`
                            ${location.pathname.indexOf("/goal") != -1 ? 'text-green-200' : 'text-white'} 
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


                {/* <Link to="/main-page">
                    <button>
                        <GoHomeFill className={`
                            ${location.pathname.indexOf("/main-page") != -1 ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link> */}

                <Link to="/coach-list">
                    <button>
                        <IoMdList className={`
                            ${location.pathname.indexOf("/coach-list") != -1 ? 'text-green-200' : 'text-white'} 
                            text-4xl shadow hover:shadow-pink-100`} />
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Footer
