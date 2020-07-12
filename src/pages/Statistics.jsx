/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import NavigationBar from '../components/NavBar'

//// reports page
const Statistics = (props) => {
    var CryptoJS = require("crypto-js");
    return (
        <div className='home_content'>
            <NavigationBar title='Reports'/>
            <div className='main_content_driver_documents'>
            </div>
        </div>
    )
}

export default Statistics