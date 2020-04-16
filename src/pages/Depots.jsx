import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import DriversList from '../components/DriversList'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Depots = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('Drivers')
    const [ searchContent, setSearchContent ] = useState('')
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ selectedDriverDates, setSelectedDriverDates ] = useState([])


    // fetch call to the db for all data related to drivers and schedule
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

        getData('https://pythonicbackend.herokuapp.com/employees/').then( (response) => {
            setDrivers(response.results)
            getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
                setSchedule(response.results)
            })
        })
    }, [])

    // dropdown menu options
    const options = [
        'Drivers',
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCity(e.value)
    }

    // search bar function
    const handleChange = (e) => {
        setSearchContent(e.target.value)
    }

    // handle the list click
    const handleClick = (e) => {
        let localArray = []
        let currentDate = new Date()
        drivers.forEach((element) => {
            if (element.name === e.target.textContent) {
                schedule.forEach( (ele) => {
                    if (ele.employee_id === `https://pythonicbackend.herokuapp.com/employees/${element.employee_id}/`) {
                        if (new Date(ele.date) >= currentDate) {
                            localArray.push(ele.date)
                            localArray.push(<br />)
                        }
                    }
                })
                setSelectedDriverDates(localArray)
                setSelectedDriver(element)
            }
        })  
    }

    // conditional rendering of main box content
    var driverProfile
    if (selectedDriver) {
        driverProfile = (
            <div className='selected_driver_profile'>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Name</h3>
                    <h3 className='selected_driver_profile_column_item'>{selectedDriver.name}</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Location</h3>
                    <h3 className='selected_driver_profile_column_item'>{selectedDriver.location}</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Vans</h3>
                    <h3 className='selected_driver_profile_column_item'>{selectedDriver.vans}</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Parcels</h3>
                    <h3 className='selected_driver_profile_column_item'>{selectedDriver.parcel}</h3>
                </div>
                <div className='selected_driver_profile_column' id='dates_column'>
                    <h3 className='selected_driver_profile_column_item'>Scheduled Dates</h3>
                    <h3 className='selected_driver_profile_column_item'>{selectedDriverDates}</h3>
                </div>
            </div>
        )
    } else {
        driverProfile = (
            <div className='selected_driver_profile'>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Name</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Location</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Vans</h3>
                </div>
                <div className='selected_driver_profile_column'>
                    <h3 className='selected_driver_profile_column_item'>Parcels</h3>
                </div>
                <div className='selected_driver_profile_column' id='dates_column'>
                    <h3 className='selected_driver_profile_column_item'>Scheduled Dates</h3>
                </div>
            </div>
        )
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
                            className='drop_down_bar_depots'
                        />
                        <input className='search_bar' type="text" name='searchBar' onChange={handleChange}/>
                        <div className='driver_list' onClick={handleClick}>
                            <DriversList 
                                drivers={drivers} 
                                schedule={schedule}
                                selectedCity={selectedCity ? selectedCity : 'Drivers'}
                                searchContentPass={searchContent}
                            />
                        </div>
                    </div>
                </div>
                <div className='scheduling_single_week_overlay'>
                    {/* single person */}
                    <div className='single_person_depots'>
                        {driverProfile}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Depots