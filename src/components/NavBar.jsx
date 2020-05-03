import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import triangle from '../images/triangle.png'

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

    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    return (
        <>
            <div className='nav_bar_top'>
                <h1 className='middle_nav'>{props.title}</h1>
                <h3 className='nav_current_date'>{dayArray[currentDate.getDay()]} {currentDate.getDate()} {monthArray[currentDate.getMonth()]} {currentDate.getFullYear()}
                {' | '}
                Week: {currentDate.getWeek()}
                {' | '}
                {currentDate.toLocaleTimeString()}
                </h3>
            </div>
            <div className='nothing'>

            </div>
            <div className='nav_bar'>
                <Link to="/home" className='links'> 
                    <div className='link_style'>
                        Summary 
                    </div>
                </Link>
                <Link to="/dashboard" className='links'>
                    <div className='link_style'>
                        Dashboard 
                    </div>
                </Link>
                <Link to="/makemployee" className='links'>
                    <div className='link_style'>
                        New Driver
                    </div>
                </Link>
                <Link to="/weekschedule" className='links'>
                    <div className='link_style'>
                        Location Rota 
                    </div>
                </Link>
                <Link to="/invoicework" className='links'>
                    <div className='link_style'>
                        Invoice Work 
                    </div>
                </Link>
                <Link to="/statistics" className='links'>
                    <div className='link_style'>
                        Statistics 
                    </div>
                </Link>
                <Link to="/documentation" className='links'>
                    <div className='link_style'>
                        Documents 
                    </div>
                </Link>
            </div>
        </>
    )
}
// dashboard, , daily work, invoice work, vehical checklist, driver documents

export default NavigationBar