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

    }, [getData])

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
            var lastWeekDivsArray = []
            let localArray  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4 className='inner_calander_text'>Total for week:</h4></div>)
            for (let i = 0; i < amount; i++) {
                lastWeekDivsArray.push(<div key={i+50} className={`${calenderDivs}`}><h4 className='inner_calander_text'>{localArray[i]}</h4></div>)
            }  
            return lastWeekDivsArray
        }

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
                                // eslint-disable-next-line no-loop-func
                                <div key={Math.random()} className={`${calenderDivsInner}`} onClick={(e) => handleClick(e, checkForDate[i], ele.name, ele.datesArray, ele.driver_id, ele.location)}>
                                    <h4 className='inner_calander_text'>
                                        ---
                                    </h4>
                                </div>  
                            )  
                        }
                        // eslint-disable-next-line no-loop-func
                        ele.datesArray.forEach( (dateEle) => {
                            if (checkForDate.includes(dateEle.date)) {
                                localArray[checkForDate.indexOf(dateEle.date)+1] = ( 
                                    <div  className={`${calenderDivsInnerBooked}`} key={Math.random()} >
                                        <h3 className='inner_calander_text'>
                                            {dateEle.location} 
                                        </h3>
                                    </div>
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

        // render the form div
        const makeForm = (dateSelection, nameSelection, dateList, id, location) => {
            const handleSubmit = (e) => { 
                e.preventDefault()
                let station = e.target.location.value ? e.target.location.value : location
                handleSubmitButton(dateSelection, id, station)
            } 
            return (
                <div className='inner_calender_form'>
                    <div className='inner_form_div'>
                        <form onSubmit={handleSubmit} autoComplete='on'>
                            <h3>Name: {nameSelection}</h3>
                            <h3>Date: {dateSelection}</h3>
                            <h3>Depot: <input type="text" name='location' placeholder={location}/></h3>
                            <input type='submit' className='form_button' value='Add Work' />
                        </form>
                    </div>
                </div>
            )
        }

        // when click on a date to book
        const handleClick = (e, weekDaySelected, theName, datesList, id, location) => {
            e.preventDefault()
            setMiddleRow(makeForm(weekDaySelected, theName, datesList, id, location))
        }

        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate, data, props, getData, calenderDivs, calenderDivsInner, calenderDivsInnerBooked])

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



