import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ListForDashboard from '../components/ListForDashboard'

var y = 0 
const Dashboard = (props) => {
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
    const [ data, setData ] = useState(null)
    const [ todaysRoutes, setTodaysRoutes ] = useState([])
    const [ logicalGate, setLogicalGate ] = useState(0)
    const [ selectedModification, setSelectedModification ] = useState(null)

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

    useEffect( () => {
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

        getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
            console.log(response.data)
            setData(response.data)
            let today = new Date()
            let localArray = []
            response.data.drivers.forEach( element => {
                if (element.location === selectedCityAbbrev) {
                    element.datesArray.forEach( ele => {
                        if (new Date(ele.date).toDateString() === today.toDateString()) {
                            localArray.push(element)
                        }
                    })
                }
            })
            console.log(localArray)
            setTodaysRoutes(localArray)
        })
    }, [selectedCityAbbrev])

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
        let labelArray =[`${selectedCity}`, 'Da Name', 'Route No', 'Route', 'Log In', 'Log Out', 'TORH', 'Start Mileage', 'Finish Mileage', 'Late Wave Payment', 'Support', 'Deduction', 'Fuel Card Change']
        for (let i = 0; i < 11; i++) {
            localArray.push(
                <div className='dashboard_top_rectangles'>
                    <h4 className='remove_h3_padding'>{labelArray[i]}</h4>   
                </div>
            )
        }
        setTopRectangles(localArray)
    }, [])

    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
        if (city === 'Bristol - DBS2') {
            setSelectedCityAbbrev('DBS2')
        } else if (city === 'Southampton - DSN1') {
            setSelectedCityAbbrev('DSN1')
        } else {
            setSelectedCityAbbrev('DEX2')
        }
        let x = logicalGate
        x = x+1
        setLogicalGate(x)
    }

    // map data into the top box
    var routesBox
    if (todaysRoutes.length > 0) {
        let routesTotal = todaysRoutes.length
        let DBS2Num = 0
        let DEX2Num = 0
        let DSN1Num = 0
        let CTNum = 0
        let MFNNum = 0
        let localArray = []
        routesBox = (
            <div className='dashboard_route_type_list'>
                <h4>{routesTotal} Full Routes</h4>
                <h4>{DBS2Num} DBS2</h4>
                <h4>{CTNum} CT</h4>
                <h4>{MFNNum} MFN</h4>
            </div>
        )
    } else {
        routesBox = (<div className='dashboard_route_type_list'></div>)
    }

    let myTester = 0
    if (selectedModification && myTester === 0) {
        console.log(selectedModification)
        myTester += 1
    }

/////****************************************** List Component ********************************** */
const listComponents = (theRoutes) => {
    let quicksort = (arr, min, max) => {
        // set the quicksort pointer to the first element in the array
        if (min === undefined) {
            min = 0
        }

        // set the quicksort max pointer to the last element in the array
        if (max === undefined) {
            max = arr.length - 1
        }

        // if the arr pointer's aren't at each other yet then continue recursively iterating
        if (min < max) {
            let pivot = partition(arr, min, max)
            quicksort(arr, min, pivot)
            quicksort(arr, pivot + 1, max)
        }

        // return the arr after it has been sorted
        return arr
    }

    let partition = (arr, min, max) => {
        // set the pivot in the middle of the array
        let pivotNumber = Math.floor(min + (max - min) / 2) 
        let pivot = arr[pivotNumber]

        // for each of these later there are do-while loops impemented to we set them out of range
        let i = min - 1
        let j = max + 1

        // infinite loop until conditions are met
        while (true) {
            // while i is refrencing a point lower than the middle of the array iterate up unitl the middle is reached
            do {
                i++
            } 
            while (arr[i] < pivot)

            // while j is higher than the middle index of the array iterate down towards the middle
            do {
                j--
            } 
            while (arr[j] > pivot)

            // if the point is reached where both indices are pointing at the middle point then do a switch and put the numbers on the other side of the pivot
            if (i >= j) {
              return j
            }
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp 
        }
    }

    var listOfRoutes

    // modify button
    const onClick = (e, dateForChange) => {
        setSelectedModification(dateForChange)
    }

    let localArray = []
    theRoutes.forEach( ele => {
        ele.datesArray.forEach( element => {
            if (new Date(element.date).toDateString() === new Date().toDateString()) {
                localArray.push(
                    <div className='list_overall_flex_dashboard'>
                        <div className='elements_in_list_dashboard_names'>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{ele.location}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{ele.name}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.route}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.location}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.logIn_time}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.logOut_time}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.timeDifference[0]}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>--</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>--</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.deductions}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.support}</h4>
                            </div>
                        </div>
                        <button className='modify_button' onClick={(e, elements) => onClick(e, element)}>
                            <h4>Modify</h4>
                        </button>
                        <button className='modify_button_delete'>
                            <h4>x</h4>
                        </button>
                    </div>
                )
            }
        })
    })
    if (localArray.length === 0) {
        localArray.push(
            <div className='list_overall_flex_dashboard'>
                <h3>
                    Available: 0
                </h3>
            </div>
        )
    }
    listOfRoutes = localArray
    return (
        <>
            {listOfRoutes}
        </>
    )
}

var myForm
var returnForm = (otherSelection) => {
    console.log(otherSelection)
    myForm = 
        (
            <form onSubmit={handleSubmit}  autoComplete='off'>
                <div className='dashboard_form'>
                    <div className='dashboard_form_divs_name'>
                        <div>
                            <label className='dashboard_labels'>Name</label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Name' defaultValue={`${otherSelection.driver_id}`} />
                    </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Route Type</label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='RouteType' defaultValue={`${otherSelection.location}`}/>
                </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Wave Time </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='LogInTime' defaultValue={`${otherSelection.logIn_time}`}/>
                </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Log Out Time </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='LogOutTime' defaultValue={`${otherSelection.logOut_time}`}/>
                </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Start Mileage </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='StartMileage' defaultValue='0'/>
                </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Finish Mileage </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='FinishMileage' defaultValue={`0`}/>
                </div>
                <div className='dashboard_form_divs'>
                    <div>
                        <label className='dashboard_labels'>Vehicle Type </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='VehicleType' defaultValue={`${otherSelection.vans}`}/>
                </div>         
                <div className='dashboard_form_divs'>    
                    <div>
                        <label className='dashboard_labels'>Route No. </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='Route' defaultValue={`${otherSelection.route}`}/>
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
                        <input className='input_dashboard_page' type="text" name='NoParcelsDelivered' defaultValue={`${otherSelection.parcel}`}/>
                </div>
                <div className='dashboard_form_divs'>    
                    <div>
                        <label className='dashboard_labels'>Parcels not Delivered </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='NoParcelsBroughtBack' defaultValue={`${otherSelection.parcel}`}/>
                </div>
                <div className='dashboard_form_divs'>    
                    <div>
                        <label className='dashboard_labels'>Vehicle Registration </label>
                    </div>
                        <input className='input_dashboard_page' type="text" name='OwnerVehicleRegistration' defaultValue={`${otherSelection.fuel}`}/>
                </div>
            </div>
            <div className="button_daily_service" onClick={handleSubmit}>
                <h3 className='remove_h3_padding'>Submit</h3>  
            </div>  
        </form>
    )
}


useEffect( () => {
    if (selectedModification) {
        returnForm(selectedModification)
    }
}, [selectedModification])
var formMaker

formMaker = (
    <form onSubmit={handleSubmit}  autoComplete='off'>
    <div className='dashboard_form'>
        <div>
            <div className='dashboard_form_divs_name'>
                <div>
                    <label className='dashboard_labels'>Name</label>
                </div>
                    <input className='input_dashboard_page' type="text" name='Name' value={nameValue} onChange={handleChange} />
            </div>
            <div className={`${makeSearchBarVisible}`}>
                {driverSearchArray}
            </div>
        </div>
        <div className='dashboard_form_divs'>
            <div>
                <label className='dashboard_labels'>Route Type</label>
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

    return (
        <div className='home_content'>
            <NavigationBar title='Daily Service'/>
            <div className='main_content_dashboard'>
                <nav className="menu_white">
                    <ol>
                        <li className="menu-item" id='white_top'><a href="#0" id='menu_text_white'>{selectedCity}</a>
                            <ol className="sub-menu">
                                <li className="menu-item" id='item_white_one' onClick={(e, city) => handleSelectCity(e, 'Bristol - DBS2')}><a href="#0" id='menu_text_white'>Bristol - DBS2</a></li>
                                <li className="menu-item" id='item_white_two' onClick={(e, city) => handleSelectCity(e, 'Southampton - DSN1')}><a href="#0" id='menu_text_white'>Southampton - DSN1</a></li>
                                <li className="menu-item" id='item_white_three' onClick={(e, city) => handleSelectCity(e, 'Exeter - DEX2')}><a href="#0" id='menu_text_white'>Exeter - DEX2</a></li>
                            </ol>
                        </li>
                    </ol>
                </nav>
                {routesBox}
                <div className='top_rectangles_container'>
                    {topRectangles}
                </div>    
                {listComponents(todaysRoutes)}
                <hr />
                {selectedModification ? myForm : formMaker}
                <div className='dashboard_form_divs_comments'>    
                    <div>
                        <label className='dashboard_labels_dashboard'>Comments </label>
                    </div>
                        <textarea className='dashboard_text_field' type="text" name='Comment' />
                </div>
            </div>
        </div>
    )
}

export default Dashboard