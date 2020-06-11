import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import SingleDay from './pages/SingleDay'
import Dashboard from './pages/Dashboard'
import MakeEmployee from './pages/MakeEmployee'
import WeekSchedule from './pages/WeekSchedule'
import InvoiceWork from './pages/InvoiceWork'
import Statistics from './pages/Statistics'
import HomeTwo from './pages/HomeTwo'
import DriverDocuments from './pages/DriverDocuments'
import Driver from './pages/Driver'
import Forms from './pages/Forms'
import DocumentsForVerification from './pages/DocumentsForVerification'
import DriverComplianceCheck from './pages/DriverComplianceCheck'
import CreateManager from './pages/CreateManager'
import Compliance from './pages/Compliance'
import RentalVanTracker from './pages/RentalVanTracker'
import CompanyVans from './pages/CompanyVans'
import logo from './images/logoMinified.png'
import './App.scss';
import Home from './pages/home'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const App = () => {
  // Setting state with the user details retrieved using googles Oauth
  const [ userName, setUserName] = useState('')
  const [ userId, setUserId] = useState('')
  const [ userEmail, setUserEmail] = useState('')
  const [ drivers, setDrivers] = useState(null)
  const [ schedule, setSchedule] = useState(null)
  const [ station, setStation ] = useState('')
  const [ userFound, setUserFound ] = useState('')
  // const [ user, setUser] = useState(null);

  // dev mode
  // useEffect( () => {
  //   setUserName('Nicholas Shankland')
  //   setUserEmail('nicholas.m.shankland@gmail.com')
  //   setUserId('1923874-98y')
  //   setStation('DBS2')
  // },[])

  useEffect( () => {
    async function getData(url = '', data={}) {
      const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      return response ? response.json() : console.log('no reponse')
    };

    getData(process.env.REACT_APP_AUTH, {
      username: process.env.REACT_APP_DB_USERNAME,
      password: process.env.REACT_APP_DB_PASSWORD
    }).then( (response) => {
      localStorage.setItem('token', response.token)
    }).then( (response) => {
      async function getDataNext(url = process.env.REACT_APP_AUTH) {
        const response = await fetch(url, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
        return response ? response.json() : console.log('no reponse')
      };
  
      getDataNext('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
        setDrivers(response.results)
        getDataNext('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
          setSchedule(response.results)
        })
      })
    })
  }, [])

  // handles writting data to database and recieving google data
  const responseGoogle = (responseGoog) => {
    async function getDataNext(url = '') {
      const response = await fetch(url, {
          method: 'GET', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${localStorage.getItem('token')}`
          }
      });
      return response ? response.json() : console.log('no reponse')
    };

    getDataNext('https://pythonicbackend.herokuapp.com/managers/').then( response => {
      let localVar = 0
      response.results.forEach( ele => {
        if (responseGoog.profileObj.email === ele.email || responseGoog.profileObj.email === process.env.REACT_APP_EMAIL_VERIFICATION || responseGoog.profileObj.email === process.env.REACT_APP_SUPER_USER) {
          setUserName(responseGoog.profileObj.givenName)
          setUserId(responseGoog.profileObj.googleId)
          setUserEmail(responseGoog.profileObj.email)
          setStation(ele.station)
          localVar = 1
        }
      })
      if (localVar === 0) {
        setUserFound('Login not found. Please contact site administrator')
      }
    })
  }

  var content
  if (userEmail === (process.env.REACT_APP_EMAIL_VERIFICATION || process.env.REACT_APP_SUPER_USER)) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail} user_id={userId} superUser={true}/> } />
        <Route exact path = '/manager' render={ () => <CreateManager user_name={userName} user_email={userEmail} user_id={userId}  superUser={true}/> } />
        <Route exact path = '/home' render={ () => <HomeTwo user_name={userName} user_email={userEmail} user_id={userId} superUser={true} />  } />
        <Route exact path = '/makemployee' render={ () => <MakeEmployee user_name={userName} user_email={userEmail} user_id={userId} superUser={true}/> } />
        <Route exact path = '/weekschedule' render={ () => <WeekSchedule user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/driver/:id/:date' render={ () => <Driver user_name={userName} user_email={userEmail} driver_data={drivers} schedule_data={schedule} superUser={true}/> } />
        <Route exact path = '/dashboard' render={ () => <Dashboard user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/statistics' render={ () => <Statistics user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/forms' render={ () => <Forms user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/driverdocuments' render={ () => <DriverDocuments user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/documentsforverification' render={ () => <DocumentsForVerification user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/companyvans' render={ () => <CompanyVans user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/rentalvantracker' render={ () => <RentalVanTracker user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/compliance' render={ () => <Compliance user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/drivercompliancecheck' render={ () => <DriverComplianceCheck user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/invoicework' render={ () => <InvoiceWork user_name={userName} user_email={userEmail}superUser={true} /> } />
        <Route exact path = '/singleday/:id/:location' render={ () => <SingleDay user_name={userName} user_email={userEmail} superUser={true}/> } />
      </Router>
    )
  } else if (userEmail) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail} user_id={userId} station={station} /> } />
        <Route exact path = '/home' render={ () => <HomeTwo user_name={userName} user_email={userEmail} user_id={userId} station={station}/> } />
        <Route exact path = '/makemployee' render={ () => <MakeEmployee user_name={userName} user_email={userEmail} user_id={userId} station={station}/> } />
        <Route exact path = '/weekschedule' render={ () => <WeekSchedule user_name={userName} user_email={userEmail} station={station}/> } />
        <Route exact path = '/driver/:id/:date' render={ () => <Driver user_name={userName} user_email={userEmail} driver_data={drivers} schedule_data={schedule} station={station}/> } />
        <Route exact path = '/dashboard' render={ () => <Dashboard user_name={userName} user_email={userEmail} station={station}/> } />
        <Route exact path = '/statistics' render={ () => <Statistics user_name={userName} user_email={userEmail} station={station}/> } />
        <Route exact path = '/forms' render={ () => <Forms user_name={userName} user_email={userEmail} station={station}/> } />
        <Route exact path = '/driverdocuments' render={ () => <DriverDocuments user_name={userName} user_email={userEmail} /> } />
        <Route exact path = '/documentsforverification' render={ () => <DocumentsForVerification user_name={userName} user_email={userEmail} /> } />
        <Route exact path = '/companyvans' render={ () => <CompanyVans user_name={userName} user_email={userEmail} /> } />
        <Route exact path = '/compliance' render={ () => <Compliance user_name={userName} user_email={userEmail} /> } />
        <Route exact path = '/rentalvantracker' render={ () => <RentalVanTracker user_name={userName} user_email={userEmail} superUser={true}/> } />
        <Route exact path = '/drivercompliancecheck' render={ () => <DriverComplianceCheck user_name={userName} user_email={userEmail} /> } />
        <Route exact path = '/invoicework' render={ () => <InvoiceWork user_name={userName} user_email={userEmail} station={station}/> } />
        <Route exact path = '/singleday/:id/:location' render={ () => <SingleDay user_name={userName} user_email={userEmail} station={station}/> } />
      </Router>
    )
  } else if (userFound) {
    content = (
      <div className="header">
          <div className="inner-header flex">
              <img src={logo} alt="Logo" className='welcome_screen_logo'/>
              <div className='google_log_in_container'>
                {userFound}
              </div>
          </div>
          <div>
              <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(120, 209, 212, .8)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(38, 135, 199, .6)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(120, 209, 212, .4)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(38, 135, 199)" />
              </g>
              </svg>
          </div>
          <div className='waves-background'></div>
      </div >
    )
  } else {
    content = (
      <div className="header">
          <div className="inner-header flex">
              <img src={logo} alt="Logo" className='welcome_screen_logo'/>
              <div className='google_log_in_container'>
                <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_ID}
                  render={renderProps => (
                    <button className='front_page_button' onClick={renderProps.onClick}>
                      <span className='span_in_front_page_button'>Login</span> 
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
          </div>
          <div>
              <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(120, 209, 212, .8)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(38, 135, 199, .6)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(120, 209, 212, .4)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(38, 135, 199)" />
              </g>
              </svg>
          </div>
          <div className='waves-background'></div>
      </div >
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default App;
