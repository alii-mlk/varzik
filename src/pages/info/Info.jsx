/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import './style.css';
import InfoComponent from "../../components/shared/InfoComponent"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';

function Info() {
    const [selectedGender, setSelectedGender] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [sliderValue1, setSliderValue1] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(50);
    const [username, setUsername] = useState("");
    const auth = useAuth()
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        if (auth.loading) return
        if (!auth.user) {
            navigate('/login');
            return
        }
        setUser(auth.user)
        if (auth.user.workout_info) {
            setSliderValue(auth.user.workout_info.weight || 50);
            setSliderValue1(auth.user.workout_info.height || 50);
            setSliderValue2(auth.user.workout_info.age || 50);
            setSelectedGender(auth.user.workout_info.sex === 'male' ? 'man' : 'woman');
        }
        setUsername(auth.user.username || '');

    }, [auth]);



    const handleNextClick = () => {
        console.log("handleNextClick userinfo", user);
        const updatedUserInfo = {
            ...user, // Spread the existing user info
            username: username, // Update the username
            workout_info: {
                weight: sliderValue,
                height: sliderValue1,
                age: sliderValue2,
                sex: selectedGender === 'woman' ? 'female' : 'male',
                goal: user.workout_info.goal,
                level: user.workout_info.level
            }
        };
        auth.setUser(updatedUserInfo)
        // Navigate to the next page
        navigate('/goal');
    };

    return (
        <InfoComponent username={username} setUsername={setUsername} onSubmit={handleNextClick} selectedGender={selectedGender} setSelectedGender={setSelectedGender}
            sliderValue={sliderValue}
            sliderValue1={sliderValue1}
            sliderValue2={sliderValue2}
            setSliderValue={setSliderValue}
            setSliderValue1={setSliderValue1}
            setSliderValue2={setSliderValue2}

        />
    );
}

export default Info;
