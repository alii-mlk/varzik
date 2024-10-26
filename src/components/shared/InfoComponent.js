/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'
import { Input, InputAdornment } from '@mui/material';
import { FaClipboardUser } from "react-icons/fa6";
import { IoMdMan } from "react-icons/io";
import { MdOutlineWoman2 } from "react-icons/md";
import './style.css';
import { Link } from 'react-router-dom';

export default function InfoComponent({
    username, setUsername, onSubmit, setSelectedGender,
    sliderValue,
    sliderValue1,
    sliderValue2,
    setSliderValue,
    setSliderValue1,
    setSliderValue2,
    selectedGender
}) {
    const handleSliderChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };
    return (
        <div css={css`width:100%;`}>
            <div dir='rtl' css={css`display:flex;flex-direction:center;justify-content:center;`}>

                <Input
                    className='text-xl placeholder-white w-64 text-right'
                    css={css`width:90%;margin:20px 0px;padding:10px; color:white;`}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <span className='text-2xl text-gray-800'>
                                <FaClipboardUser className='text-white text-3xl m-2' />
                            </span>
                        </InputAdornment>
                    }
                    type='text' placeholder='نام کاربری' value={username} onChange={(e) => { setUsername(e.target.value) }}
                />
            </div>
            <div className='flex justify-center items-center '>
                <button
                    className={`mt-6 mb-3 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-4xl ${selectedGender === 'woman' ? 'bg-pink-700' : ''}`}
                    onClick={() => handleGenderClick('woman')}
                >
                    <MdOutlineWoman2 />
                </button>
                <button
                    className={`mt-6 mb-3 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-4xl ${selectedGender === 'man' ? 'bg-pink-700' : ''}`}
                    onClick={() => handleGenderClick('man')}
                >
                    <IoMdMan />
                </button>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:وزن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue}
                    className="slider"
                    id="myRange"
                    onChange={(e) => handleSliderChange(e, setSliderValue)}
                />
                <p className='text-center text-gray-900 text-xl'><span>وزن: {sliderValue}</span> کیلو گرم</p>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:قد خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="20"
                    max="300"
                    value={sliderValue1}
                    className="slider"
                    id="myRange"
                    onChange={(e) => handleSliderChange(e, setSliderValue1)}
                />
                <p className='text-center text-gray-900 text-xl'><span>قد: {sliderValue1}</span> سانتی متر</p>
            </div>

            <h1 className='text-center text-2xl text-gray-800 font-bold vazir mt-8'>:سن خود را وارد کنید</h1>
            <div className="slidecontainer">
                <input
                    type="range"
                    min="12"
                    max="70"
                    value={sliderValue2}
                    className="slider"
                    id="myRange"
                    onChange={(e) => handleSliderChange(e, setSliderValue2)}
                />
                <p className='text-center text-gray-900 text-xl'><span>سن: {sliderValue2}</span> سال</p>
            </div>

            <div className='flex justify-center'>
                <Link to="/user">
                    <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl'>
                        بازگشت
                    </button>
                </Link>

                <button className='hover:bg-pink-700 mt-[6rem] w-32 h-11 border border-x-4 rounded-full mr-3 flex justify-center items-center text-xl' onClick={onSubmit}>
                    بعدی
                </button>

            </div>
        </div>
    )
}
