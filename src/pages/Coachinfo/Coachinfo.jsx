import React, { useEffect, useRef, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../providers/auth_provider';
import { API } from '../../data/api';

function Coachinfo({  }) {
  const auth = useAuth();
  const navigate = useNavigate()
  const [user, setUser] = useState(undefined);
  const [coachInfo, setCoachInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiCall = useRef()
  const coachid = useParams().coachid;

  useEffect(() => {
    if (auth.loading) return;
    if (auth.user) {
      setUser(auth.user);
      fetchCoachInfo(coachid); // Fetching coach info for coach_id = 2
    } else {
      navigate("/login");
    }
  }, [auth]);

  const fetchCoachInfo = async (coachid) => {
    try {
      apiCall.current = API.auth.request({
        path: `user/coach-info/${coachid}`,
        method: "GET"
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      setCoachInfo(response.coach)
    }
    catch (err) {
      console.error('Error fetching coach info:', err);
    }
    finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg" dir="rtl">
        <h1 className="text-2xl font-bold mb-4">اطلاعات مربی</h1>

        {/* Display coach info if available */}
        <div className="bg-gray-100 p-4 rounded-lg">
          {coachInfo && coachInfo.info
            ? Object.entries(coachInfo.info).map(([key, value], index) => (
              <p key={index}>
                <strong>{key}:</strong> {value}
              </p>
            ))
            : 'اطلاعات موجود نیست'}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/coach-list">
          <button className="hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full flex justify-center items-center text-xl">
            بازگشت
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Coachinfo;
