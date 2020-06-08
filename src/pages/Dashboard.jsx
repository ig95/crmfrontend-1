import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DashboardForm from '../components/DashboardForm'
import triangle from '../images/triangledark.png'

var myInterval
const Dashboard = (props) => {
    const [ drivers, setDrivers ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('Bristol - DBS2')
    const [ selectedCitySort, setSelectedCitySort ] = useState('DBS2')
    const [ topRectangles, setTopRectangles ] = useState([])
    const [ data, setData ] = useState(null)
    const [ todaysRoutes, setTodaysRoutes ] = useState([])
    const [ logicalGate, setLogicalGate ] = useState(0)
    const [ selectedModification, setSelectedModification ] = useState(null)
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ listOfRoutes, setListOfRoutes ] = useState([])
    const [ triangleToggle, setTriangleToggle ] = useState('triangle_dashboard_page')
    const [ updateVariable, setUpdateVariable ] = useState(0)


    var dayArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // update parent function
    const updateParent = () => {
        let localVariable = updateVariable
        let updateValue = localVariable += 1
        setUpdateVariable(updateValue)
    }

    useEffect( () => {
        if (props.station) {
            setSelectedCitySort(props.station)
        }
        async function getDataNext(url = '') {
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
      
          getDataNext('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
            setDrivers(response.results)
            getDataNext('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
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
            let localArray = []
            response.data.drivers.forEach( element => {
                if (element.location === selectedCitySort) {
                    element.datesArray.forEach( ele => {
                        if (new Date(ele.date).toDateString() === selectedDate.toDateString()) {
                            localArray.push(element)
                        }
                    })
                }
            })
            console.log(localArray)
            setTodaysRoutes(localArray)
           
            setListOfRoutes(listComponents(localArray))
        })

    }, [selectedCitySort, selectedDate, updateVariable])

    const listComponents = (theRoutes, sortingValue=null) => {
        if (sortingValue) {
            console.log(sortingValue)
        }

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
        
        console.log('the routes: ', theRoutes, selectedDate)
        let localArrayTwo = []
        theRoutes.forEach( ele => {
            ele.datesArray.forEach( element => {
                if (new Date(element.date).toDateString() === new Date(selectedDate).toDateString()) {
                    localArrayTwo.push(
                        {
                            driver: ele,
                            date: element 
                        }
                    )
                }
            })
        })

        let localArrayThree = []
        if (localArrayTwo.length === 0) {
            localArrayTwo.push(
                <div className='list_overall_flex_dashboard'>
                    <h3>
                        Available: 0
                    </h3>
                </div>
            )
        } else (
            localArrayTwo.forEach( ele => {
                localArrayThree.push(
                    <div className='list_overall_flex_dashboard'>
                    <div className='elements_in_list_dashboard_names'>
                        <div className='list_spacer_content_location'>
                            <h4 className='remove_h3_padding'>{ele.driver.location}</h4>
                        </div>
                        <div className='list_spacer_content_name'>
                            <h4 className='remove_h3_padding'>{ele.driver.name}</h4>
                        </div>
                        <div className='list_spacer_content_routeNumber'>
                            <h4 className='remove_h3_padding'>{ele.date.routeNumber === '0' ? '--' : ele.date.routeNumber}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.route === '0' ? '--' : ele.date.route }</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.logIn_time}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.logOut_time}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.timeDifference[0] === '0:00:00' ? '--' : ele.date.timeDifference[0]}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.start_mileage}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.finish_mileage ? ele.date.finish_mileage : '--'}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.deductions === 'GB£0.00' ? '--' : ele.date.deductions}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.support === 'GB£0.00' ? '--' : ele.date.support}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.deductions === 'GB£0.00' ? '--' : ele.date.deductions}</h4>
                        </div>
                        <div className='list_spacer_content'>
                            <h4 className='remove_h3_padding'>{ele.date.deductions === 'GB£0.00' ? '--' : ele.date.deductions}</h4>
                        </div>
                    </div>
                    <button className='modify_button' onClick={(e, elements) => onClick(e, ele.date)}>
                        <h4>Modify</h4>
                    </button>
                    <button className='modify_button_delete'>
                        <h4>x</h4>
                    </button>
                </div>
                )
            })
        )
        listOfRoutes = localArrayThree
        return (
            <>
                {listOfRoutes}
            </>
        )
    }

    const handleSorting = (e, targetBox) => {
        listComponents(todaysRoutes, targetBox)
    }

    useEffect( () => {
        let localArray = []
        let labelArray =[`${selectedCity}`, 'Da Name', 'Route No', 'Route Type', 'Log In', 'Log Out', 'TORH', 'Start Mileage', 'Finish Mileage', 'Late Wave Payment', 'Support', 'Deduction', 'Fuel Card Change']
        for (let i = 0; i < 13; i++) {
            localArray.push(
                <div className='dashboard_top_rectangles' onClick={(e, targetValue) => handleSorting(e, labelArray[i])}>
                    <h4 className='remove_h3_padding' >{labelArray[i]}</h4>   
                </div>
            )
        }
        setTopRectangles(localArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
        if (city === 'Bristol - DBS2') {
            setSelectedCitySort('DBS2')
        } else if (city === 'Swindon - DSN1') {
            setSelectedCitySort('DSN1')
        } else {
            setSelectedCitySort('DEX2')
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
        let CTNum = 0
        let MFNNum = 0
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

/////****************************************** List Component ********************************** */


// handling the clock
useEffect( () => {
    clearInterval(myInterval)
    const timeFunction = () => {
        let setTime = () => {
            setCurrentDate(new Date())
        }
        myInterval = setInterval( setTime, 1000)
    }
    timeFunction()
}, [])

// calendar change function
const onChangeDate = (e) => {
    setSelectedDate(e)
    setTriangleToggle('triangle_dashboard_page')
}

// calendar
var onClickVar

//  toggle triangle
const handleTogleTriangle = () => {
    triangleToggle === 'triangle_dashboard_page_down' ? setTriangleToggle('triangle_dashboard_page') : setTriangleToggle('triangle_dashboard_page_down')
}

// make calendar and reset triangle
if (triangleToggle === 'triangle_dashboard_page_down') {
    onClickVar = (
        <div className='shadow_calendar_class_two'>
            <Calendar 
                onChange={onChangeDate}
                value={selectedDate}
                className='calender_modification'
            />
        </div>
    )
}

// clock and calendar
var clockAndCalendar
clockAndCalendar = (
    <div className='clock_and_calendar'>
        <h3 className='nav_current_date'>
            Week: {currentDate.getWeek()}
            {<br />}
            {dayArray[currentDate.getDay()]} {currentDate.getDate()} {monthArray[currentDate.getMonth()]} {currentDate.getFullYear()}
            {<br />}
            {currentDate.toLocaleTimeString()}
        </h3>
        <h3 className='calendar_date_picker_dashboard'>
            <div className='shadow_calendar_class'>
                Date Selected: {' '}{dayArray[selectedDate.getDay()]} {selectedDate.getDate()} {monthArray[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                <span onClick={handleTogleTriangle}><img src={triangle} alt="triangle" className={triangleToggle}/></span>
                {onClickVar}
            </div>
        </h3>
    </div>
)

    return (
        <div className='home_content'>
            <NavigationBar 
            title='Daily Service'
            superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}
            />
            <div className='main_content_dashboard'>
                <nav className="menu_white">
                    <ol>
                        <li className="menu-item" id='white_top'><a href="#0" id='menu_text_white'>{selectedCity}</a>
                            <ol className="sub-menu">
                                <li className="menu-item" id='item_white_one' onClick={(e, city) => handleSelectCity(e, 'Bristol - DBS2')}><a href="#0" id='menu_text_white'>Bristol - DBS2</a></li>
                                <li className="menu-item" id='item_white_two' onClick={(e, city) => handleSelectCity(e, 'Swindon - DSN1')}><a href="#0" id='menu_text_white'>Swindon - DSN1</a></li>
                                <li className="menu-item" id='item_white_three' onClick={(e, city) => handleSelectCity(e, 'Exeter - DEX2')}><a href="#0" id='menu_text_white'>Exeter - DEX2</a></li>
                            </ol>
                        </li>
                    </ol>
                </nav>
                {routesBox}
                {clockAndCalendar}
                <div className='top_rectangles_container'>
                    {topRectangles}
                </div>    
                {listOfRoutes}
                <hr />
                <DashboardForm 
                    otherSelection={selectedModification}
                    data={data}
                    drivers={drivers}
                    dates={schedule}
                    updateParentFunction={updateParent}
                    managerStation={props.station ? props.station : null}
                />
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