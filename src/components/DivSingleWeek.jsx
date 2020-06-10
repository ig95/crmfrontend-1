/* eslint-disable no-loop-func */
import React, {useEffect, useState} from 'react'
import spinner from '../images/spinner.svg'

const DivSingleWeek = (props) => {
    const [ topRow, setTopRow ] = useState([])
    const [ middleRow, setMiddleRow ] = useState([])
    const [ bottomRow, setBottomRow ] = useState([])
    const [ getData, setGetData ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ calenderDivs, setCalendarDivs ] = useState('cal_divs_single')
    const [ calenderDivsInner, setCalendarDivsInner ] = useState('cal_divs_single_table')
    const [ calenderDivsInnerBooked, setCalendarDivsInnerBooked ] = useState('cal_divs_single_booked')
    const [ middleRowClass, setMiddleRowClass] = useState('middle_row')
    const [ selectedResponse, setSelectedResponse ] = useState('')
    const [ optionsGate, setOptionsGate ] = useState(true)
    const [ menuVisibility, setMenuVisibility ] = useState(null)

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

        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response)
        })
        setSelectedResponse(props.selectedCity)

    }, [getData, props.selectedCity])

    const handleDeleteToggle = (e, driver) => {
        props.deletionDriver(e, driver)
    }

    // making the rows
    useEffect( () => {
        // sorting algorithms
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

        // non sorting algorithms

        let amount = parseInt(props.divAmount)
        if (amount === 14) {
            setCalendarDivs('cal_divs_single')
            setCalendarDivsInner('cal_divs_single_table')
            setCalendarDivsInnerBooked('cal_divs_single_booked')
            setMiddleRowClass('middle_row')
            
        } else {
            setCalendarDivs('cal_divs_single_seven')
            setCalendarDivsInner('cal_divs_single_table_seven')
            setCalendarDivsInnerBooked('cal_divs_single_booked_seven')
            setMiddleRowClass('middle_row_seven')
        }
        // top row mapped divs
        var checkForDate = []
        function thisWeekDivs () {
            var thisWeekDivsArray = []
            let localDateArray = []
            let selectedDate = new Date(props.selectedDate)
            thisWeekDivsArray.push(<div className='cal_divs_single_first_top_two'><h4 className='inner_calander_text'>Search Bar</h4></div>)
            for (let i = 0; i < amount; i++) {
                let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
                thisWeekDivsArray.push(<div key={i+8} className={`${calenderDivs}`}><h4 className='inner_calander_text'>{dateVar}</h4></div>)
                localDateArray.push(dateVar)
                selectedDate.setDate(selectedDate.getDate() - i )
            }  
            checkForDate = localDateArray
            return thisWeekDivsArray
        }

        // bottom row mapped divs
        function bottomDivs () {
            // make array for display and push forst column
            var lastWeekDivsArray = []
            lastWeekDivsArray.push(<div className='cal_divs_single_first_top_two'><h4 className='inner_calander_text'>Total for Day:</h4></div>)

            
            // make sure all data needed is available
            if (data && props && checkForDate) {
                // create array to increment
                let localArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

                // loop through each index in the amount of divs refrenced
                for (let i = 0; i < amount; i++) {

                    // check each date for each driver sum them
                    // eslint-disable-next-line no-loop-func
                    data.data.drivers.forEach( (ele) => {
                        ele.datesArray.forEach( (date) => {
                            if (date.location === props.selectedCity) {
                                if (date.date === checkForDate[i]) {
                                    localArray[i] = localArray[i] + 1
                                }
                            }
                        })
                    })
                    lastWeekDivsArray.push(<div key={i+50} className={`${calenderDivs}`}><h4 className='inner_calander_text'>{localArray[i]}</h4></div>)
                }
            }
            return lastWeekDivsArray
        }

        // make nav invisbile
        const handleMouseLeave = () => {
            setMenuVisibility(null)
        }

        // make the nav visible
        const handleMouseEnter = () => {
            setMenuVisibility(
                <nav className='menu_rota_sub' >
                    <ol>
                        <li className="menu-item"><a href="#0" id='menu_rota_zed' >Station</a>
                            <ol className="sub-menu" >
                                <li className="menu-item" id='sub_menu_options'>
                                    <a href="#0" id='dropdown_text_rota'>
                                        DSN1
                                    </a>
                                </li>
                                <li className="menu-item" id='sub_menu_options'>
                                    <a href="#0" id='dropdown_text_rota'>
                                        DBS2
                                    </a>
                                </li>
                                <li className="menu-item" id='sub_menu_options'>
                                    <a href="#0" id='dropdown_text_rota'>
                                        DEX2
                                    </a>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </nav>
            )
        }

        // make the nav visible
        const handleMouseEnterSeven = () => {
            setMenuVisibility(
                
            )
        }

        // get sundays
        const getSundays = () => {
            let bookingOptions = []
            let optionsArray = [
                'CT',
                'RT',
                'Holiday'
            ]
            bookingOptions.push (
                <li className="menu-item" id='sub_menu_options' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <a href="#0" id='dropdown_text_rota' >
                        IN
                    </a>
                    <nav className='menu_rota_sub' >
                        <ol>
                            <li className="menu-item"><a href="#0" id='menu_rota_zed' >Station</a>
                                <ol className="sub-menu" >
                                    <li className="menu-item" id='sub_menu_options'>
                                        <a href="#0" id='dropdown_text_rota'>
                                            DSN1
                                        </a>
                                    </li>
                                    <li className="menu-item" id='sub_menu_options'>
                                        <a href="#0" id='dropdown_text_rota'>
                                            DBS2
                                        </a>
                                    </li>
                                    <li className="menu-item" id='sub_menu_options'>
                                        <a href="#0" id='dropdown_text_rota'>
                                            DEX2
                                        </a>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </nav>
                </li>
            )
            optionsArray.forEach( ele => {
                bookingOptions.push(
                    <li className="menu-item" id='sub_menu_options'>
                        <a href="#0" id='dropdown_text_rota'>
                            {ele}
                        </a>
                    </li>
                )
            })
            return bookingOptions
        }

        // get sundays
        const getSundaysSeven = () => {
            let bookingOptions = []
            let optionsArray = [
                'CT',
                'RT',
                'Holiday'
            ]
            bookingOptions.push (
                <li className="menu-item" id='sub_menu_options' onMouseEnter={handleMouseEnterSeven} onMouseLeave={handleMouseLeave}>
                    <a href="#0" id='dropdown_text_rota' >
                        IN
                    </a>
                    {menuVisibility}
                </li>
            )
            optionsArray.forEach( ele => {
                bookingOptions.push(
                    <li className="menu-item" id='sub_menu_options'>
                        <a href="#0" id='dropdown_text_rota'>
                            {ele}
                        </a>
                    </li>
                )
            })
            return bookingOptions
        }

        // dropdown menu options
        const optionsThree = getSundays()

        var middleRows
        // middle row mapped divs
        if (data && props && !props.deleteDriverScreen) {
            middleRows = () => {
                let mappedProps = []
                data.data.drivers.forEach( (ele, id) => {
                    if (ele.location === props.selectedCity) {
                        let localArray = []
                        localArray.push(
                            <div key={Math.random()} className='cal_divs_single_first'>
                                <h5 className='inner_calander_text'>
                                    {ele.name}
                                </h5>
                            </div>  
                        )  
                        for (let i = 0; i < amount; i++) {
                            localArray.push(
                                <nav className="menu_rota">
                                    <ol>
                                        <li className="menu-item" id='fuckingTits'><a href="#0" id='menu_rota_a' >OFF</a>
                                            <ol className="sub-menu" onClick={(e) => handleClick(e, checkForDate[i], ele.driver_id, ele.location)}>
                                                {optionsThree}
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            )  
                        }
                        if (parseInt(props.divAmount) === 14) {
                            let localSevenDayCheck = []
                            // eslint-disable-next-line no-loop-func
                            ele.datesArray.forEach( (dateEle) => {
                                if (checkForDate.includes(dateEle.date)) {
                                    let colorChange
                                    // eslint-disable-next-line default-case
                                    switch (dateEle.location) {
                                        case 'DEX2':
                                            colorChange = 'menu_rota_blue' 
                                            break;
                                        case 'DSN1':
                                            colorChange = 'menu_rota_yellow' 
                                            break;
                                        case `DBS2`:
                                            colorChange = 'menu_rota_in'
                                            break;
                                        case 'MFN':
                                            colorChange = 'menu_rota_purple'  
                                            break; 
                                        case 'CT':
                                            colorChange = 'menu_rota_purple'  
                                            break; 
                                        case 'RT':
                                            colorChange = 'menu_rota_purple'  
                                            break; 
                                        case 'Holiday':
                                            colorChange = 'menu_rota_holiday'  
                                            break; 
                                    }
                                    localSevenDayCheck.push(checkForDate.indexOf(dateEle.date)+1)
                                    console.log(checkForDate.indexOf(dateEle.date)+1)
                                    localArray[checkForDate.indexOf(dateEle.date)+1] = (
                                        <nav className={colorChange}>
                                            <ol>
                                                <li className="menu-item" id='fuckingTits'><a href="#0" id='menu_rota_a'>{dateEle.location === props.selectedCity ? 'IN' : dateEle.location}</a>
                                                    <ol className="sub-menu" onClick={(e) => handleClickPut(e, checkForDate[checkForDate.indexOf(dateEle.date)], ele.driver_id, ele.location)}>
                                                        {optionsThree}
                                                    </ol>
                                                </li>
                                            </ol>
                                        </nav>
                                    )
                                }
                            })
                            let warningVar = []
                            if (localSevenDayCheck.length > 5) {
                                quicksort(localSevenDayCheck)
                                console.log(localSevenDayCheck)
                                let checkForConsecutive = 0
                                let countInRow = 1
                                localSevenDayCheck.forEach( (dateBooked, dateBookedID) => {
                                    // set the current index equal to the number found in array
                                    if (countInRow === 5) {
                                        if (dateBooked+1 <= 14 ) {
                                            warningVar.push(dateBooked+1) 
                                        } 
                                        if (dateBooked-6 > 0) {
                                            warningVar.push(dateBooked-6)
                                        }
                                        countInRow = 1
                                        checkForConsecutive = 0
                                        return
                                    }

                                    if (checkForConsecutive === 0) {
                                        checkForConsecutive = dateBooked
                                        return
                                    }
                                    // check if the next number is consecutive
                                    if (dateBooked === (checkForConsecutive+1)) {
                                        countInRow++
                                        checkForConsecutive++
                                        return
                                    } else {
                                        checkForConsecutive = 0
                                        countInRow = 1
                                        return
                                    }
                                })
                            }
                            if (warningVar.length > 0) {
                                warningVar.forEach( element => {
                                    localArray[element] = (
                                        <div className='enforced_holiday'>
                                            Enforced Holiday
                                        </div>
                                    )
                                })
                            }
                            mappedProps.push(localArray)
                        } else {
                            // dropdown menu options
                            const optionsThree = getSundaysSeven()
                            let localArray= []
                            localArray.push(
                                <div key={Math.random()} className='cal_divs_single_first'>
                                    <h5 className='inner_calander_text'>
                                        {ele.name}
                                    </h5>
                                </div>  
                            )  
                            for (let i = 0; i < 7; i++) {
                                localArray.push(
                                    <nav className="menu_rota_seven">
                                        <ol>
                                            <li className="menu-item" id='fuckingTits'><a href="#0" id='menu_rota_b' >OFF</a>
                                                <ol className="sub-menu" onClick={(e) => handleClick(e, checkForDate[i], ele.driver_id, ele.location)}>
                                                    {optionsThree}
                                                </ol>
                                            </li>
                                        </ol>
                                    </nav>
                                )  
                            }
                            // eslint-disable-next-line no-loop-func
                            let localSevenDayCheck = []
                            ele.datesArray.forEach( (dateEle) => {
                                if (checkForDate.includes(dateEle.date)) {
                                    let colorChange
                                    // eslint-disable-next-line default-case
                                    switch (dateEle.location) {
                                        case 'DEX2':
                                            colorChange = 'menu_rota_in_seven' 
                                            break;
                                        case 'DSN1':
                                            colorChange = 'menu_rota_in_seven' 
                                            break;
                                        case `DBS2`:
                                            colorChange = 'menu_rota_in_seven'
                                            break;
                                        case 'MFN':
                                            colorChange = 'menu_rota_purple_seven'  
                                            break; 
                                        case 'CT':
                                            colorChange = 'menu_rota_purple_seven'  
                                            break; 
                                        case 'RT':
                                            colorChange = 'menu_rota_purple_seven'  
                                            break; 
                                        case 'Holiday':
                                            colorChange = 'menu_rota_holiday_seven'  
                                            break; 
                                    }
                                    localSevenDayCheck.push(checkForDate.indexOf(dateEle.date)+1)
                                    localArray[checkForDate.indexOf(dateEle.date)+1] = (
                                        <nav className={colorChange}>
                                            <ol>
                                                <li className="menu-item" id='fuckingTits'><a href="#0" id='menu_rota_b'>{dateEle.location === props.selectedCity ? 'IN' : dateEle.location}</a>
                                                    <ol className="sub-menu" onClick={(e) => handleClickPut(e, checkForDate[checkForDate.indexOf(dateEle.date)], ele.driver_id, ele.location)}>
                                                        {optionsThree}
                                                    </ol>
                                                </li>
                                            </ol>
                                        </nav>
                                    )
                                }
                            })
                            let warningVar = []
                            if (localSevenDayCheck.length > 5) {
                                quicksort(localSevenDayCheck)
                                console.log(localSevenDayCheck)
                                let checkForConsecutive = 0
                                let countInRow = 1
                                localSevenDayCheck.forEach( (dateBooked, dateBookedID) => {
                                    // set the current index equal to the number found in array
                                    if (countInRow === 5) {
                                        if (dateBooked+1 <= 7 ) {
                                            warningVar.push(dateBooked+1) 
                                        } 
                                        if (dateBooked-6 > 0) {
                                            warningVar.push(dateBooked-6)
                                        }
                                        countInRow = 1
                                        checkForConsecutive = 0
                                        return
                                    }

                                    if (checkForConsecutive === 0) {
                                        checkForConsecutive = dateBooked
                                        return
                                    }
                                    // check if the next number is consecutive
                                    if (dateBooked === (checkForConsecutive+1)) {
                                        countInRow++
                                        checkForConsecutive++
                                        return
                                    } else {
                                        checkForConsecutive = 0
                                        countInRow = 1
                                        return
                                    }
                                })
                            }
                            if (warningVar.length > 0) {
                                warningVar.forEach( element => {
                                    localArray[element] = (
                                        <div className='enforced_holiday_seven'>
                                            Enforced Holiday
                                        </div>
                                    )
                                })
                            }
                            mappedProps.push(localArray)
                        }
                    }
                })
                return mappedProps
            }
        } else if (data && props && props.deleteDriverScreen) {
            middleRows = () => {
                let mappedProps = []
                data.data.drivers.forEach( (ele, id) => {
                    if (ele.location === props.selectedCity) {
                        let localArray = []
                        localArray.push(
                            <div key={Math.random()} className='cal_divs_single_first_selectable' onClick={(e, targetObject) => handleDeleteToggle(e, ele)}>
                                <h5 className='inner_calander_text'>
                                    {ele.name}
                                </h5>
                            </div>  
                        )  
                        for (let i = 0; i < amount; i++) {
                            localArray.push(
                                <nav className="blanks">

                                </nav>
                            )  
                        }
                        mappedProps.push(localArray)
                    }
                })
                return mappedProps
            }
        } else {
            middleRows = () => {
                return <div className='location_rota_loading'><img src={spinner} alt="Loading"/></div>
            }
        }

        // send data to database from from
        const handleSubmitButton = (myDate, id, location) => {
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
                driver_id: `https://pythonicbackend.herokuapp.com/drivers/${id}/`
            }).then( response => {
                if (data) {
                    let matchingId = /\d/.exec(response.driver_id)
                    data.data.drivers.forEach( (ele, id) => {
                        if (ele.driver_id === matchingId) {
                            ele.datesArray.push(response)
                        }
                    })
                    getData ? setGetData(false) : setGetData(true)
                    setMiddleRow(middleRows())
                }
            })
        }

        const handleSubmitButtonPut = (myDate, id, location) => {
            let scheduleDateId = -1
            data.data.drivers.forEach( ele => {
                if (ele.driver_id === id) {
                    ele.datesArray.forEach( element => {
                        console.log(element.date, myDate)
                        if (element.date === myDate) {
                            scheduleDateId = element.date_id
                            console.log('found date')
                        }
                    })
                }
            })
            let myDateTime = new Date()
            let hours = myDateTime.getHours()
            let minutes = myDateTime.getMinutes()

            let timeEntry = `${hours}:${minutes}`
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
            console.log(scheduleDateId, `https://pythonicbackend.herokuapp.com/drivers/${id}/`)
            
            postData(`https://pythonicbackend.herokuapp.com/schedule/${scheduleDateId}/`, {
                logIn_time: timeEntry,
                logOut_time: timeEntry,
                location: location,
                driver_id: `https://pythonicbackend.herokuapp.com/drivers/${id}/`
            }).then( response => {
                console.log(response)
                if (data) {
                    let matchingId = /\d/.exec(response.driver_id)
                    data.data.drivers.forEach( (ele, id) => {
                        if (ele.driver_id === matchingId) {
                            ele.datesArray.push(response)
                        }
                    })
                    getData ? setGetData(false) : setGetData(true)
                    setMiddleRow(middleRows())
                }
            })
        }
        
        // when click on a date to book
        const handleClick = (e, weekDaySelected, id, location) => {
            e.preventDefault()
            let locationvar
            if (e.target.text === 'IN') {
                locationvar = props.selectedCity
            } else {
                locationvar = e.target.text
            }
            handleSubmitButton(weekDaySelected, id, locationvar)
            // setMiddleRow(makeForm(null, weekDaySelected, theName, datesList, id, location))
        }

        const handleClickPut = (e, weekDaySelected, id, location) => {
            e.preventDefault()
            let locationvar
            if (e.target.text === 'IN') {
                locationvar = props.selectedCity
            } else {
                locationvar = e.target.text
            }
            handleSubmitButtonPut(weekDaySelected, id, locationvar)
            // setMiddleRow(makeForm(null, weekDaySelected, theName, datesList, id, location))
        }

        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate, data, props, getData, calenderDivs, calenderDivsInner, calenderDivsInnerBooked, selectedResponse, menuVisibility])

    return (
        <div className='single_week_grid'>
            <div className='top_row'>
                {topRow}
            </div>
            <div className={`${middleRowClass}`}>
                {middleRow}
            </div>
            <div className='bottom_row'>
                {bottomRow}
            </div>
        </div>
    )
}

export default DivSingleWeek
