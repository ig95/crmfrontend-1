import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

var myInterval;
const MakeEmployee = (props) => {
    const [ currentDate, setCurrentDate ] = useState(new Date())

    // handling the clock
    useEffect( () => {
        clearInterval(myInterval)
        const timeFunction = () => {
            let setTime = () => {
                setCurrentDate(new Date())
            }
            myInterval = setInterval( setTime, 1000)
        }
        timeFunction()
    }, [])

    // send form to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        async function postData(url = '', data = {}) {
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

        postData('https://pythonicbackend.herokuapp.com/employees/', {
            name: e.target.name.value, 
            location: e.target.location.value,
            route: e.target.route.value}).then( (response) => {
                console.log(response)
            })

        e.target.submit.value = 'Thanks'
        e.target.name.value = ''
        e.target.location.value = ''
        e.target.route.value = ''
    }

    return (
        <div className='home_content'>
            <div className='nav_bar'>
                <div className='drop_down_hamburger'>
                    <div className='nav_line'></div>
                    <div className='nav_line'></div>
                    <div className='nav_line'></div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                        <div className='link_style'>
                            <Link to="/makemployee" className='links'>Make Employee</Link>
                        </div>
                        <div className='link_style'>
                            <Link to="/weekschedule" className='links'>Week Schedule</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Make New Employee</h1>
                </div>
                <div>
                    <h3 className='nav_current_date'>{currentDate.toDateString()}{' | '}{currentDate.toLocaleTimeString()}</h3>
                </div>
            </div>
            <div className='main_content'>
                <div>
                    <form onSubmit={handleSubmit} className='new_employee_form'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name'/>
                        <label className='labels'>Location</label>
                            <input className='inputs' type="text" name='location'/>
                        <label className='labels'>Route</label>
                            <input className='inputs' type="text" name='route'/>
                        <input type="submit" value="Submit" name='submit' className='submit_button'/>    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee