import { Container, Grid, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

import { UserContext } from '../../context/User/context';

import QRCode from "react-qr-code";




const Profile = () => {

  const { userState, updateProfileUrl } = useContext(UserContext);

  const [name, setName] = useState(userState.user.social.name)
  const [profileUrl, setProfileUrl] = useState(userState.user.profile_url)
  const [email, setEmail] = useState(userState.user.social.email)
  const [profile_pic, setProfilePic] = useState(userState.user.social.picture)





  return (
    <>



      <section className="service-area service-area--l1 border-top border-default-color-2 bg-default-3">
        <div className="container">
          <div className="row align-items-center justify-content-center ">



            <div className="col-lg-10 col-md-10 col-xs-12 headingdv1">
              <h3 class="title1">My Profile</h3>
            </div>
            <div className="col-lg-10 col-md-10 col-xs-12">
              <div className='add_schedule_dv'>
                <div className="row">



                  <div className="col-lg-6 col-md-6 col-xs-12 form_style2">
                    <TextField id="name" label="Name" variant="outlined" disabled value={name} onChange={(e) => {
                      setName(e.target.value)
                    }} />
                  </div>

                  <div className="col-lg-6 col-md-6 col-xs-12 form_style2">
                    <TextField id="email" label="Email Address" variant="outlined" disabled value={email} onChange={(e) => {
                      setEmail(e.target.value)
                    }} />
                  </div>

                  <div className="col-lg-6 col-md-6 col-xs-12 form_style2">
                    <TextField id="profile_url" label="Profile URL" variant="outlined" value={profileUrl} onChange={(e) => {
                      setProfileUrl(e.target.value)
                    }} />
                  </div>

                  <div className="col-lg-6 col-md-6 col-xs-12 form_style2">
                    <img className='user_image' src={userState.user.social.picture} alt="QR Code" />
                  </div>

                  <div className="col-12 form_style2 text-center">
                    <button className='btn btn--lg btn-primary text-white h-70 mb-2' onClick={() => { updateProfileUrl(profileUrl); }} >Submit</button>
                  </div>


                  <div className='col-12'>
                    <div className='dv1_8546513'>
                      <div className="row align-items-center justify-content-center">
                        <div className="col-lg-4 col-md-6 col-xs-12 form_style2 text-center">
                          <QRCode value={`localhost:8000/${profileUrl}`} height="100px" width="100px" />
                          <button className='btn btn--sm btn-primary text-white h-70 mt-2 click_to_download'>Click to download</button>
                        </div>


                        <div className="col-lg-8 col-md-6 col-xs-12 form_style2 user_iframe">
                          <p>To Embed our scheduler calender on your website, copy and paste the following code into your website.</p>
                          <textarea>
                            {`<iframe src='https://letsconnect.com/iframe/${profileUrl}' width="100%" height="600px" frameborder="0"></iframe>`}
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Profile