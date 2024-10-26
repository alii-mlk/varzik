import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from "./AuthWrapper"

import PhoneStep from './PhoneStep';
import OtpStep from './OtpStep';
import { useAuth } from '../../providers/auth_provider';
import { useNavigate } from 'react-router-dom';

// import ProfileStep from './ProfileStep';
// import OtpStep from './OtpSep';

export default function Login() {
  const navigate = useNavigate()
  const auth = useAuth();
  const [step, setStep] = useState(0)
  const [user, setUser] = useState({
    email: "",
    phone: "",
  })
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    if (auth.user) {
      navigate('/user'); // Redirect if user is already logged in
    }
  }, []);

  const handleSetStep = () => {
    if (step == 0) navigate(-1)
    setStep(prev => prev - 1)
  }

  const sharedProps = {
    step,
    setStep,
    user,
    setUser
  }
  if (auth.user)
    navigate('/user');

  return (
    <>
      <AuthWrapper onClick={() => handleSetStep()}>
        {step == 0 ? <PhoneStep {...sharedProps} setRemainingTime={setRemainingTime} /> : undefined}
        {step == 1 ? <OtpStep {...sharedProps} remainingTime={remainingTime} setRemainingTime={setRemainingTime} /> : undefined}
      </AuthWrapper>
    </>
  )
}
