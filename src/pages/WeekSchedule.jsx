import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar'
import Dropdown from 'react-dropdown';
import Calendar from 'react-calendar';
import DivSingleWeek from '../components/DivSingleWeek'
import 'react-dropdown/style.css';
import 'react-calendar/dist/Calendar.css';

var myInterval
const WeekSchedule = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('')

    // dev data ... note to self... the following component only accepts format day dat 11 1212
    useEffect(() => {
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/employees/').then( (response) => {
            setDrivers(response.results)
            getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
                setSchedule(response.results)
            })
        })
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
                <NavBar title='Week Schedule'/>
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
                            schedule={schedule}
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