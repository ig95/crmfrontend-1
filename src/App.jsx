import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import SingleDay from './pages/SingleDay'
import Depots from './pages/Depots'
import MakeEmployee from './pages/MakeEmployee'
import WeekSchedule from './pages/WeekSchedule'
import Driver from './pages/Driver'
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
  // const [ user, setUser] = useState(null);

  // dev mode
  useEffect( () => {
  //   setUserName('Nicholas Shankland')
  //   setUserEmail('nicholas.m.shankland@gmail.com')
  //   setUserId('1923874-98y')
    async function getData(url = '') {
      const response = await fetch(url, {
          method: 'GET', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return response ? response.json() : console.log('no reponse')
    };

    getData('https://pythonicbackend.herokuapp.com/employees/').then( (response) => {
        setDrivers(response.results)
        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
        })
    })


  },[])

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserId(response.profileObj.googleId)
    setUserEmail(response.profileObj.email)
  }

  var content
  if (userName) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail} user_id={userId} /> } />
        <Route exact path = '/makemployee' render={ () => <MakeEmployee user_name={userName} user_email={userEmail} user_id={userId} /> } />
        <Route exact path = '/weekschedule' render={ () => <WeekSchedule user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/driver/:id/:date' render={ () => <Driver user_name={userName} user_email={userEmail} driver_data={drivers} schedule_data={schedule}/> } />
        <Route exact path = '/depots' render={ () => <Depots user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/singleday/:id/:location' render={ () => <SingleDay user_name={userName} user_email={userEmail}/> } />
      </Router>
    )
  } else {
    content = (
      <div className="app">
        <div className='dark_overlay'>
          <h1 className='welcome_title'>Amazon Delivery Network</h1>
          <GoogleLogin
            clientId='289466662721-f1sj8vu0c15fioleb134nr0oo0ppfk8t.apps.googleusercontent.com'
            buttonText="Login"
            className='googleButton'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default App;
