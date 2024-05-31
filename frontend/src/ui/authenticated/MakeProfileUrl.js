import { Container, Grid, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../context/User/context';


const MakeProfileUrl = () => {

  const { userState, updateProfileUrl } = useContext(UserContext);

  const [profileUrl, setProfileUrl] = useState('');

  const handleContinue = () => {
    updateProfileUrl(profileUrl);
  }

  return (
    <>
      {userState.user.profile_url ? <Navigate to={'/dashboard'} /> : null}












      <section className="service-area service-area--l1 border-top border-default-color-2 bg-default-3">
        <div className="container">
          <div className="row align-items-end justify-content-center">

            <div className="col-lg-7 col-md-12 col-xs-12">



              <div className='make_profile_url_dv1'>
                <div className='make_profile_url_dv2'>
                  <h3>Welcome to Lets Connect</h3>
                  <p>We take the work out of connecting with others so you can accomplish more.</p>
                  <hr />
                  <h4>Create your Lets Connect URL</h4>
                  <p>Choose a URL that describes you or your profile in a concise way. Make it short and easy to remember so you can share links with ease.</p>

                  <div className='mpu_form'>
                    <label htmlFor="user_url">letsconnect.com/</label>
                    <TextField id="user_url" label="Profile Url" variant="outlined" size="small" value={profileUrl} onChange={(e) => { setProfileUrl(e.target.value) }} />
                  </div>
                </div>

                <button className='btn-purple-heart btn btn--lg' onClick={handleContinue}>Continue</button>
              </div>



            </div>

          </div>

        </div>
      </section>




    </>
  )
}

export default MakeProfileUrl