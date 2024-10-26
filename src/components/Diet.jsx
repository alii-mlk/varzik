import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown for markdown rendering

function Diet({ diets }) {
    const [selectedDiet, setSelectedDiet] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to open modal with selected diet
    const openModal = (diet) => {
        setSelectedDiet(diet);
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedDiet(null);
    };

    return (
        <div className='grid grid-cols-2 gap-4 rtl'>
            {diets && diets.length > 0 ? (
                diets.map((diet) => (
                    <div
                        key={diet.user_diet_id}
                        className="w-36 px-4 mt-5 ml-3 text-right bg-green-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                        onClick={() => openModal(diet)}
                    >
                        <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                            رژیم : {diet.id}
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                            تاریخ انتخاب: {new Date(diet.reg_at).toLocaleDateString('fa-IR')}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-right">هیچ رژیمی موجود نیست.</p>
            )}

            {/* Modal for displaying diet details */}
            {showModal && selectedDiet && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-80 p-4 rounded-lg shadow-lg relative max-h-96 overflow-y-auto text-right">
                        <h2 className="text-xl font-bold mb-4">جزئیات رژیم</h2>
                        <div className="max-h-48 overflow-y-auto pr-2"> {/* Scrollable list container */}
                            <ReactMarkdown className="markdown-content text-right">
                                {selectedDiet.content ? selectedDiet.content : 'هیچ اطلاعاتی موجود نیست'}
                            </ReactMarkdown>
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

export default Diet;
