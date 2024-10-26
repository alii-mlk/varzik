/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { GiExitDoor } from "react-icons/gi";
import { BsInstagram } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { Button, Input, InputAdornment, Stack } from '@mui/material';
import { API } from '../../data/api';

function Login({ user, setUser, setStep, setRemainingTime }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const apiCall = useRef(undefined);

  // Set user info from localStorage if available

  useEffect(() => {
    return () => {
      if (apiCall.current !== undefined) {
        apiCall.current.cancel()
      }
    }
  }, [])
  const handleLogin = async () => {
    if (!phone || !email) {
      setError('ایمیل یا شماره تلفن را پر کنید');
      return;
    }
    try {
      apiCall.current = API.auth.request({
        path: `/login`,
        method: "POST",
        body: {
          email: email,
          phone: phone,
        }
      });
      let response = await apiCall.current.promise;
      if (!response.isSuccess) throw response
      console.log(response)
      const _user = { ...user }
      _user.phone = phone
      _user.email = email
      setUser(_user)
      setRemainingTime(2 * 60)
      setStep(1)
    }
    catch (err) {
      console.log(err)
      if (error.response && error.response.data && error.response.data.message) {
        setError(`درخواست کد با خطا مواجه شد: ${error.response.data.message}`);
      } else {
        setError('درخواست کد با خطا مواجه شد: ' + error.message);
      }
    }

  };

  return (
    <div css={css`display:flex;flex-direction:column;gap:30px;justify-content:center;align-items:center;`}>

      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <span className='text-2xl text-gray-800'>
              <MdEmail />
            </span>
          </InputAdornment>
        }
        type='text' placeholder='ایمیل' value={email} onChange={(e) => { setEmail(e.target.value) }}
        className='text-xl placeholder-gray-800 w-64 text-right'
        css={css`justify-self:center;`}
      />

      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <span className='text-2xl text-gray-800'>
              <FaPhoneFlip />
            </span>
          </InputAdornment>
        }
        type='text' placeholder=' تلفن همراه' value={phone} onChange={(e) => { setPhone(e.target.value) }}
        className='text-xl placeholder-gray-800 w-64 text-right'
        css={css`justify-self:center;`}
      />

      {
        error && <p style={{ color: 'red' }}>{error}</p>
      }

      <div className='flex justify-center item-center relative hover:transition duration-300 ease-in-out'>
        <button onClick={handleLogin} className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  text-white  border-x-4 rounded-full' css={css`display:flex;flex-direction:row;justify-content:center;align-items:center;margin:o auto;`}>
          <span className='text-2xl text-white'><GiExitDoor /></span>
          <p>ورود</p>
        </button>
      </div>
    </div>
  )
}

export default Login;
