import React, { useState, useEffect} from 'react'
import NavBar from '../components/NavBar'

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
            route: e.target.route.value,
            logIn_time: e.target.logIn_time.value,
            logOut_time: e.target.logOut_time.value,
        }).then( (response) => {
                console.log(response)
        })

        e.target.submit.value = 'Thanks'
        e.target.name.value = ''
        e.target.location.value = ''
        e.target.route.value = ''
    }

    let myDateTime = new Date()
    let hours = myDateTime.getHours()
    let minutes = myDateTime.getMinutes()

    let timeEntry = `${hours}:${minutes}`

    return (
        <div className='home_content'>
            <NavBar title='Create Driver'/>
            <div className='main_content'>
                <div>
                    <form onSubmit={handleSubmit} className='new_employee_form'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name'/>
                        <label className='labels'>Location</label>
                            <input className='inputs' type="text" name='location'/>
                        <label className='labels'>Route</label>
                            <input className='inputs' type="text" name='route'/>
                        <label className='labels'>Log in time</label>
                            <input className='inputs' type="text" value={timeEntry} name='logIn_time'/>
                        <label className='labels'>Log out time</label>
                            <input className='inputs' type="text" value={timeEntry} name='logOut_time'/>
                        <input type="submit" value="Submit" name='submit' className='submit_button'/>    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee