import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoalComponent from "../../components/shared/GoalComponent"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';
function Goal() {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined)
    const auth = useAuth()
    useEffect(() => {
        if (auth.loading) return
        if (!auth.user) {
            navigate('/login');
            return
        }
        console.log(auth.user)
        setUser(auth.user)
        if (auth.user.workout_info) {
            console.log("cechking user info", auth.user);
            const workoutInfo = auth.user.workout_info;
            // Initialize goal and level only if they exist
            setSelectedGoal(workoutInfo.goal || '');
            setSelectedLevel(workoutInfo.level || '');
            setLoading(false); // Set loading to false after data is initialized
        }
    }, [auth]);

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
            setTimeout(() => {
                navigate("/user");
            }, 2000);
        } catch (err) {
            console.error('Failed to update workout info:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If loading is still true, show a loading message
    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <GoalComponent selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
            successMessage={successMessage} setSuccessMessage={setSuccessMessage}
            isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}
            onSubmit={handleSaveClick}
        />
    );
}

export default Goal;
