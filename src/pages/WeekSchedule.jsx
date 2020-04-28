import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown';
import DropdownTwo from 'react-dropdown';
import DropdownThree from 'react-dropdown';
import DivSingleWeek from '../components/DivSingleWeek'
import 'react-dropdown/style.css';
import 'react-calendar/dist/Calendar.css';

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

    // dropdown menu options
    const optionsTwo = [
        '7',
        '14'
    ]

    // dropdown menu selection function
    const onSelectTwo = (e) => {
        setSelectedAmount(e.value)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 50; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                sundays.push(dateInner.toDateString())
            }
        }
        return sundays
    }

    // dropdown menu options
    const optionsThree = getSundays()

    // dropdown menu selection function
    const onSelectThree = (e) => {
        setSelectedSunday(e.value)
    }

    var content;
    if (drivers) {
        content = (
            <div className='home_content'>
                <NavigationBar title='Location Rota'/>
                <div className='main_content_week_schedule'>
                    <div className='drop_down_bar_container_single_week'>
                        <Dropdown 
                            options={options}
                            onChange={onSelect} 
                            value={selectedCity} 
                            className='drop_down_bar'
                        />
                        <DropdownTwo 
                            options={optionsTwo}
                            onChange={onSelectTwo} 
                            value={selectedAmount} 
                            className='drop_down_bar'
                        />
                        <DropdownThree
                            options={optionsThree}
                            onChange={onSelectThree} 
                            value={selectedSunday} 
                            className='drop_down_bar'
                        />
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