/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../providers/auth_provider';
import { Typography } from '@mui/material';
import Countdown from '../../components/CountDown';
import { API } from '../../data/api';

function OtpStep({ step, user, setUser, remainingTime, setRemainingTime }) {
    // State for countdown and button visibility
    const auth = useAuth();
    const apiCall = useRef(undefined)
    const inputRefs = useRef([]);

    const handleTimeUpdate = (updatedTime) => {
        setRemainingTime(updatedTime);
    };

    const [otp, setOtp] = useState(Array(4).fill(''));
    const [error, setError] = useState(undefined)

    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined) {
                apiCall.current.cancel()
            }
        }
    }, [])

    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        if (e.target.value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
        let _user = { ...user }
        _user.otpCode = newOtp.join("")
        setUser(_user)
    };

    const handleKeyUp = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const checkOtp = async () => {
        try {
            apiCall.current = API.auth.request({
                path: "/validate-otp",
                method: "post",
                body: {
                    otp: user.otpCode,
                    phone: user.phone
                }
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response;
            const token = response.token;
            // Store the token in localStorage for API requests
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                auth.reloadUser()
            }, 2000);
            // Call the check-token API to get user info

        }
        catch (err) {
            console.log(err)
            setError("شناسه کاربری معتبر نیست و یا زمان مجاز برای ورود پایان یافته است، لطفا دوباره تلاش کنید.")
        }
    }
    const resend = async () => {
        try {
            apiCall.current = API.auth.request({
                path: `/login`,
                method: "POST",
                body: {
                    email: user.email,
                    phone: user.phone,
                }
            });
            let response = await apiCall.current.promise;
            setRemainingTime(2 * 60)
        }
        catch (err) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(`درخواست کد با خطا مواجه شد: ${error.response.data.message}`);
            } else {
                setError('درخواست کد با خطا مواجه شد: ' + error.message);
            }
        }
    }
    if (step != 1) return
    return (
        <div>
            <Typography css={css`font-weight: bold;`}>{"کد تایید"}</Typography>
            <Typography css={css`color: white;`}>{`کد ارسال شده به شماره ${user.phone} را وارد نمایید`}</Typography>
            <div css={css`margin: 32px 0px 16px 0px !important;direction: ltr;display:flex;flex-direction:row;justify-content:space-evenly;`} className='row'>
                {otp.map((digit, index) => (
                    <div key={`otpObject${index}`}>
                        <input
                            css={css`
                border-radius: 5px;
                border: 1px solid #D7DEE0;
                background: #F7F9FD;
                width: 60px;
                height: 60px;
                flex-shrink: 0;
                text-align: center;
                `}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyUp={(e) => handleKeyUp(e, index)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    </div>
                ))}
            </div>

            {error ? <Typography sx={{ color: 'red' }}>{error}</Typography> : undefined}

            {remainingTime !== 0 ? undefined :

                <div className='text-center' css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        `}>
                    <div onClick={resend} css={css`
            text-align:center;    
            &:hover {
                cursor: ${remainingTime > 0 ? "default" : "pointer"};
            }
            `}>ارسال مجدد کد</div>
                    &nbsp;

                </div>
            }
            {remainingTime == 0 ? undefined :
                <Countdown remainingTime={remainingTime} onTimeUpdate={handleTimeUpdate} />
            }
            <div className='flex justify-center item-center relative hover:transition duration-300 ease-in-out'>
                <button onClick={checkOtp} className='hover:bg-gradient-to-r   w-32 h-11 border  focus:bg-pink-700  text-white  border-x-4 rounded-full'
                    css={css`display:flex;flex-direction:row;justify-content:center;align-items:center;margin:o auto;`}>
                    <p>ثبت کد</p>
                </button>
            </div>
        </div>
    );
}

export default OtpStep;
