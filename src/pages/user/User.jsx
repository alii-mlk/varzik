/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Trainning from '../../components/Trainning';
import Diet from '../../components/Diet';
import Coach from '../../components/Coach';
import { useAuth } from '../../providers/auth_provider';
import { API } from '../../data/api';

function User() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [activeComponent, setActiveComponent] = useState('trainning');
    const [loadingData, setLoadingData] = useState(true); // Single loading state for data
    const [error, setError] = useState(null); // Track errors during fetch
    const [selectedFile, setSelectedFile] = useState(null); // New state to hold the selected file
    const [imageUploaded, setImageUploaded] = useState(false);
    const [previewImage, setPreviewImage] = useState(''); // To preview the image before uploading
    const fileInputRef = useRef(null); // Reference for the file input element
    const apiCall = useRef(undefined)
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        setLoadingData(true)
        if (auth.loading) return
        if (auth.user) {
            setUser(auth.user);
            setLoadingData(false)
        }
        else navigate("/login")
    }, [auth])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const imagePreviewUrl = URL.createObjectURL(file); // Create preview URL
            setPreviewImage(imagePreviewUrl);
        }
    };

    const handleProfilePicUpload = async () => {
        if (!selectedFile) return alert("Please select a file first.");

        const formData = new FormData();
        formData.append('profile_pic', selectedFile); // Append the selected file

        try {
            apiCall.current = API.auth.request({
                path: '/user/upload-profile-pic',
                method: "POST",
                body: formData,
                metadata: 'multipart/form-data',
            })
            let response = await apiCall.current.promise
            if (!response.isSuccess || !response.pic_url) throw response
            auth.reloadUser(); // Ensure user info is refreshed in the frontend
            setPreviewImage(''); // Reset preview image after upload
            alert('Profile picture uploaded successfully');
            setImageUploaded(true);
        }
        catch (err) {
            console.error('Failed to upload profile picture:', err);
            alert('Error uploading profile picture');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='relative w-full'>
                <div>
                    <div css={css`display:flex;justify-content:center;`}>
                        <div
                            className='w-32 h-32 rounded-full bg-white m-6 overflow-hidden cursor-pointer'
                            onClick={() => fileInputRef.current.click()} // Trigger file input on click
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Image Preview"
                                    style={{ width: "128px", height: "128px" }}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                user && user.profile_pic && (
                                    <img
                                        src={`https://api.varzik.ir${user.profile_pic}`}
                                        alt="User Image"
                                        style={{ width: "128px", height: "128px" }}
                                        className="object-cover w-full h-full"
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* File input for selecting a new profile picture */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hide the file input button
                        onChange={handleFileChange}
                    />

                    {/* Button to upload the selected file */}
                    {!imageUploaded && selectedFile && (
                        <button
                            className='hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full ml-3 mb-3'
                            onClick={handleProfilePicUpload}
                        >
                            آپلود تصویر
                        </button>
                    )}

                    <div className='flex justify-center'>
                        <Link to='/medical-file'>
                            <button className='hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full mr-12'>
                                پرونده پزشکی
                            </button>
                        </Link>

                        <Link to='/info'>
                            <button className='hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full ml-3'>
                                نمایش پروفایل
                            </button>
                        </Link>
                    </div>

                    <div className='flex justify-center text-2xl mt-8 gap-10'>
                        <button onClick={() => setActiveComponent('trainning')}>
                            <FaClipboardList
                                className={`text-4xl shadow ${activeComponent === 'trainning' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button>

                        {/* <button onClick={() => setActiveComponent('diet')}>
                            <BiSolidDish
                                className={`text-4xl shadow ${activeComponent === 'diet' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button> */}

                        <button onClick={() => setActiveComponent('coach')}>
                            <FaChalkboardTeacher
                                className={`text-4xl shadow ${activeComponent === 'coach' ? 'text-green-200' : 'text-black'}`}
                            />
                        </button>
                    </div>

                    <div>
                        {
                            loadingData ? <CircularProgress></CircularProgress> :
                                <>
                                    {activeComponent === 'trainning' && <Trainning plans={user.plans} />}
                                    {/* {activeComponent === 'diet' && <Diet diets={user.diets} />} */}
                                    {activeComponent === 'coach' && <Coach coaches={user.coaches} />}
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
