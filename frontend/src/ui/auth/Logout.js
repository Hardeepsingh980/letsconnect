import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { UserContext } from './../../context/User/context';


const Logout = () => {

  const { userState, signOut } = useContext(UserContext);




  return (
    <>


      <div className="header-btns  ms-auto ms-lg-0  d-sm-flex align-items-center" >
        <button className="header_btn" onClick={() => { signOut(); }}>Logout</button>
      </div>

     <Link className='user_name_icon' to="/profile">{userState.user.social.name[0]}</Link>


    </>
  )
}

export default Logout