import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
// import { AuthProvider } from '../providers/auth_provider';
import { BG_URL, PUBLIC_URL } from './utils/utils'
import { AuthProvider } from './providers/auth_provider';
import Home from "./pages/home/Home"
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import CoachBot from './pages/coach-bot/CoachBot';
import Coachlist from './pages/coach-list/Coachlist';
import Coachprof from './pages/coach-prof/Coachprof';
import CoachStudents from './pages/coach-students/CoachStudents';
import Coachinfo from './pages/Coachinfo/Coachinfo';
import Edit from './pages/edit/Edit';
import GetPlan from './pages/get-plan/GetPlan';
import Goal from './pages/goal/Goal';
import Info from './pages/info/Info';
import Liststudent from './pages/liststudent/Liststudent';
import Mainpage from './pages/mainPage/Mainpage';
import Medicalfile from './pages/medicalfile/Medicalfile';
import Plan from './pages/plan/Plan';
import Planlist from './pages/planlist/Planlist';
import Showrecord from './pages/showrecord/Showrecord';
import User from './pages/user/User';
import Wikis from './pages/wikis/Wikis';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coach-bot" element={<CoachBot />} />
            <Route path="/coach-list" element={<Coachlist />} />
            <Route path="/coach-prof" element={<Coachprof />} />
            <Route path="/coach-students" element={<CoachStudents />} />
            <Route path="/coach-info/:coachid" element={<Coachinfo />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/get-plan" element={<GetPlan />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="/info" element={<Info />} />
            <Route path="/list-student" element={< Liststudent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main-page" element={< Mainpage />} />
            <Route path="/medical-file" element={< Medicalfile />} />
            <Route path="/plan/:planid" element={< Plan />} />
            <Route path="/plan-list" element={< Planlist />} />
            <Route path="/show-record" element={< Showrecord />} />
            <Route path="/user" element={< User />} />
            <Route path="/wikis" element={< Wikis />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </AuthProvider >
    </BrowserRouter >
  );
}
function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className={"h-screen overflow-hidden min-h-screen max-w-[430px] min-w-[350px] mx-auto flex flex-col justify-between"}>
    <div className="h-full bg-no-repeat bg-right-top bg-cover overflow-y-auto scroll-hidden" style={{ backgroundImage: BG_URL(PUBLIC_URL("/images/45562.png")) }}>
      <div className="bg-gray-500 bg-cover bg-opacity-75 h-full overflow-y-auto scroll-hidden">
        {children}
      </div>
    </div>
  </div>

}

export default App;
