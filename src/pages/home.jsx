import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import DivWeek from './DivWeek'
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('')

    // keep the time going
    useEffect( () => {
        setInterval( () => {
            setCurrentDate(new Date())
        }, 1000)
    }, [])

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e) => {
        setSelectedDate(e)
    }

    // dropdown menu options
    const options = [
        'Essex',
        'Bristol',
        'London'
    ]
    const defaultOption = options[0];

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
                    </div>
                </div>
                <div>
                    <h1>Welcome {props.user_name}</h1>
                </div>
                <div>
                    <h3 className='nav_current_date'>{currentDate.toDateString()}{' | '}{currentDate.toLocaleTimeString()}</h3>
                </div>
            </div>
            <div className='main_content'>
                <div className='calandar_container'>
                    <div className='drop_down_bar_container'>
                        <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option" className='drop_down_bar'/>
                    </div>
                    <Calendar 
                        onChange={handleCalendarChange}
                        value={selectedDate}
                        className='calander'
                    />
                </div>
                <div className='scheduling_four_week_overlay'>
                    <DivWeek 
                        currentDate={selectedDate}
                        selectedLocation={selectedCity ? selectedCity : 'Essex'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home