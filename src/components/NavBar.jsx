import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logoMinified.png'

// send automated emails dependant on expirey dates
// mark driver as compliant or not

var myInterval
const NavigationBar = (props) => {
    const [ currentDate, setCurrentDate ] = useState(new Date())
    
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

    return (
        <>
            <div className='nav_bar_top'>
                <h1 className='middle_nav'>{props.title}</h1>
                {/* <h3 className='nav_current_date'>{dayArray[currentDate.getDay()]} {currentDate.getDate()} {monthArray[currentDate.getMonth()]} {currentDate.getFullYear()}
                {' | '}
                Week: {currentDate.getWeek()}
                {' | '}
                {currentDate.toLocaleTimeString()}
                </h3> */}
            </div>
            <div className='nothing'>
                <Link to="/home"><img src={logo} alt="" className='nav_bar_logo'/></Link> 
            </div>
            <div className='nav_bar'>
                <Link to="/home" className='links'> 
                    <div className='link_style'>
                        Home
                    </div>
                </Link>
                <Link to="/dashboard" className='links'>
                    <div className='link_style'>
                        Daily Service 
                    </div>
                </Link>
                <Link to="/weekschedule" className='links'>
                    <div className='link_style'>
                        Location Rota 
                    </div>
                </Link>
                <Link to="/documentation" className='links'>
                    <div className='link_style'>
                        Compliance
                    </div>
                </Link>
                <Link to="/invoicework" className='links'>
                    <div className='link_style'>
                        Invoices
                    </div>
                </Link>
                <Link to="/forms" className='links'>
                    <div className='link_style'>
                        Forms
                    </div>
                </Link>
                <Link to="/statistics" className='links'>
                    <div className='link_style'>
                        Reports
                    </div>
                </Link>
                <Link to="/makemployee" className='links'>
                    <div className='link_style'>
                        Drivers
                    </div>
                </Link>
            </div>
        </>
    )
}
// dashboard, , daily work, invoice work, vehical checklist, driver documents

export default NavigationBar