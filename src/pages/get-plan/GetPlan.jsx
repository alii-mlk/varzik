/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import MedicalFileComponent from "../../components/shared/MedicalFileComponent"
import GoalComponent from "../../components/shared/GoalComponent"
import InfoComponent from "../../components/shared/InfoComponent"

import axios from 'axios';
import { CircularProgress, Input, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';
import { API } from '../../data/api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const questions = [
    { question: 'آیا تا کنون پزشک شما اشاره کرده است که شما دچار مشکل قلبی هستید و فقط باید فعالیت‌های جسمانی خاصی که توسط پزشک توصیه می‌شود را انجام دهید؟', answer: "false" },
    { question: 'آیا در هنگام انجام فعالیت‌های جسمانی در قفسه سینه خود احساس درد می‌کنید؟', answer: "false" },
    { question: 'آیا تاکنون به دلیل سرگیجه تعادل یا هوشیاری خود را از دست داده اید؟', answer: "false" },
    { question: 'آیا در یک ماه گذشته در حالیکه در حال انجام فعالیت های جسمانی نبوده اید دچار درد قفسه سینه شده اید؟', answer: "false" },
    { question: 'آیا دچار مشکلات مفصل یا استخوان (به عنوان مثال در کمر, زانو یا لگن) هستید که ممکن است با تغییر در فعالیت جسمانی شما بدتر شود؟', answer: "false" },
    { question: 'آیا در حال حاضر پزشک برای شما داروهایی به عنوان مثال قرص هایی که با آب بلعیده میشوند تجویز کرده است؟', answer: "false" },
    { question: 'آیا دچار فشار خون یا مشکلات قلبی هستید؟', answer: "false" },
    { question: 'آیا هیچ گونه دلیل دیگری برای منع فعالیت جسمانی شما وجود دارد؟', answer: "false" },
]

export default function GetPlan() {
    const [user, setUser] = useState(undefined)
    const navigate = useNavigate();
    const auth = useAuth()
    const apiCall = useRef(undefined)
    const [step, setStep] = useState(0)
    const [selectedGender, setSelectedGender] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [sliderValue1, setSliderValue1] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(50);
    const [username, setUsername] = useState("");
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [value, setValue] = React.useState('3');
    const [planLoading, setPlanLoading] = useState()
    // State to manage checkboxes (default to empty values)
    const [formValues, setFormValues] = useState([
        { question: 'آیا تا کنون پزشک شما اشاره کرده است که شما دچار مشکل قلبی هستید و فقط باید فعالیت‌های جسمانی خاصی که توسط پزشک توصیه می‌شود را انجام دهید؟', answer: "false" },
        { question: 'آیا در هنگام انجام فعالیت‌های جسمانی در قفسه سینه خود احساس درد می‌کنید؟', answer: "false" },
        { question: 'آیا تاکنون به دلیل سرگیجه تعادل یا هوشیاری خود را از دست داده اید؟', answer: "false" },
        { question: 'آیا در یک ماه گذشته در حالیکه در حال انجام فعالیت های جسمانی نبوده اید دچار درد قفسه سینه شده اید؟', answer: "false" },
        { question: 'آیا دچار مشکلات مفصل یا استخوان (به عنوان مثال در کمر, زانو یا لگن) هستید که ممکن است با تغییر در فعالیت جسمانی شما بدتر شود؟', answer: "false" },
        { question: 'آیا در حال حاضر پزشک برای شما داروهایی به عنوان مثال قرص هایی که با آب بلعیده میشوند تجویز کرده است؟', answer: "false" },
        { question: 'آیا دچار فشار خون یا مشکلات قلبی هستید؟', answer: "false" },
        { question: 'آیا هیچ گونه دلیل دیگری برای منع فعالیت جسمانی شما وجود دارد؟', answer: "false" },
    ]);
    useEffect(() => {
        if (auth.loading) return
        if (!auth.user) {
            navigate('/login');
            return
        }
        else {
            setUser(auth.user)
            let _formValues = [...formValues]
            if (auth.user.medical_info.content !== undefined)
                if (auth.user.medical_info.content.length > 0)
                    for (var i = 0; i < questions.length; i++) {
                        _formValues[i].answer = auth.user.medical_info.content[i].answer
                    }
            setFormValues(_formValues)
            if (auth.user.workout_info) {
                setSliderValue(auth.user.workout_info.weight || 50);
                setSliderValue1(auth.user.workout_info.height || 50);
                setSliderValue2(auth.user.workout_info.age || 50);
                setSelectedGender(auth.user.workout_info.sex === 'male' ? 'man' : 'woman');
                const workoutInfo = auth.user.workout_info;
                // Initialize goal and level only if they exist
                setSelectedGoal(workoutInfo.goal || '');
                setSelectedLevel(workoutInfo.level || '');
            }
            setUsername(auth.user.username || '');
            setLoading(false); // Set loading to false after data is initialized
        }
    }, [auth]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

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
        setStep(1)
    }

    const handleSaveClick = async () => {
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('user-token');
            const updatedInfo = {
                ...user, // Spread the existing user info
                username: user.username, // Update username
                workout_info: {
                    weight: user.workout_info.weight,
                    height: user.workout_info.height,
                    age: user.workout_info.age,
                    sex: user.workout_info.sex,
                    goal: selectedGoal,
                    level: selectedLevel
                },
            };

            // Update username if it has changed
            if (user.username) {
                console.log("userInfo", updatedInfo);
                await axios.post('https://api.varzik.ir/user/update-username', { username: user.username }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            // Update backend with the new workout info
            await axios.put('https://api.varzik.ir/user/update-workout-info', updatedInfo.workout_info, {
                headers: { Authorization: `Bearer ${token}` },
            });
            auth.setUser(updatedInfo)
            setSuccessMessage('اطلاعات با موفقیت بروزرسانی شد.');
            setStep(2)
        } catch (err) {
            console.error('Failed to update workout info:', err);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleSubmit = async () => {
        try {
            apiCall.current = API.auth.request({
                path: "/user/update-medical-record",
                method: "put",
                body: {
                    content: formValues,
                }
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response;
            let _authUser = auth.user
            _authUser.medical_info.content = formValues
            auth.setUser(_authUser)
            setStep(3)
        }
        catch (err) {
            console.error('Failed to update medical record:', err);
            alert('خطا در ذخیره اطلاعات پزشکی');
        }
    }
    const planReq = async () => {
        setPlanLoading(true)
        try {
            apiCall.current = API.auth.request({
                path: "/user/get-coach-plan",
                method: "post",
                body: {
                    coach_id: auth.selectedCoachId,
                    level: auth.selectedCoachLvl,
                    prompt: `من درخواست برنامه برای ${value} روز در هفته را دارم`
                }
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response;
            alert("برنامه ثبت شد.")
            auth.reloadUser()
            navigate('/user')
        }
        catch (err) {
            console.error('Failed to update medical record:', err);
            alert('خطا در درخواست برنامه.');
        } finally {
            setPlanLoading(false)
        }
    }
    return (
        <div css={css`width:100%;`}>
            {
                step == 0 ?
                    <InfoComponent username={username} setUsername={setUsername} onSubmit={handleNextClick} selectedGender={selectedGender} setSelectedGender={setSelectedGender}
                        sliderValue={sliderValue}
                        sliderValue1={sliderValue1}
                        sliderValue2={sliderValue2}
                        setSliderValue={setSliderValue}
                        setSliderValue1={setSliderValue1}
                        setSliderValue2={setSliderValue2}

                    />
                    :
                    step == 1 ?
                        <GoalComponent selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
                            successMessage={successMessage} setSuccessMessage={setSuccessMessage}
                            isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}
                            onSubmit={handleSaveClick}
                        />
                        :
                        step == 2 ?
                            <MedicalFileComponent onSubmit={handleSubmit} formValues={formValues} setFormValues={setFormValues} />
                            :
                            <div css={css`display:flex;flex-direction:column;gap:20px;justify-content:center;align-items:center;height:600px;`}>
                                <FormControl>

                                    <h1>
                                        تعداد روز های تمرینی
                                    </h1>

                                    <RadioGroup
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="1" control={<Radio css={css`color:white !important;`} />} label="یک روز" />
                                        <FormControlLabel value="2" control={<Radio css={css`color:white !important;`} />} label="دو روز" />
                                        <FormControlLabel value="3" control={<Radio css={css`color:white !important;`} />} label="سه روز" />
                                        <FormControlLabel value="4" control={<Radio css={css`color:white !important;`} />} label="چهار روز" />
                                        <FormControlLabel value="5" control={<Radio css={css`color:white !important;`} />} label="پنج روز" />
                                        <FormControlLabel value="6" control={<Radio css={css`color:white !important;`} />} label="شش روز" />
                                        <FormControlLabel value="7" control={<Radio css={css`color:white !important;`} />} label="هفت روز" />
                                    </RadioGroup>
                                </FormControl>
                                {
                                    planLoading ? <div css={css`display:flex;flex-direction:column;gap:20px;justify-content:center;align-items:center;`}>
                                        <CircularProgress />
                                        <h1>در حال اماده سازی</h1>
                                    </div>
                                        :
                                        <button
                                            className={`hover:bg-pink-700 mt-1 w-60 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-xl ${isSubmitting ? 'opacity-50' : ''}`}
                                            onClick={planReq}
                                            disabled={isSubmitting}
                                        >
                                            درخواست برنامه‌
                                        </button>
                                }
                            </div>
            }
        </div>

    )
}
