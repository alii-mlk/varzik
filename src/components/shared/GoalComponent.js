import React from 'react'
import { Link } from 'react-router-dom';

export default function GoalComponent({
    selectedGoal, setSelectedGoal, selectedLevel, setSelectedLevel,
    successMessage,
    isSubmitting,
    onSubmit}
) {
    const handleGoalClick = (goal) => {
        setSelectedGoal(goal);
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            {successMessage && (
                <div className='mb-4 text-center text-green-500'>
                    {successMessage}
                </div>
            )}

            <div className='flex flex-col absolute top-20 right-18'>
                <div className='flex justify-center items-center mb-2 mt-6 text-2xl text-gray-800 font-bold vazir'>
                    <h1>هدف خود را انتخاب کنید</h1>
                </div>

                <div className='flex flex-col mb-6 justify-center items-center'>
                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-4 ${selectedGoal === 'کاهش وزن و تناسب اندام' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('کاهش وزن و تناسب اندام')}
                    >
                        کاهش وزن و تناسب اندام
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'عضله‌سازی و قدرت' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('عضله‌سازی و قدرت')}
                    >
                        عضله‌سازی و قدرت
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'فیتنس فانکشنال' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('فیتنس فانکشنال')}
                    >
                        فیتنس فانکشنال
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedGoal === 'بهبود عملکرد ورزشی' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleGoalClick('بهبود عملکرد ورزشی')}
                    >
                        بهبود عملکرد ورزشی
                    </button>
                </div>

                <div className='mb-6 mt-2 text-2xl text-gray-800 font-bold vazir'>
                    <h1>سطح ورزشی خود را انتخاب کنید</h1>
                </div>

                <div className='flex flex-col mb-6 justify-center items-center'>
                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-2 ${selectedLevel === 'مبتدی' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('مبتدی')}
                    >
                        مبتدی
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full mb-3 ${selectedLevel === 'متوسط' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('متوسط')}
                    >
                        متوسط
                    </button>

                    <button
                        className={`w-44 h-11 border border-x-4 rounded-full ${selectedLevel === 'حرفه ای' ? 'bg-pink-700' : ''}`}
                        onClick={() => handleLevelClick('حرفه ای')}
                    >
                        حرفه ای
                    </button>
                </div>

                <div className='mb-8 flex justify-center'>
                    <Link to="/info">
                        <button className='hover:bg-pink-700 mt-1 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-xl'>
                            بازگشت
                        </button>
                    </Link>

                    <button
                        className={`hover:bg-pink-700 mt-1 w-32 h-11 border border-x-4 rounded-full mr-5 flex justify-center items-center text-xl ${isSubmitting ? 'opacity-50' : ''}`}
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    )
}
