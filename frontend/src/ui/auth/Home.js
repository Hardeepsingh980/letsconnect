import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from './../../context/User/context';
import ReactTypingEffect from 'react-typing-effect';



const Home = () => {

  const {userState} = useContext(UserContext);

  return (
    <>

      {
        userState.user ? userState.user.profile_url ? <Navigate to={'/dashboard'} /> : <Navigate to={'/profile-url'} /> : null
      }
      



      <div className="welcome-area welcome-area--l1 position-relative bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-8 col-xs-11 order-2 order-lg-1" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
              <div className="welcome-content welcome-content--l1">
                <h1 className="welcome-content__title">
                Less Calls, More Management<br />
                  <span className="text-highlight highlight-text d-inline-block">
                    <ReactTypingEffect
                    speed={200}
                      text={["Schedule Fast.", "Schedule More."]}
                    />
                  </span> 
                </h1>
                <p className="welcome-content__descriptions">We help customers to display their availability to their client, 
                <br className="d-none d-xs-block" />so they can better manage their days.</p>
              </div>
            </div>




            <div className="col-xl-6 col-lg-5 col-md-10 order-1 order-lg-2 position-static">
              <div className="welcome-image-group-wrapper">
                <div className="welcome-image welcome-image--group-01">
                  <img src="image/l1-hero-img-ipad.png" alt="" className="welcome-image__single welcome-image--group-01__main" />
              
                  {/* <div className="welcome-image__single welcome-image--group-01__img-2">
                    <img className="w-100" src="image/l1-hero-img-2.png" alt="" />
                  </div> */}
                  {/* <div className="welcome-image__single welcome-image--group-01__img-3">
                    <img className="w-100" src="image/l1-hero-img-3.png" alt="" />
                  </div> */}
                  <div className="welcome-image__single welcome-image--group-01__img-4">
                    <img className="w-100" src="image/hero-dots.png" alt="" />
                  </div>
                  <div className="welcome-image__single welcome-image--group-01__img-5">
                    <img className="w-100" src="image/l1-hero-shape-1.png" alt="" />
                  </div>
                  <div className="welcome-image__single welcome-image--group-01__img-6">
                    <img className="w-100" src="image/l1-hero-shape-2.png" alt="" />
                  </div>
                  <div className="welcome-image__single welcome-image--group-01__img-7">
                    <img className="w-100" src="image/l1-hero-shape-3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="service-area service-area--l1 border-top border-default-color-2 bg-default">
        <div className="service-shape service-shape--l1">
          <img className="w-100" src="image/services-shape-l1.png" alt="" />
        </div>
        <div className="container">
          <div className="row align-items-end justify-content-center">
            <div className="col-lg-7 col-md-12 col-xs-10">
              <div className="section-title text-center text-md-start" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
                <h2 className="section-title__heading">Your Business needs a <br className="d-none d-xs-block d-lg-none d-xl-block" />better scheduler today</h2>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-xs-10">
              <div className="section-title  text-center text-md-start" data-aos="fade-left" data-aos-duration="500" data-aos-once="true">
                <p className="section-title__description">Create schedule calendar with us and display  <br className="d-none d-xs-block" /> it over your website. 
               A Beautiful and easy to use scheduler for your business.
                </p>
              </div>
            </div>
          </div>
          <div className="service-items">
            <div className="row justify-content-center justify-content-md-start">
              <div className="col-lg-4 col-xs-6 col-10">
                <div className="widget widget--service text-center text-md-start" data-aos="zoom-in" data-aos-duration="300" data-aos-once="true">
                  <div className="widget__icon widget__icon--golden-tainoi mx-auto mx-md-0">
                    <img src="image/athletics.svg" alt="" />
                  </div>
                  <div className="widget__body">
                    <h5 className="widget__heading">Manage Smartly</h5>
                    <p className="widget__description">Stay on top of your meetings list <br className="d-none d-md-block" /> and stay in touch with what’s happening</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-xs-6 col-10">
                <div className="widget widget--service text-center text-md-start" data-aos="zoom-in" data-aos-duration="300" data-aos-once="true">
                  <div className="widget__icon widget__icon--ice-cold mx-auto mx-md-0">
                    <img src="image/archery-target.svg" alt="" />
                  </div>
                  <div className="widget__body">
                    <h5 className="widget__heading">Communicate Fast</h5>
                    <p className="widget__description">We help you communicate with your customers <br className="d-none d-md-block" /> using google meet and google calendar</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-xs-6 col-10">
                <div className="widget widget--service text-center text-md-start" data-aos="zoom-in" data-aos-duration="300" data-aos-once="true">
                  <div className="widget__icon widget__icon--anakiwaap mx-auto mx-md-0">
                    <img src="image/money-coins.svg" alt="" />
                  </div>
                  <div className="widget__body">
                    <h5 className="widget__heading">Influence Easily</h5>
                    <p className="widget__description">Show your schedule and optimise your daily <br className="d-none d-md-block" /> routine to have efficiently more meetings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      


    </>
  )
}

export default Home