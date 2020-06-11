import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import axios from 'axios'
import 'react-dropdown/style.css';

var myInterval
const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ schedule, setSchedule ] = useState(null)
    const [ loadingGate, setLoadingGate ] = useState(0)
    const [ theDateRandom, setTheDateRandom ] = useState(new Date())
    const [ verifiedDocumentsDivs, setVerifiedDocumentsDivs ] = useState(null)
    const [ expirationList, setExpirationList ] = useState(null)
    const [ quoteOfDay, setQuoteOfDay ] = useState(null)
    const [ quoteOfDayArray, setQuoteOfDayArray ] = useState(null)
    const [ data, setData ] = useState(null)
    

    // grab the data
    useEffect(() => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedDate(myDate)
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

        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
            setLoadingGate(1)
            setTimeout( () => {
                setLoadingGate(2)
            }, 1000)
            getData('https://pythonicbackend.herokuapp.com/data/').then( (response ) => {
                setData(response)
                axios.get('https://quotes.rest/qod/inspire').then( response => {
                    setQuoteOfDay(response.data.contents.quotes[0])
                })
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

    // map todays booked drivers
    var chart
    var todaysDrivers
    if (schedule) {
        var randomDate 
        randomDate = theDateRandom.toDateString()
        let localNum = 0
        let dbs2Drivers = 0
        let dex2Drivers = 0
        let dsn1Drivers = 0
        schedule.forEach( (ele, id) => {
            if (ele.date === randomDate.toString()) {
                if (ele.location === 'DBS2') {
                    dbs2Drivers++
                } else if (ele.loaction === 'DEX2') {
                    dex2Drivers++
                } else {
                    dsn1Drivers++
                }
            }
            if (ele.date === randomDate.toString() && ele.location === selectedCity) {
                localNum++
            }
        })
        todaysDrivers = (
            <h3>Drivers Today at {selectedCity}: {localNum}</h3>
        )
    }
    
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
            console.log(data)
            data.data.images.forEach( image => {
                // docs for verification part
                console.log(image)
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
        console.log(expirationDatesArray)
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
    if (loadingGate === 2) {
        content = (
            <>
                <div className='home_content'>
                <NavigationBar title='Home' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
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
                                                    <li className="menu-item" id='item_white_two' onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0" id='menu_text_white'>Swindon</a></li>
                                                    <li className="menu-item" id='item_white_three' onClick={(e, city) => handleSelectCity(e, 'DEX2 ')}><a href="#0" id='menu_text_white'>Exeter</a></li>
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
            </>
        )
    } else if (loadingGate === 0) {
        content = (
            <div className="header">
                <div className="inner-header flex">
                    <h1>Welcome {props.user_name}... we are loading you content</h1>
                </div>
                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(120, 209, 212, .8)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(38, 135, 199, .6)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(120, 209, 212, .4)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(38, 135, 199)" />
                    </g>
                    </svg>
                </div>
                <div className='waves-background'></div>
            </div >
        )
    } else {
        content = (
            <div className='fade_class'>
                <div className="header">
                    <div className="inner-header flex">
                        <h1>Welcome {props.user_name}... we are loading you content</h1>
                    </div>
                    <div>
                        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(120, 209, 212, .8)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(38, 135, 199, .6)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(120, 209, 212, .4)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(38, 135, 199)" />
                        </g>
                        </svg>
                    </div>
                </div >
                <div className='waves-background'></div>
            </div>
        )
    }

    return (
        <>
            {content}
        </>    
    )
}

export default Home



        // var segment1 
        // var segment2 
        // if (dbs2Drivers || dex2Drivers || dsn1Drivers) {
        //     let theSum = dbs2Drivers + dex2Drivers + dsn1Drivers

        //     if (dbs2Drivers === 0 && dsn1Drivers === 0 && dex2Drivers !== 0 ) {
        //         segment1 = 0
        //         segment2 = 0
        //     }
        //     // dbs2
        //     if (dbs2Drivers !== 0) {
        //         if (dbs2Drivers/theSum === 1) {
        //             segment1 = 360
        //             segment2 = 0
        //         }
        //         segment1 = (dbs2Drivers/theSum) * 100
        //     } else {
        //         segment1 = 0
        //     }

        //     // dsn1
        //     if (dsn1Drivers !== 0) {
        //         if (dex2Drivers === 0) {
        //             segment2 = 100
        //         } else if (dsn1Drivers/theSum === 1) {
        //             segment2 = 360
        //             segment1 = 0
        //         } else {
        //             segment2 = (dsn1Drivers/theSum) * 100
        //         }
        //     } else {
        //         segment2 = 0
        //     }
        // }
        // if (segment1 || segment2) {
        //     chart = (
        //         <div className='chart_overall'>
        //             <div className='names_label'>
        //                 <h3>DBS2 <div className='colordivsblue'></div></h3>
        //                 <h3>DSN1 <div className='colordivsgreen'></div></h3>
        //                 <h3>DEX2 <div className='colordivsyellow'></div></h3>
        //             </div>
        //             <div 
        //                 className="pie" 
        //                 style={{
        //                     backgroundImage:
        //                         `conic-Gradient(#232F3E ${3.6 * segment1}deg, rgb(16, 109, 16) 0 ${3.6 * segment2}deg, rgb(134, 134, 45) 0)`
        //                 }}>
        //             </div>
        //         </div>
        //     )
        // }