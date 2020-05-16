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

    // making the rows
    useEffect( () => {
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
            thisWeekDivsArray.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>Search Bar</h4></div>)
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
            lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>Total for Day:</h4></div>)

            
            // make sure all data needed is available
            if (data && props && checkForDate) {
                // create array to increment
                let localArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                console.log(data)

                // loop through each index in the amount of divs refrenced
                for (let i = 0; i < amount; i++) {

                    // check each date for each driver sum them
                    // eslint-disable-next-line no-loop-func
                    data.data.drivers.forEach( (ele) => {
                        ele.datesArray.forEach( (date) => {
                            if (date.date === checkForDate[i]) {
                                console.log('hello there')
                                localArray[i] = localArray[i] + 1
                            }

                        })
                    })
                    lastWeekDivsArray.push(<div key={i+50} className={`${calenderDivs}`}><h4 className='inner_calander_text'>{localArray[i]}</h4></div>)
                }
            }
            return lastWeekDivsArray
        }

    // get sundays
    const getSundays = () => {
        let bookingOptions = []
        let optionsArray = [
            'IN',
            'CT',
            'RT',
            'Holiday'
        ]
        optionsArray.forEach( ele => {
            bookingOptions.push(
                <li className="menu-item" id='sub_menu_options' >
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
        if (data && props) {
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
                                        <li className="menu-item"><a href="#0" id='menu_rota_a' >OFF</a>
                                            <ol className="sub-menu" onClick={(e) => handleClick(e, checkForDate[i], ele.driver_id, ele.location)}>
                                                {optionsThree}
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            )  
                        }
                        // eslint-disable-next-line no-loop-func
                        ele.datesArray.forEach( (dateEle) => {
                            if (checkForDate.includes(dateEle.date)) {
                                let colorChange
                                // eslint-disable-next-line default-case
                                switch (dateEle.location) {
                                    case 'DEX2':
                                        colorChange = 'menu_rota_in' 
                                        break;
                                    case 'DSN1':
                                        colorChange = 'menu_rota_in' 
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
                                localArray[checkForDate.indexOf(dateEle.date)+1] = (
                                    <nav className={colorChange}>
                                        <ol>
                                            <li className="menu-item"><a href="#0" id='menu_rota_a'>{dateEle.location === props.selectedCity ? 'IN' : dateEle.location}</a>
                                                <ol className="sub-menu" >
                                                    {optionsThree}
                                                </ol>
                                            </li>
                                        </ol>
                                    </nav>
                                )
                            }
                        })
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
        
        // when click on a date to book
        const handleClick = (e, weekDaySelected, id, location) => {
            e.preventDefault()
            console.log(e.target.text)
            let locationvar
            if (e.target.text === 'IN') {
                locationvar = props.selectedCity
            } else {
                locationvar = e.target.text
            }
            handleSubmitButton(weekDaySelected, id, locationvar)
            // setMiddleRow(makeForm(null, weekDaySelected, theName, datesList, id, location))
        }

        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate, data, props, getData, calenderDivs, calenderDivsInner, calenderDivsInnerBooked, selectedResponse])

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





        // function handleSelectCity(e, city, dateSelection, nameSelection, dateList, id, location) {
        //     e.preventDefault()
        //     setSelectedResponse(city)
        //     setMiddleRow(makeForm(city, dateSelection, nameSelection, dateList, id, location))
        // }

        // // render the form div
        // const makeForm = (city, dateSelection, nameSelection, dateList, id, location) => {
        //     let theCity
        //     city ? theCity = city : theCity = selectedResponse
        //     const handleSubmit = (e) => { 
        //         e.preventDefault()
        //         let station = theCity
        //         handleSubmitButton(dateSelection, id, station)
        //     } 
        //     return (
        //         <div className='inner_calender_form'>
        //             <div className='inner_form_div'>
        //                 <form onSubmit={handleSubmit} autoComplete='on'>
        //                     <h3>Name: {nameSelection}</h3>
        //                     <h3>Date: {dateSelection}</h3>
        //                     <nav className="menu">
        //                         <ol>
        //                             <li className="menu-item"><a href="#0">{theCity}</a>
        //                                 <ol className="sub-menu">
        //                                     <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2', dateSelection, nameSelection, dateList, id, location)}><a href="#0">DBS2</a></li>
        //                                     <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1', dateSelection, nameSelection, dateList, id, location)}><a href="#0">DSN1</a></li>
        //                                     <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2', dateSelection, nameSelection, dateList, id, location)}><a href="#0">DEX2</a></li>
        //                                     <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'CT', dateSelection, nameSelection, dateList, id, location)}><a href="#0">CT</a></li>
        //                                     <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'MFN', dateSelection, nameSelection, dateList, id, location)}><a href="#0">MFN</a></li>
        //                                 </ol>
        //                             </li>
        //                         </ol>
        //                     </nav>
        //                     <input type='submit' className='form_button' value='Add Work' />
        //                 </form>
        //             </div>
        //         </div>
        //     )
        // }

