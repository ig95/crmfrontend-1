import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import SingleDay from './pages/SingleDay'
import Dashboard from './pages/Dashboard'
import MakeEmployee from './pages/MakeEmployee'
import WeekSchedule from './pages/WeekSchedule'
import InvoiceWork from './pages/InvoiceWork'
import DriverDocumentation from './pages/DriverDocumentation'
import VehicleChecklist from './pages/VehicleChecklist'
// import axios from 'axios'
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
    setUserName('Nicholas Shankland')
    setUserEmail('nicholas.m.shankland@gmail.com')
    setUserId('1923874-98y')
  },[])

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

    getData('https://pythonicbackend.herokuapp.com/api-token-auth/', {
      username: process.env.REACT_APP_DB_USERNAME,
      password: process.env.REACT_APP_DB_PASSWORD
    }).then( (response) => {
      localStorage.setItem('token', response.token)
    }).then( (response) => {
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
  
      getDataNext('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
        setDrivers(response.results)
        getDataNext('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
          setSchedule(response.results)
        })
      })
    })
  }, [])

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    // setUserName(response.profileObj.givenName)
    // setUserId(response.profileObj.googleId)
    // setUserEmail(response.profileObj.email)

    // email bit... actually works
    // async function getData(url = '', data={}) {
    //   const response = await fetch(url, {
    //       method: 'POST', 
    //       mode: 'cors',
    //       cache: 'no-cache',
    //       credentials: 'same-origin',
    //       headers: {
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //   });
    //   return response ? response.json() : console.log('no reponse')
    // };
    // getData('https://intense-headland-70415.herokuapp.com/mail', {
    //   password: process.env.REACT_APP_INTERCHANGE,
    //   email: response.profileObj.email,
    //   subject: 'Welcome to CRM Amazon',
    //   message: "This is a friendly welcome to the Application! Let me show you around a little. "
    // }).then ( response => {
    //   console.log(response)
    // })
  }

  var content
  if (userName) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail} user_id={userId} /> } />
        <Route exact path = '/makemployee' render={ () => <MakeEmployee user_name={userName} user_email={userEmail} user_id={userId} /> } />
        <Route exact path = '/weekschedule' render={ () => <WeekSchedule user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/driver/:id/:date' render={ () => <Driver user_name={userName} user_email={userEmail} driver_data={drivers} schedule_data={schedule}/> } />
        <Route exact path = '/dashboard' render={ () => <Dashboard user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/vehiclechecklist' render={ () => <VehicleChecklist user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/invoicework' render={ () => <InvoiceWork user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/documentation' render={ () => <DriverDocumentation user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/singleday/:id/:location' render={ () => <SingleDay user_name={userName} user_email={userEmail}/> } />
      </Router>
    )
  } else {
    content = (
      <div className="app">
        <div className='dark_overlay'>
          <h1 className='welcome_title'>Amazon Delivery Network</h1>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
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
