import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Dashboard = () => {
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ topRectangles, setTopRectangles ] = useState([])

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
        e.preventDefault()
        console.log(schedule)
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

    return (
        <div className='home_content'>
            <NavigationBar title='Dashboard'/>
            <div className='main_content_dashboard'>
                <div className='top_rectangles_container'>
                    {topRectangles}
                </div>    
                <form onSubmit={handleSubmit} className='dashboard_form'>
                    <div className='dashboard_form_divs'>
                        <label >DA </label><br />
                            <input className='search_bar' type="text" name='searchBar' onChange={handleChange} />
                            <div>
                                {driverSearchArray}
                            </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <label >Route Type </label><br />
                            <input className='search_bar' type="text" name='RouteType' />
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
                        <label >No Parcels Delivered </label><br />
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
                </form>
            </div>
        </div>
    )
}

export default Dashboard