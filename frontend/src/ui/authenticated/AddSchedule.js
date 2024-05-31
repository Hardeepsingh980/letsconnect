













import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Container, Grid, TextareaAutosize } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import AddSchedulePopup from './AddSchedulePopup';

import { UserContext } from './../../context/User/context';
import { Navigate } from 'react-router-dom';

import { useAlert } from 'react-alert'


function AddSchedule() {

  const alert = useAlert()

  const { userState, addSchedule } = useContext(UserContext);

  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const [isAddSchedulePopup, setAddSchedulePopup] = useState(false);
  const handleOpenAddSchedulePopup = () => setAddSchedulePopup(true);
  const handleCloseAddSchedulePopup = () => setAddSchedulePopup(false);

  const [slots, setSlots] = useState([]);

  const [from_date, setFromDate] = useState();
  const [to_date, setToDate] = useState();


  const handleChange = (newValue) => {
    setAddSchedulePopup(newValue);
  };


  const handleClick = async () => {
    await addSchedule({
      from_date: dayjs(from_date).format('YYYY-MM-DD'),
      to_date: dayjs(to_date).format('YYYY-MM-DD'),
      slots: slots
    });
    alert.success('Your scheduled has been added');
    return <Navigate to={'/dashboard'} />
  }




  return (
    <>





      <section className="service-area service-area--l1 border-top border-default-color-2 bg-default-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">

            <div className="col-lg-10 col-md-10 col-xs-12 headingdv1">
              <h3 class="title1">Add Schedule</h3>
            </div>

            <div className="col-lg-10 col-md-10 col-xs-12">
              <div className='add_schedule_dv'>
                <div className="row">




                  <div class="col-md-4 col-sm-6 col-xs-12 dv_add_schedule_form1">
                    <DesktopDatePicker
                      label="From"
                      value={from_date}
                      onChange={(newValue) => {
                        setFromDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>

                  <div class="col-md-4 col-sm-6 col-xs-12 dv_add_schedule_form1">
                    <DesktopDatePicker
                      label="To"
                      value={to_date}
                      onChange={(newValue) => {
                        setToDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>





                  <div class="col-md-4 col-sm-6 col-xs-12 dv_add_schedule_Slot1 text-end">
                    <button className='btn btn--lg btn-primary text-white h-70 mb-2' onClick={handleOpenAddSchedulePopup}>Add</button>
                  </div>



                  <div class="col-md-12">
                    <div className='add_schedule_table_dv'>
                      <table cellPadding="0" cellSpacing="0" className='add_schedule_table'>
                        <thead>
                          <tr>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Max attendie alloweds</th>
                            <th>Meeting Agenda</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            slots.map((slot, index) => {
                              return (
                                <tr key={index}>
                                  <td>{slot.from_time}</td>
                                  <td>{slot.to_time}</td>
                                  <td>{slot.max_people}</td>
                                  <td>{slot.meeting_desctiption}</td>
                                </tr>
                              )
                            })
                          }
                          {slots.length === 0 && <tr align='center' colSpan="7"><td colSpan="4">No Schedule Added Yet</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>



                  <div class="col-md-12 text-center">
                    <button className='btn btn--lg btn-primary text-white h-70 mb-2' onClick={handleClick}>Submit</button>
                  </div>




                </div>
              </div>
            </div>


          </div>
        </div>
      </section>


      <AddSchedulePopup isAddSchedulePopup={isAddSchedulePopup} handleCloseAddSchedulePopup={handleCloseAddSchedulePopup} setSlots={setSlots} slots={slots} />



    </>
  );
}






export default AddSchedule;