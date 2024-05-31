import React, { useContext, useEffect, useState } from 'react'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { UserContext } from '../../context/User/context';
import { Link } from 'react-router-dom';

import MeetingDetailModal from './MeetingDetailModal';

import Shepherd from 'shepherd.js';


const localizer = momentLocalizer(moment)


const Dashboard = () => {

  const { userState } = useContext(UserContext);

  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isMeetingDetailsModalOpen, setIsMeetingDetailsModalOpen] = useState(false);



  const handleCloseIsMeetingDetailsModalOpen = () => {
    setIsMeetingDetailsModalOpen(false);
  }

  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: "shepherd-theme-arrows  p-3 ",
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });


  tour.addStep({
    id: 'welcome',
    title: 'Welcome to Your Dashboard!',
    text: 'This is your main panel where you can manage all your schedules and appointments.',
    attachTo: {
      element: '',
      on: 'center'
    },
    buttons: [
      {
        text: 'Skip',
        action: tour.cancel
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep({
    id: 'add-schedule',
    title: 'Adding Schedules',
    text: 'Click here to add your availability schedules. This lets your clients know when you are available.',
    attachTo: {
      element: '.add-schedule-button',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep({
    id: 'calendar',
    title: 'View Your Calendar',
    text: 'This calendar shows your available slots and booked meetings. Click on any slot to see more details or manage appointments.',
    attachTo: {
      element: '.big_calendar_dv',
      on: 'top'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep({
    id: 'profile',
    title: 'Profile and Sharing',
    text: 'Access your profile here to share your calendar or embed it into your website. This helps in easy integration with your existing digital platforms.',
    attachTo: {
      element: '.user_name_icon',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Finish',
        action: tour.complete
      }
    ]
  });













  useEffect(() => {

    userState.schedules.map((event) => {
      event.slots.map((slot) => {
        if (!slot.is_available) {
          setEvents((events) => [...events, {
            title: "Busy",
            start: new Date(event.date + " " + slot.from_time),
            end: new Date(event.date + " " + slot.to_time),
            meetings: slot.meetings
          }])

        } else {
          setEvents((events) => [...events, {
            title: "Available",
            start: new Date(event.date + " " + slot.from_time),
            end: new Date(event.date + " " + slot.to_time),
            meetings: slot.meetings
          }])
        }
      });
    })

  }, [userState.schedules])


  useEffect(() => {
    tour.start();
  }, [])





  return (
    <>
      <section className="dashboard service-area service-area--l1 border-top border-default-color-2 bg-default-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">



            <div className="col-md-6 col-sm-6 col-xs-12 headingdv1">
              <h3 className='title1'>Hello {userState.user.social.name}, Here is your schedule.</h3>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 text-end headingdv1">
              <Link className='btn btn--lg btn-primary text-white h-70 mb-2 add-schedule-button' to="/add-schedule">Add Schedule</Link>
            </div>

            <div className='col-12'>
              <Calendar
                className='big_calendar_dv'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={(event) => {
                  setSelectedEvent(event);
                  console.log(event);
                  if (event.meetings.length > 0) {
                    setIsMeetingDetailsModalOpen(true);
                  }
                }}
              />
            </div>

          </div>
        </div>
      </section>

      <MeetingDetailModal
        isMeetingDetailsModalOpen={isMeetingDetailsModalOpen}
        handleCloseIsMeetingDetailsModalOpen={handleCloseIsMeetingDetailsModalOpen}
        selectedEvent={selectedEvent}
      />
    </>
  )
}

export default Dashboard