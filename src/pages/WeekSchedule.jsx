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

    // dev data ... note to self... the following component only accepts format day dat 11 1212
    useEffect(() => {
        const drivers = {
            AdrianHutchinson: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaul: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonTwo: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulTwo: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonThree: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulThree: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonFour: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulFour: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonTwoFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulTwoFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonThreeFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulThreeFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
                ]
            },
            AdrianHutchinsonFourFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020'
                ]
            },
            AnderewPaulFourFive: {
                booked: [
                    'sat apr 11 2020',
                    'sun apr 12 2020',
                    'mon apr 13 2020'
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

    var content;
    if (drivers) {
        content = (
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
    } else {
        content = ''
    }

    return (
        <>
            {content}
        </>
    )
}

export default WeekSchedule