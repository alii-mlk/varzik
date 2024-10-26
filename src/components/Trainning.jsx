import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm'; // Import remark-gfm

function Trainning({ plans }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to open modal with selected plan
    const openModal = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedPlan(null);
    };

    // Function to hide part of the email
    const hideEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const hiddenLocal = localPart.slice(0, 2) + '***';
        return `${hiddenLocal}@${domain}`;
    };

    return (
        <div className="rtl"> {/* Set the whole container to RTL */}
            <div className='grid grid-cols-2 gap-4'>
                {plans && plans.length > 0 ? (
                    plans.map((plan) => (
                        <div
                            key={plan.plan_id}
                            className="w-36 px-4 mt-5 ml-3 text-right border bg-pink-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"

                        >
                            <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                                برنامه : {plan.plan_id}
                            </h5>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                                تاریخ شروع: {new Date(plan.reg_at).toLocaleDateString('fa-IR')}
                            </p>

                            <div className='text-center flex justify-center items-center '>
                                <Link to={`/plan/${plan.plan_id}`}>
                                    <button
                                        className="w-32 h-11 border border-x-4 rounded-full mb-3  hover:bg-pink-700"

                                    > جزيیات
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-right">هیچ برنامه‌ای موجود نیست.</p>
                )}
            </div>



        </div>
    );
}

export default Trainning;
