import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavBar'
import DivSingleWeek from '../components/DivSingleWeek'

const WeekSchedule = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ selectedAmount, setSelectedAmount ] = useState('14')
    const [ selectedSunday, setSelectedSunday ] = useState('14')
    const [ mathSunday, setMathSunday ] = useState('14')

    // dev data ... note to self... the following component only accepts format day:date
    // call this location rota, make it color coded by deopt, and trianing different color - 14 days
    useEffect(() => {
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

        getData('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
            setDrivers(response.results)
            getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
                setSchedule(response.results)
            })
        })

        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedSunday(myDate.toDateString())
        setMathSunday(myDate.toDateString())
    }, [])

    // set city
    const handleSelectSunday = (e, city) => {
        setSelectedSunday(city)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 50; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                sundays.push(
                    <li className="menu-item" onClick={(e, city) => handleSelectSunday(e, `${dateInner.toDateString()}`)}><a href="#0">{dateInner.toDateString()}</a></li>
                    )
            }
        }
        return sundays
    }

    // dropdown menu options
    const optionsThree = getSundays()
    
    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
    }

    // set Amount
    const handleSelectAmount = (e, city) => {
        setSelectedAmount(city)
    }

    var content;
    if (drivers) {
        content = (
            <div className='home_content'>
                <NavigationBar title='Location Rota'/>
                <div className='main_content_week_schedule'>
                    <div className='drop_down_bar_container_single_week'>
                        <nav className="menu_smaller">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <nav className="menu_smaller">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedAmount}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectAmount(e, '7')}><a href="#0">7</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectAmount(e, '14')}><a href="#0">14</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <nav className="menu">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedSunday}</a>
                                    <ol className="sub-menu">
                                        {optionsThree}
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className='scheduling_single_week_overlay'>
                        <DivSingleWeek 
                            drivers={drivers} 
                            schedule={schedule}
                            selectedDate={selectedSunday}
                            divAmount={selectedAmount}
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