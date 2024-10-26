import React, { useState } from 'react';

function Coach({ coaches }) {
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to open modal with selected coach info
    const openModal = (coach) => {
        setSelectedCoach(coach);
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedCoach(null);
    };

    return (
        <div className="grid grid-cols-2 gap-4 rtl">
            {coaches && coaches.length > 0 ? (
                coaches.map((coach) => (
                    <div
                        key={coach.user_coach_id}
                        className="w-36 px-4 mt-5 ml-3 text-right bg-yellow-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                        onClick={() => openModal(coach)}
                    >
                        <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                            مربی : {coach.user_coach_id}
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                            تاریخ انتخاب: {new Date(coach.choosed_at).toLocaleDateString('fa-IR')}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-right">هیچ مربی‌ای موجود نیست.</p>
            )}

            {/* Modal for displaying coach details */}
            {showModal && selectedCoach && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-80 p-4 rounded-lg shadow-lg relative max-h-96 overflow-y-auto text-right">
                        <h2 className="text-xl font-bold mb-4">جزئیات مربی</h2>
                        <div className="max-h-48 overflow-y-auto pr-2">
                            <p><strong>:نام</strong> <span className="rtl block"> {selectedCoach.username}</span></p>
                            <p><strong>تلفن:</strong> {selectedCoach.phone}</p>
                            <p><strong>تاریخ انتخاب:</strong> {new Date(selectedCoach.choosed_at).toLocaleDateString('fa-IR')}</p>
                            <p><strong>:اطلاعات مربی</strong></p>

                            {/* Render coach info as human-readable */}
                            <div className="bg-gray-100 p-2 rounded-lg">
                                {selectedCoach.coach_info
                                    ? Object.entries(selectedCoach.coach_info).map(([key, value], index) => (
                                        <p key={index}><strong>{key}:</strong> {value}</p>
                                    ))
                                    : 'اطلاعات موجود نیست'}
                            </div>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Coach;
