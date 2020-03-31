import React, { useState } from 'react';
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

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserId(response.profileObj.googleId)
    setUserEmail(response.profileObj.email)
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
  }

  var content
  if (userName) {
    content = (
      <Router>
        <Route exact path = '/' render={ () => <Home user_name={userName} user_email={userEmail}/> } />
        <Route exact path = '/singleday/:id' render={ () => <SingleDay user_name={userName} user_email={userEmail}/> } />
      </Router>
    )
  } else {
    content = (
      <div className="app">
        <div className='dark_overlay'>
          <h1 className='welcome_title'>Amazon Delivery Network</h1>
          <GoogleLogin
            clientId="801108272625-cbbc8i5j8v8s423p95mkte842cdp7d32.apps.googleusercontent.com"
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
