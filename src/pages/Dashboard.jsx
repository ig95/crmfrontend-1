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
    const [ selectedCity, setSelectedCity ] = useState('Bristol - DBS2')
    const [ selectedCityAbbrev, setSelectedCityAbbrev ] = useState('DBS2')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ topRectangles, setTopRectangles ] = useState([])
    const [ dateSelected, setDateSelected ] = useState('')
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ nameValue, setNameValue ] = useState('')
    const [ submittedArray, setSubmittedArray ] = useState([])

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

    // select name
    const handleNameClick = (e, theName) => {
        makeSearchUnderBar('', 10)
        setNameValue(theName)
    }

    const makeSearchUnderBar = (theValue, theLength) => {
        if (theValue !== '' && theLength <= 3) {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar')
        } else {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_none')
        }
    }
    
    // search bar function
    const handleChange = (e) => {
        setNameValue(e.target.value)
        makeSearchUnderBar(e.target.value, nameValue.length)
        let localArray = []
        drivers.forEach( (ele, id) => {
            if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                localArray.push(
                    <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${ele.name}`)}>{ele.name}</h4>
                )
            }
        })
        setDriverSearchArray(localArray)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        let localDriverId = 0
        let localID = 0
        let driverID = ''
        let mileage = e.target.FinishMileage.value - e.target.StartMileage.value
        drivers.forEach( (ele, id) => {
            if (ele.name === e.target.Name.value) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            console.log(schedule, localDriverId)
            schedule.forEach( (ele, id) => {
                if (ele.driver_id === `https://pythonicbackend.herokuapp.com/drivers/${localDriverId}/` && ele.date === dateSelected) {
                    console.log('inside tis if')
                    driverID = ele.driver_id
                    localID = ele.date_id
                }
            })
        }
        async function postData(url = '', data = {}) {
            console.log('posting data')
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
        let myObjectToPut = () => {
            console.log('object being made')
            let myObj = {}
                e.target.Name.value ? myObj['name'] = {nameValue} : console.log(null)
                e.target.Route.value ? myObj['route'] = e.target.Route.value : console.log(null)
                e.target.LogInTime.value ? myObj['logIn_time'] = e.target.LogInTime.value : console.log(null)
                e.target.LogOutTime.value ? myObj['logOut_time'] = e.target.LogOutTime.value : console.log(null) 
                selectedCity ? myObj['location'] = myObj['location'] = selectedCity : console.log(null) 
                mileage ? myObj['mileage'] = mileage : console.log(null) 
                e.target.NoParcelsDelivered.value ? myObj['parcels'] = e.target.NoParcelsDelivered.value : console.log(null)
                myObj['driver_id'] = driverID
            return (
                myObj
            )
        }
        if (localID > 0) {
            postData(`https://pythonicbackend.herokuapp.com/schedule/${localID}/`, myObjectToPut())
            .then( response => {
                let localArray = []
                submittedArray.length > 0 ? localArray = [...submittedArray] : localArray = []
                localArray.push(response)
                console.log('submitted')
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

    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Daily Service'/>
            <div className='main_content_dashboard'>
                <nav class="menu">
                    <ol>
                        <li class="menu-item"><a href="#0">{selectedCity}</a>
                            <ol class="sub-menu">
                                <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'Bristol - DBS2')}><a href="#0">Bristol - DBS2</a></li>
                                <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'Southampton - DSN1')}><a href="#0">Southampton - DSN1</a></li>
                                <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'Exeter - DEX2')}><a href="#0">Exeter - DEX2</a></li>
                            </ol>
                        </li>
                    </ol>
                </nav>
                <div className='top_rectangles_container'>
                    {topRectangles}
                </div>    
                    <h2 className='title_for_dashboard'>
                        Daily Service
                    </h2>
                    <hr />
                <div className='available_in_table'>
                    <p>
                        Available in table: {submittedArray.length}
                    </p>
                </div>    
                <hr />
                <form onSubmit={handleSubmit} className='dashboard_form' autoComplete='off'>
                    <div >
                        <div className='dashboard_form_divs_name'>
                            <div>
                                <label className='dashboard_labels'>Name </label>
                            </div>
                                <input className='input_dashboard_page' type="text" name='Name' value={nameValue} onChange={handleChange} />
                        </div>
                        <div className={`${makeSearchBarVisible}`}>
                            {driverSearchArray}
                        </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Route Type </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='RouteType' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Wave Time </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='LogInTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Log Out Time </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='LogOutTime' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Start Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='StartMileage' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Finish Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='FinishMileage' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Vehicle Type </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='VehicleType' />
                    </div>         
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Route No. </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Route' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                        </div><label className='dashboard_labels'>Location </label>
                        <Dropdown 
                            options={options} 
                            onChange={onSelect} 
                            value={selectedCityAbbrev} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                        />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>No. Parcels Delivered </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='NoParcelsDelivered' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>No. Parcels Brought Back </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='NoParcelsBroughtBack' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Vehicle Registration </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='OwnerVehicleRegistration' />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div className="btn" onClick={handleSubmit}>
                            <svg width="125" height="45">
                                <defs>
                                    <linearGradient id="grad1">
                                        <stop offset="0%" stopColor="#232F3E"/>
                                        <stop offset="100%" stopColor="#232F3E" />
                                    </linearGradient>
                                </defs>
                                <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                            </svg>
                            <span className='span_in_Button_add'>Submit</span>  
                        </div>  
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels_dashboard'>Comment </label>
                        </div>
                            <textarea className='dashboard_text_field' type="text" name='Comment' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard