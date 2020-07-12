/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import 'react-dropdown/style.css';
import spinner from '../images/spinner.svg'
import axios from 'axios'

var myInterval
const HomeTwo = (props) => {
    var CryptoJS = require("crypto-js");
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ schedule, setSchedule ] = useState(null)
    const [ loadGate, setLoadGate ] = useState(0)
    const [ theDateRandom, setTheDateRandom ] = useState(new Date())
    const [ data, setData ] = useState(null)
    const [ verifiedDocumentsDivs, setVerifiedDocumentsDivs ] = useState(null)
    const [ expirationList, setExpirationList ] = useState(null)
    const [ quoteOfDay, setQuoteOfDay ] = useState(null)
    const [ quoteOfDayArray, setQuoteOfDayArray ] = useState(null)
    const [ todaysDrivers, setTodaysDrivers ] = useState(null)

    // grab the data
    useEffect(() => {
        var CryptoJS = require("crypto-js");
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedDate(myDate)

        async function getData(url = '') {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
            setLoadGate(1)
            getData('https://pythonicbackend.herokuapp.com/data/').then( (response ) => {
                setData(response)
                axios.get('https://quotes.rest/qod/inspire').then( response => {
                    setQuoteOfDay(response.data.contents.quotes[0])
                })
            })
        })
    }, [])

    // map todays booked drivers
    var chart
    useEffect( () => {
        if (schedule) {
            var randomDate 
            randomDate = theDateRandom.toDateString()
            let localNum = 0
            schedule.forEach( (ele, id) => {
                if (ele.date === randomDate.toString() && ele.location === selectedCity) {
                    localNum++
                }
            })
            setTodaysDrivers(
                <h3>Drivers Today at {selectedCity}: {localNum}</h3>
            )
        }
    }, [schedule, selectedCity])

    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
    }

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

    var dayArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // map the verified documents
    useEffect( () => {
        let localArray = []
        let expirationDatesArray = []
        let expirationDatesArrayDivs = []
        let rejected = 0
        let approved = 0
        let pending = 0
        let thirtyDaysNotice = currentDate.setDate(currentDate.getDate() + 30)
        if (data) {
            data.data.images.forEach( image => {
                // docs for verification part
                if (image.verified !== ('True' || 'False')) {
                    pending++
                } else if (image.verified === 'True'){
                    approved++
                } else {
                    rejected++
                }

                if (new Date(image.expiryDate) < thirtyDaysNotice) {
                    expirationDatesArray.push(image)
                }
            })
        }
        localArray.push(
            <div className='docs_for_verification_home'>
                <div className='rejected_div'><h3 className='remove_padding'>{rejected} Rejected</h3></div>
                <div className='approved_div'><h3 className='remove_padding'>{approved} Approved</h3></div>
                <div className='pending_div'><h3 className='remove_padding'>{pending} Pending</h3></div>
            </div>
        )
        setVerifiedDocumentsDivs(localArray)
        expirationDatesArray.forEach( (image, imageID) => {
            expirationDatesArrayDivs.push(
                <>
                    <h3 className='remove_padding_align'>{image.vehicle_id !== 'None' ? `Van Registration: ${image.vehicle_id}` : `Driver: ${image.driver_id}`}</h3>
                    <h3 className='remove_padding_align'>Document Name: {image.name}</h3>
                    <h3 className='remove_padding_align'>Expiration Date: {new Date(image.expiryDate).toDateString()}</h3>
                    <br />
                </>

            )
        })
        setExpirationList(expirationDatesArrayDivs)
    }, [data])

    useEffect( () => {
        let localArray = []
        if (quoteOfDay) {
            localArray.push(
                <div>
                    <h3 className='remove_padding_align'>{quoteOfDay.quote}</h3>
                    <br />
                    <h4 className='remove_padding_align'>- {quoteOfDay.author}</h4>
                </div>
            )
        }
        setQuoteOfDayArray(localArray)
    }, [quoteOfDay])

    var content
    if (loadGate > 0) {
        content = (
            <div className='home_content'>
            <NavigationBar title='Home' superUser={props.superUser ? true : false}/>
                <div className='main_content_home_two'>
                    <div className='calandar_container'>
                        <div>
                            <div className='home_details'>
                                <h2>Welcome {props.user_name}</h2>
                                {todaysDrivers}
                                <nav className="menu_white">
                                    <ol>
                                        <li className="menu-item" id='white_top'><a href="#0" id='menu_text_white'>{selectedCity}</a>
                                            <ol className="sub-menu">
                                                <li className="menu-item" id='item_white_one' onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0" id='menu_text_white'>Bristol</a></li>
                                                <li className="menu-item" id='item_white_two' onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0" id='menu_text_white'>Swansea</a></li>
                                                <li className="menu-item" id='item_white_three' onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0" id='menu_text_white'>Exeter</a></li>
                                                <li className="menu-item" id='item_white_three' onClick={(e, city) => handleSelectCity(e, 'DXP1')}><a href="#0" id='menu_text_white'>Plymouth</a></li>
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <h3 className='home_time'>
                                {dayArray[currentDate.getDay()]}, {currentDate.getDate()} {monthArray[currentDate.getMonth()]}, {currentDate.getFullYear()}
                                <br />
                                {currentDate.toLocaleTimeString()}
                                <br />
                                Week: {currentDate.getWeek()}
                            </h3>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='lower_home_page'>
                        <div className='inner_lower_home_container' id='left_one'>
                            <h2>Documents For Verification</h2>
                            {verifiedDocumentsDivs}
                        </div>
                        <div className='inner_lower_home_container' id='center_one'>
                            <h2>Upcoming Expiration Dates</h2>
                            <div className='docs_for_verification_home_expiration'>
                                {expirationList}
                            </div>
                        </div>
                        <div className='inner_lower_home_container' id='right_one'>
                            <h2>Quote Of The Day</h2>
                            <div className='docs_for_verification_home_expiration'>
                                {quoteOfDayArray}
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    } else {
        content = (
            <div className='loading_home_div'>
                <img src={spinner} alt="Loading"/>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default HomeTwo
