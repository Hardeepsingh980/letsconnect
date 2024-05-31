import React, { useEffect, useState } from 'react'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Link, useParams } from "react-router-dom";

import axios from 'axios';

import BookSlotModal from './BookSlotModal';
import NotifyMeModal from './NotifyMeModal';
import { APIURL } from '../../const';




const localizer = momentLocalizer(moment)



const CalendarForPublic = ({ match, props }) => {

  console.log('AAAAAS');

  const [events, setEvents] = useState([]);

  const [notFound, setNotFound] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isBookSlotModalOpen, setIsBookSlotModalOpen] = useState(false);

  const [isNotifyMeModalOpen, setIsNotifyMeModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);



  let { profileUrl } = useParams();


  const handleCloseBookSlotModal = () => {
    setIsBookSlotModalOpen(false);
  }

  const handleCloseNotifyMeModal = () => {
    setIsNotifyMeModalOpen(false);
  }


  const url = `${APIURL}/api/public/schedules/${profileUrl}/`;

  const getEvents = async () => {

    try {
      const response = await axios.get(url);
      response.data.map((event) => {
        event.slots.map((slot) => {
          if (!slot.is_available) {
            setEvents((events) => [...events, {
              id: slot.id,
              title: "Busy",
              start: new Date(event.date + " " + slot.from_time),
              end: new Date(event.date + " " + slot.to_time),
            }])
          }
          else {
            setEvents((events) => [...events, {
              id: slot.id,
              title: "Available",
              start: new Date(event.date + " " + slot.from_time),
              end: new Date(event.date + " " + slot.to_time),
            }])
          }
        });
      })

    } catch (error) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    getEvents();
  }, [refresh])

  return (


    notFound ? <>
      <section className='user_not_found'><div className='container'><div className='row'><div className='col-12'><p>User not Found</p></div></div></div></section>
    </>  : <>


        <section className="service-area service-area--l1 border-top border-default-color-2 bg-default-3">
          <div className="container">
            <div className="row align-items-center justify-content-center">





              <div className="col-12">
                <Calendar
                  className='big_calendar_dv'
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  onSelectEvent={(event) => {
                    setSelectedEvent(event);
                    if (event.title === "Available") {
                      setIsBookSlotModalOpen(true);
                    } else {
                      setIsNotifyMeModalOpen(true);
                    }
                  }}
                />
              </div>


            </div>
          </div>
        </section>






        <BookSlotModal
          isBookSlotModalOpen={isBookSlotModalOpen}
          handleCloseBookSlotModal={handleCloseBookSlotModal}
          selectedEvent={selectedEvent}
          setRefresh={setRefresh}

        />

        <NotifyMeModal
          isNotifyMeModalOpen={isNotifyMeModalOpen}
          handleCloseNotifyMeModal={handleCloseNotifyMeModal}
          selectedEvent={selectedEvent}
          setRefresh={setRefresh}
        />

      </>

  )
}

export default CalendarForPublic