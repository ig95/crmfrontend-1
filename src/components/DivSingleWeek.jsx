import React, {useEffect, useState} from 'react'

const DivSingleWeek = (props) => {
    const [ topRow, setTopRow ] = useState([])
    const [ middleRow, setMiddleRow ] = useState([])
    const [ bottomRow, setBottomRow ] = useState([])
    const [ selectedCityDrivers, setSelectedCityDrivers ] = useState([])
    const [ reRenderGate, setReRenderGate ] = useState(false)

    // making the rows
    useEffect( () => {
        // top row mapped divs
        var checkForDate = []
        function thisWeekDivs () {
            var thisWeekDivsArray = []
            let localDateArray = []
            let selectedDate = props.selectedDate
            thisWeekDivsArray.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>Search Bar</h4></div>)
            for (let i = 0; i < 14; i++) {
                let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
                thisWeekDivsArray.push(<div key={i+8} className='cal_divs_single'><h5 className='inner_calander_text'>{dateVar}</h5></div>)
                localDateArray.push(dateVar)
                selectedDate.setDate(selectedDate.getDate() - i )
            }  
            checkForDate = localDateArray
            return thisWeekDivsArray
        }

        // bottom row mapped divs
        function bottomDivs () {
            var lastWeekDivsArray = []
            lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>Total for week:</h4></div>)
            for (let i = 0; i < 14; i++) {
                lastWeekDivsArray.push(<div key={i+50} className='cal_divs_single'><h5 className='inner_calander_text'>{Math.floor(Math.random() * 100)}</h5></div>)
            }  
            return lastWeekDivsArray
        }

        var middleRows
        // middle row mapped divs
        if (selectedCityDrivers.length > 0) {
            middleRows = () => {
                let myLocalArray = checkForDate
                var mappedProps = []
                let localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,]
                for (let ele in selectedCityDrivers) {
                    mappedProps.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>{selectedCityDrivers[ele].name}</h4></div>)
                    for (let i = 0; i < selectedCityDrivers[ele].datesList.length; i++) {
                        if (checkForDate.includes(new Date(selectedCityDrivers[ele].datesList[i]).toDateString())) {
                            localAwesomeArray[checkForDate.indexOf(new Date(selectedCityDrivers[ele].datesList[i]).toDateString())] = i
                        }
                    }
                    for (let i = 0; i < 14; i++) {
                        if (localAwesomeArray[i] !== -1) {
                            // logic for date booked or not
                            mappedProps.push( <div  className='cal_divs_single_booked' key={Math.random()} >
                                    <h5 className='inner_calander_text'>
                                        BOOKED
                                    </h5>
                            </div>)
                        } else {
                            // logic for date booked or not
                            mappedProps.push(<div key={Math.random()} className='cal_divs_single_table' onClick={(e) => handleClick(e, myLocalArray[i], selectedCityDrivers[ele].name, selectedCityDrivers[ele].datesList, selectedCityDrivers[ele].employee_id, selectedCityDrivers[ele].location)}>
                                    <h5 className='inner_calander_text'>
                                        ---
                                    </h5>
                            </div>)
                        }
                    }  
                    localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,]
                }
                return mappedProps
            }
        } else {
            middleRows = () => {
                return ''
            }
        }

        // send data to database from from
        const handleSubmitButton = (myDate, id, location) => {
            console.log(props)
            let myDateTime = new Date()
            let hours = myDateTime.getHours()
            let minutes = myDateTime.getMinutes()

            let timeEntry = `${hours}:${minutes}`
            async function postData(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'POST', 
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
            
            postData(`https://pythonicbackend.herokuapp.com/schedule/`, {
                date: myDate,
                logIn_time: timeEntry,
                logOut_time: timeEntry,
                location: location,
                employee_id: `https://pythonicbackend.herokuapp.com/employees/${id}/`
            }).then( response => {
                console.log(response)
                if (response.date) {
                    props.drivers.forEach( (ele, setterId) => {
                        if (ele.employee_id === id) {
                            props.drivers[setterId].datesList.push(response.date)
                        }
                    })
                    // add here
                    reRenderGate ? setReRenderGate(false) : setReRenderGate(true)
                }
            })
            setMiddleRow(middleRows())
        }

        // render the form div
        const makeForm = (dateSelection, nameSelection, dateList, id, location) => {
            return (
                <div className='inner_calender_form'>
                    <div className='inner_form_div'>
                        <h3>Name: {nameSelection}</h3>
                        <h3>Date: {dateSelection}</h3>
                        {/* make This Changeable */}
                        <h3>Depot: {location}</h3>
                        <button className='form_button' onClick={() => { handleSubmitButton(dateSelection, id, location)} }>Add Work</button>
                    </div>
                </div>
            )
        }

        // when click on a date to book
        const handleClick = (e, weekDaySelected, theName, datesList, id, location) => {
            e.preventDefault()
            console.log(
                'weekDaySelected: ', weekDaySelected,
                'theid: ', id
            )
            setMiddleRow(makeForm(weekDaySelected, theName, datesList, id, location))
        }


        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate, selectedCityDrivers, props, reRenderGate])
 
    // mapping the data into correct state
    useEffect( () => {
        let localList = []
        if (props.schedule) {
            props.drivers.forEach( (driverElement, driverId) => {
                props.schedule.forEach( (scheduleElement, scheduleId) => {
                    let matchingId = /\d/.exec(scheduleElement.employee_id)
                    if (parseInt(matchingId[0]) === driverElement.employee_id) {
                        driverElement['datesList'].push(scheduleElement.date)
                    }
                })
            })
            props.drivers.forEach( (ele, id) => {
                if (ele.route === props.selectedCity) {
                    localList.push(ele)
                }
            })
            setSelectedCityDrivers(localList)
        }
    }, [props.selectedCity, reRenderGate, props.schedule, props])

    return (
        <div className='single_week_grid'>
            <div className='top_row'>
                {topRow}
            </div>
            <div className='middle_row'>
                {middleRow}
            </div>
            <div className='bottom_row'>
                {bottomRow}
            </div>
        </div>
    )
}

export default DivSingleWeek