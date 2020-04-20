import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Dashboard = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ topRectangles, setTopRectangles ] = useState([])
    const [ dateSelected, setDateSelected ] = useState('')
    const [ calanderWidget, setCalendarWidget ] = useState([])

    // make this like the daily operations page. show vehicle recommendation in entry column
    // location rota system shows not exceeding 7 days for same person
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

    // search bar function
    const handleChange = (e) => {
        let localArray = []
        drivers.forEach( (ele, id) => {
            if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 3) {
                localArray.push(
                    <h4>{ele.name}</h4>
                )
            }
        })
        setDriverSearchArray(localArray)
    }

    const handleSubmit = (e) => {
        let localDriverId = 0
        let localID = 0
        let mileage = e.target.FinishMileage.value - e.target.StartMileage.value
        drivers.forEach( (ele, id) => {
            if (ele.name === e.target.name.value) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            schedule.forEach( (ele, id) => {
                if (ele.driver_id === `https://pythonicbackend.herokuapp.com/schedule/${localDriverId}/` && ele.date === "") {

                }
            })
        }
        e.preventDefault()
        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        if (localID > 0) {
            postData(`https://pythonicbackend.herokuapp.com/schedule/`, {
                name: e.target.name.value,
                route: e.target.Route.value,
                logIn_time: e.target.LogInTime.value,
                logOut_time: e.target.LogOutTime.value,
                location: selectedCity,
                mileage: mileage,
                parcels: e.target.NoParcelsDelivered.value,
            }).then( response => {
                console.log(response)
            })
        }
    }

    useEffect( () => {
        let localArray = []
        for (let i = 0; i < 16; i++) {
            localArray.push(
                <div className='dashboard_top_rectangles'>
                </div>
            )
        }
        setTopRectangles(localArray)
    }, [])

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e) => {
        setSelectedDate(e)
        setDateSelected(e.toDateString())
        console.log(e.toDateString())
        setCalendarWidget('')
    }

    const handleDateClick = () => {
        console.log('clicked')
        let localArray = [<Calendar 
        onChange={handleCalendarChange}
        value={selectedDate}
        className='calander'
        />]
        setCalendarWidget(localArray)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Dashboard'/>
            <div className='main_content_dashboard'>
                <div className='top_rectangles_container'>
                    {topRectangles}
                </div>    
                <form onSubmit={handleSubmit} className='dashboard_form' autoComplete='on'>
                    <div className='dashboard_form_divs'>
                        <label >Name </label><br />
                            <input className='search_bar' type="text" name='name' onChange={handleChange} />
                            <div>
                                {driverSearchArray}
                            </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Route Type </label><br />
                            <input className='search_bar' type="text" name='RouteType' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Date </label><br />
                            <input className='search_bar' type="text" name='Date' value={dateSelected} onClick={handleDateClick}/>
                            <div>
                                {calanderWidget}
                            </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Log In Time </label><br />
                            <input className='search_bar' type="text" name='LogInTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Log Out Time </label><br />
                            <input className='search_bar' type="text" name='LogOutTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >First Delivery Time </label><br />
                            <input className='search_bar' type="text" name='FirstDeliveryTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Start Mileage </label><br />
                            <input className='search_bar' type="text" name='StartMileage' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Last Drop Time </label><br />
                            <input className='search_bar' type="text" name='LastDropTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Finish Mileage </label><br />
                            <input className='search_bar' type="text" name='FinishMileage' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Vehicle Type </label><br />
                            <input className='search_bar' type="text" name='VehicleType' />
                    </div>         
                    <div className='dashboard_form_divs'>   
                    <label >Automatic BYOD Entry </label><br />
                        <input className='search_bar' type="text" name='AutomaticBYODEntry' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Comment </label><br />
                            <input className='search_bar' type="text" name='Comment' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Route No. </label><br />
                            <input className='search_bar' type="text" name='Route' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Location </label>
                        <Dropdown 
                            options={options} 
                            onChange={onSelect} 
                            value={selectedCity} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                        />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Depart Time </label><br />
                            <input className='search_bar' type="text" name='DepartTime' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >No. Parcels Delivered </label><br />
                            <input className='search_bar' type="text" name='NoParcelsDelivered' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Return Back Time </label><br />
                            <input className='search_bar' type="text" name='ReturnBackTime' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >No. Parcels Brought Back </label><br />
                            <input className='search_bar' type="text" name='NoParcelsBroughtBack' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <label >Owner Vehicle Registration </label><br />
                            <input className='search_bar' type="text" name='OwnerVehicleRegistration' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <input type="submit" value="Submit" className='submit_button'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard