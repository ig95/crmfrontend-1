import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import DivWeek from '../components/DivWeek'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ schedule, setSchedule ] = useState(null)
    const [ loadingGate, setLoadingGate ] = useState(0)
    const [ theDateRandom, setTheDateRandom ] = useState(new Date())

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

    // handle selecting different day
    const handleClick = (e) => {
        let myString = e.target.innerText.slice(0, 15)
        setTheDateRandom(new Date(myString))
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

        // map todays booked drivers
        var chart
        var todaysDrivers
        if (schedule) {
            var randomDate 
            randomDate = theDateRandom.toDateString()
            let localNum = 0
            let dbs2Drivers = 0
            let dex2Drivers = 0
            let dsn1Drivers = 0
            schedule.forEach( (ele, id) => {
                if (ele.date === randomDate.toString()) {
                    localNum++
                    if (ele.location === 'DBS2') {
                        dbs2Drivers++
                    } else if (ele.loaction === 'DEX2') {
                        dex2Drivers++
                    } else {
                        dsn1Drivers++
                    }
                }
            })
            todaysDrivers = (
                <h3>Drivers Today: {localNum}</h3>
            )
            var segment1 
            var segment2 
            if (dbs2Drivers || dex2Drivers || dsn1Drivers) {
                console.log('dbs2: ', dbs2Drivers, 'dex2: ', dex2Drivers, 'dsn1: ', dsn1Drivers)
                let theSum = dbs2Drivers + dex2Drivers + dsn1Drivers
    
                if (dbs2Drivers === 0 && dsn1Drivers === 0 && dex2Drivers !== 0 ) {
                    segment1 = 0
                    segment2 = 0
                }
                // dbs2
                if (dbs2Drivers !== 0) {
                    if (dbs2Drivers/theSum === 1) {
                        segment1 = 360
                        segment2 = 0
                    }
                    segment1 = (dbs2Drivers/theSum) * 100
                } else {
                    segment1 = 0
                }
    
                // dsn1
                if (dsn1Drivers !== 0) {
                    if (dex2Drivers === 0) {
                        segment2 = 100
                    } else if (dsn1Drivers/theSum === 1) {
                        segment2 = 360
                        segment1 = 0
                    } else {
                        segment2 = (dsn1Drivers/theSum) * 100
                    }
                } else {
                    segment2 = 0
                }
            }
            if (segment1 || segment2) {
                chart = (
                    <div className='chart_overall'>
                        <div className='names_label'>
                            <h3>DBS2 <div className='colordivsblue'></div></h3>
                            <h3>DSN1 <div className='colordivsgreen'></div></h3>
                            <h3>DEX2 <div className='colordivsyellow'></div></h3>
                        </div>
                        <div 
                            className="pie" 
                            style={{
                                backgroundImage:
                                    `conic-Gradient(blue ${3.6 * segment1}deg, green 0 ${3.6 * segment2}deg, yellow 0)`
                            }}>
                        </div>
                    </div>
                )
            }
        }

    var content
    if (loadingGate === 2) {
        content = (
            <>
                <div className='home_content_home'>
                <NavigationBar title='Home'/>
                    <div className='main_content'>
                        <div className='calandar_container'>
                            <div>
                                <div className='home_details'>
                                    <h2>Welcome {props.user_name}</h2>
                                    {todaysDrivers}
                                </div>
                                <div className='drop_down_bar_container'>
                                    <Dropdown 
                                        options={options} 
                                        onChange={onSelect} 
                                        value={selectedCity} 
                                        placeholder="Select an option" 
                                        className='drop_down_bar'
                                    />
                                </div>
                            </div>
                            <div className='canvas_chart'>
                                {chart}
                            </div>
                        </div>
                    <div className='scheduling_four_week_overlay' onClick={handleClick}>
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