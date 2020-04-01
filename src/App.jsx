import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import SingleDay from './pages/SingleDay'
import './App.scss';
import Home from './pages/home'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const App = () => {
  // Setting state with the user details retrieved using googles Oauth
  const [ userName, setUserName] = useState('');
  const [ userId, setUserId] = useState('');
  const [ userEmail, setUserEmail] = useState('');
  const [ user, setUser] = useState(null);

  // dev mode
  useEffect( () => {
    setUserName('Nicholas Shankland')
    setUserEmail('nicholas.m.shankland@gmail.com')
  },[])

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    // setUserName(response.profileObj.givenName)
    // setUserId(response.profileObj.googleId)
    // setUserEmail(response.profileObj.email)
      // axios.post('/user/signup', {
      //   name: response.profileObj.name, 
      //   email: response.profileObj.email, 
      //   googleId: response.profileObj.googleId,
      //   team: {},
      //   turn: false
      // }).then(res => {
      //   console.log(`data written`)
      //   setUser(res.data)
      //   console.log(res.data)
      // })
      // awesome comment
  }

  var content
  if (userName) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/singleday/:id/:location' render={ () => <SingleDay user_name={userName} user_email={userEmail}/> } />
      </Router>
    )
  } else {
    content = (
      <div className="app">
        <div className='dark_overlay'>
          <h1 className='welcome_title'>Amazon Delivery Network</h1>
          <GoogleLogin
            clientId="289466662721-f1sj8vu0c15fioleb134nr0oo0ppfk8t.apps.googleusercontent.com"
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
