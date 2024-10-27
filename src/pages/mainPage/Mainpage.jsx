/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react'
import EmblaCarousel from '../../components/embla-caousel/EmblaCarousel'
import '../../components/embla-caousel/assets/css/sandbox.css'
import '../../components/embla-caousel/assets/css/embla.css'
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';
import { API } from '../../data/api';


const OPTIONS = { loop: true }

function Mainpage() {

  const auth = useAuth();
  const [user, setUser] = useState(undefined);
  const [videos, setVideos] = useState([]); // State to hold the video data
  const [bestCoaches, setBestCoaches] = useState([]); // State to hold the video data
  const [loading, setLoading] = useState(true)
  const apiCall = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.loading) return;
    if (auth.user) {
      setUser(auth.user);
      fetchVideos(); // Fetch videos related to the plan
    } else {
      navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    return () => {
      if (apiCall.current !== undefined) {
        apiCall.current.cancel()
      }
    }
  }, [])
  const fetchVideos = async () => {
    try {
      apiCall.current = API.auth.request({
        path: "user/wikis/",
        method: "GET"
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      setVideos(response.wikis);

      apiCall.current = API.auth.request({
        path: "/user/coaches-above-3.5",
        method: "GET"
      })
      response = await apiCall.current.promise
      console.log(response)
      if (!response.isSuccess) throw response
      setBestCoaches(response.coaches);
    }
    catch (err) {
      console.error('Failed to fetch the videos:', err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      {
        loading ? <div css={css`display:flex;flex-direction:column;gap:50px;justify-content:center;align-items:center;`}>
          <CircularProgress />
          <h1>در حال بارگذاری</h1>
        </div> :
          <>
            <Link to={`/wikis`}>
              <div className='m-4 mt-6 mb-0 text-right text-white text-4xl drop-shadow-lg'>
                <h1>ویکی</h1>
              </div>
            </Link>
            <EmblaCarousel options={OPTIONS}>
              {videos && videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="embla__slide">
                    <video
                      controls
                      className="w-full h-auto rounded-xl mt-6 border border-slate-400"
                      src={`https://api.varzik.ir${video.video_url}`}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No videos available</p>
              )}
            </EmblaCarousel>

            <EmblaCarousel title="برترین مربی ها" options={OPTIONS}>
              {bestCoaches.map((coach) => {
                return <div
                  key={coach.id}
                  className="bg-[#c6d8d3] border border-gray-200 rounded-lg shadow w-64 h-80" // Wider and taller card 
                >
                  <div className="flex flex-col items-center p-4">

                    <img
                      className="w-32 h-32 mb-3 rounded-full shadow-lg" // Increased image size 
                      src={`https://api.varzik.ir${coach.pic_url}`}
                      alt="Coach Image"
                    />
                    Coach details
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{coach.username}</h5>
                    <div className="flex mt-4">
                      <Link to={`/coach-info/${coach.id}`}>
                        <button className="hover:bg-pink-700 w-32 h-10 border border-x-4 rounded-full flex justify-center items-center text-sm">
                          اطلاعات بیشتر
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              })}

            </EmblaCarousel>

            {/* <EmblaCarousel title="خدمات" options={OPTIONS}>
              {videos && videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="embla__slide">
                    <video
                      controls
                      className="w-full h-auto rounded-xl mt-6 border border-slate-400"
                      src={`https://api.varzik.ir${video.video_url}`}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No videos available</p>
              )}
            </EmblaCarousel> */}
          </>
      }

    </div>
  )
}

export default Mainpage