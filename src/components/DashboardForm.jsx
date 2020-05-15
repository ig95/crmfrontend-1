import React, { useState, useEffect } from 'react'
import Dashboard from '../pages/Dashboard'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const DashboardForm = (props) => {
    const [ selectedCity, setSelectedCity ] = useState('Bristol - DBS2')
    const [ selectedCityAbbrev, setSelectedCityAbbrev ] = useState('DBS2')
    const [ dateSelected, setDateSelected ] = useState('')
    const [ nameValue, setNameValue ] = useState('')
    const [ submittedArray, setSubmittedArray ] = useState([])
    const [ selectedRouteType, setSelectedRouteType ] = useState('')
    const [ otherSelection, setOtherSelection] = useState(null)
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ nameState, setNameState ] = useState('')
    const [ waveTime, setWaveTime ] = useState('')
    const [ startMileage, setStartMileage ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
    const [ parcelsNotDelivered, setParcelsNotDelivered ] = useState('')
    const [ logOutTime, setLogOutTime ] = useState('')
    const [ finishMileage, setFinishMileage ] = useState('')
    const [ routeNumber, setRouteNumber ] = useState('')
    const [ parcelsDelivered, setParcelsDelivered ] = useState('')
    const [ vehicleRegistaration, setVehicleRegistaration ] = useState('')
    
    // list for routes
    const onSelectTwo = (e) => {
        setSelectedRouteType(e.value)
    }

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCityAbbrev(e.value)
    }

    // submit
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        let localDriverId = 0
        let localID = 0
        let driverID = ''
        let mileage = e.target.FinishMileage.value - e.target.StartMileage.value
        props.data.drivers.forEach( (ele, id) => {
            if (ele.name === e.target.Name.value) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            props.data.dates.forEach( (ele, id) => {
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
                selectedRouteType ? myObj['route'] = selectedRouteType : console.log(null)
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

    // submit for state form
    const handleSubmitState = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        let localDriverId = 0
        let localID = 0
        let driverID = ''
        let mileage = e.target.FinishMileage.value - e.target.StartMileage.value
        props.data.drivers.forEach( (ele, id) => {
            if (ele.name === e.target.Name.value) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            props.data.dates.forEach( (ele, id) => {
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
                selectedRouteType ? myObj['route'] = selectedRouteType : console.log(null)
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

    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown for route menu
    const optionsTwo = [
        'Full Standard Van Route',
        'Full Large Van Route',
        'Transportation Route',
        'MFN Route',
        'Missort Route',
        'Classroom Training',
        'Ride Along',
        'Sweeper'
    ]

    // select name
    const handleNameClick = (e, theName) => {
        makeSearchUnderBar('', 10)
        setNameValue(theName)
    }

    // make the div under the name search bar
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
        props.data.drivers.forEach( (ele, id) => {
            if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                localArray.push(
                    <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${ele.name}`)}>{ele.name}</h4>
                )
            }
        })
        setDriverSearchArray(localArray)
    }
    
    // map props to state
    useEffect( () => {
        if (props.otherSelection) {
            console.log(props.otherSelection)
            setOtherSelection(props.otherSelection)
            setNameState(props.otherSelection.driver_id)
            setWaveTime(props.otherSelection.logIn_time)
            setStartMileage('0')
            setVehicleType('Not Owned')
            setParcelsNotDelivered(props.otherSelection.parcel)
            setLogOutTime(props.otherSelection.logOut_time)
            setFinishMileage('0')
            setRouteNumber(props.otherSelection.route)
            setParcelsDelivered(props.otherSelection.parcel)
            setVehicleRegistaration('0')
        }
    }, [props])

    // handle the input changes
    const handleChangeInputs = (e) => {
        console.log(e.target.value)
        let x = 0
        e.target.name === 'Name' ? setNameState(e.target.value) : x = x + 1
        e.target.name === 'LogInTime' ? setWaveTime(e.target.value) : x = x + 1
        e.target.name === 'LogOutTime' ? setLogOutTime(e.target.value) : x = x + 1
        e.target.name === 'StartMileage' ? setStartMileage(e.target.value) : x = x + 1
        e.target.name === 'FinishMileage' ? setFinishMileage(e.target.value) : x = x + 1
        e.target.name === 'VehicleType' ? setVehicleType(e.target.value) : x = x + 1
        e.target.name === 'Route' ? setRouteNumber(e.target.value) : x = x + 1
        e.target.name === 'ParcelsDelivered' ? setParcelsDelivered(e.target.value) : x = x + 1
        e.target.name === 'ParcelsNotDelivered' ? setParcelsNotDelivered(e.target.value) : x = x + 1
        e.target.name === 'vehicleRegistaration' ? setVehicleRegistaration(e.target.value) : x = x + 1
    }

    var myForm
    if (otherSelection) {
        myForm = (
            <form onSubmit={handleSubmitState}  autoComplete='off'>
                <div className='dashboard_form'>
                    <div className='dashboard_form_divs_name'>
                        <div>
                            <label className='dashboard_labels'>Name</label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Name' value={nameState} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Route Type</label>
                        </div>
                        <Dropdown 
                            options={optionsTwo} 
                            onChange={onSelectTwo} 
                            value={selectedRouteType} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                        />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Wave Time </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='LogInTime' value={waveTime} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Log Out Time </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='LogOutTime' value={logOutTime} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Start Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='StartMileage' value={startMileage} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Finish Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='FinishMileage' value={finishMileage} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Vehicle Type </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='VehicleType' value={vehicleType} onChange={handleChangeInputs}/>
                    </div>         
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Route No. </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Route' value={routeNumber} onChange={handleChangeInputs}/>
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
                            <input className='input_dashboard_page' type="text" name='ParcelsDelivered' value={parcelsDelivered} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Parcels not Delivered </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='ParcelsNotDelivered' value={parcelsNotDelivered} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Vehicle Registration </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='vehicleRegistaration' value={vehicleRegistaration} onChange={handleChangeInputs}/>
                    </div>
                </div>
                <div className="button_daily_service" onClick={handleSubmit}>
                    <h3 className='remove_h3_padding'>Submit</h3>  
                </div>  
            </form>
        )
    } else {
        myForm = (
            <form onSubmit={handleSubmit}  autoComplete='off'>
                <div className='dashboard_form'>
                    <div>
                        <div className='dashboard_form_divs_name'>
                            <div>
                                <label className='dashboard_labels'>Name</label>
                            </div>
                                <input className='input_dashboard_page' type="text" name='Name' value={nameValue} onChange={handleChange}/>
                        </div>
                        <div className={`${makeSearchBarVisible}`}>
                            {driverSearchArray}
                        </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Route Type</label>
                        </div>
                        <Dropdown 
                            options={optionsTwo} 
                            onChange={onSelectTwo} 
                            value={selectedRouteType} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                        />
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
                            <label className='dashboard_labels'>Parcels not Delivered </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='NoParcelsBroughtBack' />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Vehicle Registration </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='OwnerVehicleRegistration' />
                    </div>
                </div>
                <div className="button_daily_service" onClick={handleSubmit}>
                    <h3 className='remove_h3_padding'>Submit</h3>  
                </div>  
        </form>
        )
    }
    
    return (
       <>
        {myForm}
       </>
    )
}

export default DashboardForm