import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import Calendar from 'react-calendar';
import DivSingleWeek from '../components/DivSingleWeek'
import 'react-dropdown/style.css';
import 'react-calendar/dist/Calendar.css';

var myInterval
const WeekSchedule = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('')

    // dev data
    useEffect(() => {
        const drivers = {
            AdrianHutchinson: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaul: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonTwo: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulTwo: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonThree: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulThree: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonFour: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulFour: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonTwoFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulTwoFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonThreeFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulThreeFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            },
            AdrianHutchinsonFourFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020'
                ]
            },
            AnderewPaulFourFive: {
                booked: [
                    'satapr112020',
                    'sunapr122020',
                    'monapr132020'
                ]
            }
        }
        setDrivers(drivers)
    }, [])
    
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

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e) => {
        setSelectedDate(e)
    }

    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCity(e.value)
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
                            <Link to="/weekschedule" className='links'>Week Schedule</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Week Schedule for: {selectedCity}</h1>
                </div>
                <div>
                    <h3 className='nav_current_date'>{currentDate.toDateString()} {' | '}{currentDate.toLocaleTimeString()}</h3>
                </div>
            </div>
            <div className='main_content'>
                <div className='calandar_container'>
                    <div className='drop_down_bar_container'>
                        <Dropdown 
                            options={options}
                            onChange={onSelect} 
                            value={selectedCity} 
                            placeholder="Select an option" 
                            className='drop_down_bar'
                        />
                    </div>
                    <Calendar 
                        onChange={handleCalendarChange}
                        value={selectedDate}
                        className='calander'
                    />
                </div>
                <div className='scheduling_single_week_overlay'>
                    <DivSingleWeek 
                        drivers={drivers} 
                        selectedDate={selectedDate}
                        selectedCity={selectedCity ? selectedCity : 'DBS2'}
                    />
                </div>
            </div>
        </div>
    )
}

export default WeekSchedule