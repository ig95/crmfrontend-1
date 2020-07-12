/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import NavigationBar from '../components/NavBar'
import '../App.css'

const CreateManager = (props) => {
    var CryptoJS = require("crypto-js");
    const [ submitPressed, setSubmitPressed ] = useState('Submit')


    const handleSubmit = (e) => {
        e.preventDefault();
        // email bit
        async function getData(url = '', data={}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
            });
            return response ? response.json() : console.log('no reponse')
        };

        getData('https://pythonicbackend.herokuapp.com/managers/', {
            name: e.target.name.value,
            email: e.target.email.value,
            station: e.target.station.value
        }).then( response => {
            setSubmitPressed('Created')
        })
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Create Manager' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='main_content_driver_documents'>
                <form onSubmit={handleSubmit} className='create_manager_form'>
                    <label className='labels_create_manager'>Name</label>
                        <input className='inputs_create_manager' type="text" name="name" required/>
                    <label className='labels_create_manager'>Email</label>
                        <input className='inputs_create_manager' type="text" name="email" required/>                   
                    <label className='labels_create_manager'>Station</label>
                        <input className='inputs_create_manager' type="text" name="station" required/>
                    <br />    
                    <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                </form>
            </div>
        </div>
    )
}

export default CreateManager