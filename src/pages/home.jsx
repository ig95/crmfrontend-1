import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import NavigationBar from '../components/NavBar'
import DivWeek from '../components/DivWeek'
import Dropdown from 'react-dropdown';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';


const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ schedule, setSchedule ] = useState(null)
    const [ loadingGate, setLoadingGate ] = useState(0)

    // grab the data
    useEffect(() => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedDate(myDate)
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
            setLoadingGate(1)
            setTimeout( () => {
                setLoadingGate(2)
            }, 1000)
        })
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

    var content
    if (loadingGate === 2) {
        content = (
            <>
                <div className='home_content_home'>
                <NavigationBar title='Home'/>
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
                        <div className='scheduling_four_week_overlay'>
                            <DivWeek 
                                currentDate={selectedDate}
                                scheduleDates={schedule}
                                selectedLocation={selectedCity ? selectedCity : 'DBS2'}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (loadingGate === 0) {
        content = (
            <div className="header">
                <div className="inner-header flex">
                    <h1>Welcome {props.user_name}... we are loading you content</h1>
                </div>
                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                    </svg>
                </div>
            </div >
        )
    } else {
        content = (
            <div className='fade_class'>
                <div className="header">
                    <div className="inner-header flex">
                        <h1>Welcome {props.user_name}... we are loading you content</h1>
                    </div>
                    <div>
                        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                        </svg>
                    </div>
                </div >
            </div>
        )
    }

    return (
        <>
            {content}
        </>    
    )
}

export default Home