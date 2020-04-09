import React, {useEffect, useState} from 'react'
import axios from 'axios'

const DivSingleWeek = (props) => {
    const [ topRow, setTopRow ] = useState([])
    const [ middleRow, setMiddleRow ] = useState([])
    const [ bottomRow, setBottomRow ] = useState([])
    const [ selectedCityDrivers, setSelectedCityDrivers ] = useState([])
    const [ reRenderGate, setReRenderGate ] = useState(false)

    useEffect( () => {
        // top row mapped divs
        var checkForDate = []
        function thisWeekDivs () {
            var thisWeekDivsArray = []
            let localDateArray = []
            let selectedDate = props.selectedDate
            thisWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Search Bar</h4></div>)
            for (let i = 0; i < 7; i++) {
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
            lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Total for week:</h4></div>)
            for (let i = 0; i < 7; i++) {
                lastWeekDivsArray.push(<div key={i+50} className='cal_divs_single'><h5 className='inner_calander_text'>{Math.floor(Math.random() * 100)}</h5></div>)
            }  
            return lastWeekDivsArray
        }

        var middleRows
        // middle row mapped divs
        if (selectedCityDrivers.length > 0) {
            console.log(selectedCityDrivers)
             middleRows = () => {
                var mappedProps = []
                let localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1]
                for (let ele in selectedCityDrivers) {
                    mappedProps.push(<div className='cal_divs_single_first'>{selectedCityDrivers[ele].name}</div>)
                    for (let i = 0; i < 7; i++) {
                        if (checkForDate.includes(new Date(selectedCityDrivers[ele].datesList[i]).toDateString())) {
                            localAwesomeArray[checkForDate.indexOf(new Date(selectedCityDrivers[ele].datesList[i]).toDateString())] = i
                        }
                    }
                    for (let i = 0; i < 7; i++) {
                        if (localAwesomeArray[i] !== -1) {
                            // logic for date booked or not
                            mappedProps.push(<div key={Math.random()} className='cal_divs_single_booked' onClick={(e) => handleClick(e, checkForDate[i], selectedCityDrivers[ele].name, selectedCityDrivers[ele].datesList)}>
                                    <h5 className='inner_calander_text'>
                                        BOOKED
                                    </h5>
                            </div>)
                        } else {
                            // logic for date booked or not
                            mappedProps.push(<div key={Math.random()} className='cal_divs_single_table' onClick={(e) => handleClick(e, checkForDate[i], selectedCityDrivers[ele].name, selectedCityDrivers[ele].datesList, selectedCityDrivers[ele].employee_id)}>
                                    <h5 className='inner_calander_text'>
                                        ---
                                    </h5>
                            </div>)
                        }
                    }  
                    localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1]
                }
                return mappedProps
            }
        } else {
            middleRows = () => {
                return ''
            }
        }

        const handleSubmitButton = (myDate, nameSelection, myList, id) => {
            console.log(props)
            // myList.push(myDate)
            const myListFunc = () => {
                let localArray = []
                if (myList.length > 0) {
                    localArray = [...myList]
                    localArray.push(myDate)
                } else {
                    localArray.push(myDate)
                }
                return localArray
            }
            let endList = myListFunc()
            let myDateTime = new Date()
            let hours = myDateTime.getHours()
            let submitHours = hours > 12 ? (hours - 12) : hours
            let minutes = myDateTime.getMinutes()

            let timeEntry = `${submitHours}:${minutes} ${hours > 12 ? 'PM' : 'AM'}`
            async function postData(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'PUT', 
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    });
    
                return response ? response.json() : console.log('no reponse')
            };
            
            postData(`https://pythonicbackend.herokuapp.com/employees/${id}/`, {
                datesList: endList,
                logIn_time: timeEntry,
                logOut_time: timeEntry
            }).then( (response) => {
                    props.drivers.forEach( (ele, setterId) => {
                        if (ele.employee_id === id) {
                            props.drivers[setterId] = response
                        }
                    })
                    reRenderGate ? setReRenderGate(false) : setReRenderGate(true)
                    console.log(response)
            })
            setMiddleRow(middleRows())
        }

        const makeForm = (dateSelection, nameSelection, dateList, id) => {
            console.log(dateList)
            return (
                <div className='inner_calender_form'>
                    <h3>{nameSelection}</h3>
                    <h3>{dateSelection}</h3>
                    <button onClick={() => { handleSubmitButton(dateSelection, nameSelection, dateList, id)} }>Add Work</button>
                </div>
            )
        }

        const handleClick = (e, weekDaySelected, theName, datesList, id) => {
            e.preventDefault()
            setMiddleRow(makeForm(weekDaySelected, theName, datesList, id))
        }


        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate, selectedCityDrivers])
 
    useEffect( () => {
        console.log(props)
        let localList = []
        if (props.schedule) {
            props.drivers.forEach( (driverElement, driverId) => {
                props.schedule.forEach( (scheduleElement, scheduleId) => {
                    let matchingId = /\d/.exec(scheduleElement.employee_id)
                    if (parseInt(matchingId[0]) === driverElement.employee_id) {
                        // driverElement['datesList'] ?  : driverElement['datesList'] = [scheduleElement.date] 
                        driverElement['datesList'].push(scheduleElement.date)
                        console.log('match found: ', driverElement)
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
    }, [props.selectedCity, reRenderGate, props.schedule])

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