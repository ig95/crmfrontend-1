/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import NavigationBar from '../components/NavBar'

const Reports = (props) => {
    var CryptoJS = require("crypto-js");
    return ( 
        <div className='home_content'>
            <NavigationBar title='Reports' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='main_content_driver_documents'>
            </div>
        </div>
    )
}

export default Reports