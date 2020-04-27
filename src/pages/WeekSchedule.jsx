import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown';
import DropdownTwo from 'react-dropdown';
import DivSingleWeek from '../components/DivSingleWeek'
import 'react-dropdown/style.css';
import 'react-calendar/dist/Calendar.css';

const WeekSchedule = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ selectedAmount, setSelectedAmount ] = useState('14')

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
                            placeholder="Select an option" 
                            className='drop_down_bar'
                        />
                        <DropdownTwo 
                            options={optionsTwo}
                            onChange={onSelectTwo} 
                            value={selectedAmount} 
                            placeholder="Select an option" 
                            className='drop_down_bar'
                        />
                    </div>
                    <div className='scheduling_single_week_overlay'>
                        <DivSingleWeek 
                            drivers={drivers} 
                            schedule={schedule}
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