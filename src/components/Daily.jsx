/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

// show route type and summary another one
const Daily = () => {
    var CryptoJS = require("crypto-js");
    return (
        <div className='details_component_overall'> 
            <form className='details_form'>
                <label>Name</label>
                    <input type="text" name='name'/>
                <label>Route</label>
                    <input type="text" name='route'/>
                <label>Mileage</label>
                    <input type="text" name='mileage'/>
                <label>Parcel</label>
                    <input type="text" name='parcel'/>
                <label>Log In</label>
                    <input type="text" name='logIn_time'/>
                <label>Log Out</label>
                    <input type="text" name='logOut_time'/>
                <label>TORH</label>
                    <input type="text" name='torh'/>
                <label>SUP</label>
                    <input type="text" name='SUP'/>
            </form>
        </div>
    )
}

export default Daily