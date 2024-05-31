import './App.css';
import Home from './ui/auth/Home';
import ProfileUrl from './ui/auth/ProfileUrl';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';

import { UserProvider, UserContext } from './context/User/context';

import { useContext } from 'react';


import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Dashboard from './ui/authenticated/Dashboard';
import MakeProfileUrl from './ui/authenticated/MakeProfileUrl';
import AddSchedule from './ui/authenticated/AddSchedule';
import Profile from './ui/authenticated/Profile';
import CalendarForPublic from './ui/auth/CalendarForPublic';
import IFrameCalendarForPublic from './ui/auth/IframeCalenderForPublic';


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}



function App() {
  return (
    <>
      <div className='site-wrapper overflow-hidden'>
        <AlertProvider template={AlertTemplate} {...options}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UserProvider>
              <BrowserRouter>
                <MyRoutes />
              </BrowserRouter>
            </UserProvider>
          </LocalizationProvider>
        </AlertProvider>
      </div>
    </>
  );
}



function MyRoutes() {





  return (
    <>

      <Routes>
        <Route exact path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/:profileUrl" element={<><Header /><CalendarForPublic /><Footer /></>} />
        <Route path="/iframe/:profileUrl" element={<IFrameCalendarForPublic />} />
        <Route path="/profile-url" element={<><Header /><RequireAuth><MakeProfileUrl /></RequireAuth><Footer /></>} />
        <Route path="/dashboard" element={<><Header /><RequireAuth><Dashboard /></RequireAuth><Footer /></>} />
        <Route path="/add-schedule" element={<><Header /><RequireAuth><AddSchedule /></RequireAuth><Footer /></>} />
        <Route path="/profile" element={<><Header /><RequireAuth><Profile /></RequireAuth><Footer /></>} />


      </Routes>

    </>

  );
}


function RequireAuth({ children }) {
  const { userState } = useContext(UserContext);

  if (userState.isLoading) {
    // return <div>Loading...</div>;
    return <>
      <div id="loading">
        <img src="image/favicon.png" alt=""/>
      </div>
    </>;




  }
  if (userState.user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }

}


export default App;
