import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import DriversList from '../components/DriversList'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Depots = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('')

    // fetch call to the db for all data related to drivers and schedule
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
            <NavigationBar title={`${selectedCity}`}/>
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
                </div>
                <div className='scheduling_single_week_overlay'>
                    <DriversList 
                        drivers={drivers} 
                        schedule={schedule}
                        selectedCity={selectedCity ? selectedCity : 'DBS2'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Depots