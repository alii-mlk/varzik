/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import EmblaCarousel from '../../components/embla-caousel/EmblaCarousel';
import '../../components/embla-caousel/assets/css/sandbox.css';
import './embla.css';
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // For rendering HTML inside Markdown
import remarkGfm from 'remark-gfm'; // For rendering GitHub-flavored markdown (tables, etc.)
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';
import { API } from '../../data/api';


const OPTIONS = { loop: true, axis: 'y' };

function Plan({  }) {
  const planid = useParams().planid;
  const auth = useAuth();
  const [user, setUser] = useState(undefined);
  const [plan, setPlan] = useState(null); // State to hold the plan data
  const [videos, setVideos] = useState([]); // State to hold the video data
  const [filteredVideos, setFilteredVideos] = useState([]); // State to hold the video data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined)
  const [workoutPlan, setWorkoutPlan] = useState(undefined)
  const apiCall = useRef(undefined)
  const navigate = useNavigate()
  useEffect(() => {
    if (auth.loading) return;
    if (auth.user) {
      setUser(auth.user);
      fetchPlanDetails(planid); // Fetch the plan details on component mount
      fetchVideos(planid); // Fetch videos related to the plan
    } else {
      navigate("/login");
    }
  }, [auth]);
  const extractJsonFromText = (text) => {
    const match = text.match(/```json([\s\S]*?)```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
      }
    }
    return null;
  };
  useEffect(() => {
    if (!videos || !workoutPlan) return
    console.log(videos)
    console.log(workoutPlan)
    filterVideos()
  }, [videos, workoutPlan])


  const filterVideos = () => {
    // Gather all exercise names from the workoutPlan
    const exercises = Object.values(workoutPlan).flat().map(exercise => exercise.exercise);

    // Filter videos based on matching title with exercise names
    const matchedVideos = videos.filter(video =>
      exercises.some(exerciseName => video.title.includes(exerciseName))
    );
    console.log(matchedVideos)
    setFilteredVideos(matchedVideos); // Set matched videos to state
    setLoading(false)

  };

  const fetchPlanDetails = async (planId) => {
    try {
      apiCall.current = API.auth.request({
        path: `user/plans/${planId}`,
        method: "GET"
      })
      let response = await apiCall.current.promise
      console.log(response)
      if (!response.isSuccess) throw response
      setPlan(response.plan); // Set the plan data
      let jsonObj = extractJsonFromText(response.plan.movements)
      setWorkoutPlan(jsonObj)
    }
    catch (err) {
      console.error('Failed to fetch the plan details:', err);
      setLoading(false);
    }
  };

  const fetchVideos = async (level) => {

    try {
      apiCall.current = API.auth.request({
        path: `/user/wikis/`,
        method: "GET"
      });
      let response = await apiCall.current.promise;
      console.log(response)
      if (!response.isSuccess)
        throw response
      setVideos(response.wikis);
    }
    catch (err) {
      console.log(err)
      if (err.error) {
        setError(`خطا: ${err.error}`);
      } else {
        setError('خطا: ' + err.message);
      }
      setLoading(false)
    }
  };

  const handleEndDayClick = async (planId) => {
    try {
      apiCall.current = API.auth.request({
        path: 'user/update-progress',
        method: "PUT",
        body: { plan_id: planid }
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      alert('روز با موفقیت پایان یافت.');
      // Optionally, you can update the progress after the API call is successful.
      fetchPlanDetails(planid);
    }
    catch (error) {
      console.error('Failed to end the day:', error);
      alert('خطایی رخ داد. لطفا دوباره تلاش کنید.');
    }
  };

  if (loading) return <div css={css`display:flex;flex-direction:column;gap:20px;justify-content:center;align-items:center;align-items:center;min-height:600px;`}>
    <CircularProgress />
    <h1>در حال بارگذاری</h1>
  </div>;

  return (
    <>
      <div>
        {plan ? (
          <div>
            {/* Embla Carousel to display videos */}
            <EmblaCarousel title="ویکی" options={OPTIONS}>
              {filteredVideos && filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
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

            {/* Progress as Green Badge and End Day Button */}
            <div className="flex justify-between items-center mt-4">
              <span className="inline-block bg-green-500 text-white py-1 px-3 rounded-full">
                %وضعیت پیشرفت: {parseInt(plan.progress)}
              </span>
              <button
                className='hover:bg-gradient-to-r w-32 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mr-3 mb-3'
                onClick={handleEndDayClick}
              >
                پایان روز
              </button>
            </div>

            {/* Coach Username as Header (white text) */}
            <h1 className="text-right text-3xl font-bold text-white mb-4 mt-4" dir="rtl">
              مربی: {plan.coach_username}
            </h1>

            {/* Plan Container with White Background */}
            <div dir="rtl" style={{ textAlign: 'right', paddingBottom: "20px" }}>

              {/* Responsive Scrollable Box for Markdown Content */}
              {/* <div className="w-full overflow-x-auto">
                <div className="min-w-[600px]"> 
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]} 
                    className="table-auto border-collapse border border-gray-400"
                  >
                    {plan.movements}
                  </ReactMarkdown>
                </div>
              </div> */}
              <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', marginTop: 4 }}>
                <Typography variant="h6" align="center" sx={{ padding: 2 }}>برنامه تمرینی</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>روز</TableCell>
                      <TableCell>تمرین</TableCell>
                      <TableCell align="right">تعداد ست‌ها</TableCell>
                      <TableCell align="right">تعداد تکرار</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(workoutPlan).map(([day, exercises], index) => (
                      exercises.map((exercise, idx) => (
                        <TableRow key={`${day}-${idx}`}>
                          {idx === 0 && (
                            <TableCell rowSpan={exercises.length} align="center">
                              {day.replace('_', ' ')}
                            </TableCell>
                          )}
                          <TableCell>{exercise.exercise}</TableCell>
                          <TableCell align="right">{exercise.sets}</TableCell>
                          <TableCell align="right">{exercise.repetitions}</TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          </div>
        ) : (
          <p>Plan not found.</p>
        )}
      </div>
    </>
  );
}

export default Plan;
