/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/coloration.png'

// send automated emails dependant on expirey dates
// mark driver as compliant or not

var myInterval
const NavigationBar = (props) => {
    var CryptoJS = require("crypto-js");
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ subMenuText, setSubMenuText ] = useState('Compliance Menu')
    const [ makeVisible, setMakeVisible ] = useState('menu_rota_sub_none')
    
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

    var createManagerPage
    if (props.superUser) {
        createManagerPage = (
            <Link to="/manager" className='links'> 
                <div className='link_style'>
                    Create Manager
                </div>
            </Link>
        )
    }

    // handle the nav menu
    const handleMouseEnter = () => {
        setMakeVisible('menu_rota_sub_nav')
    }

    // handle the nav menu
    const handleChangeTitle = (e, values) => {
        setSubMenuText(values)
    }

    // handle the nav menu
    const handleMouseleave = () => {
        setMakeVisible('menu_rota_sub_none')
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
                {createManagerPage}
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
                <div className='links' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseleave}>
                    <div className='link_style'>
                        Compliance
                        <nav className={makeVisible} id='top_menu_nav'>
                            <ol>
                                <li className="menu-item" id='remove_border_please'><a href="#0" id='top_menu_nav'>{subMenuText}</a>
                                    <ol className="sub-menu" >
                                        <li className="menu-item"  id="nav_menu_sub" onMouseEnter={(e, values) => handleChangeTitle(e, 'Main Page')}>
                                            <Link to="/compliance" id='link_style_sub_menu'>
                                                    <a href="#0" >
                                                        Main Page
                                                    </a>
                                            </Link>
                                        </li>
                                        <li className="menu-item" id="nav_menu_sub" onMouseEnter={(e, values) => handleChangeTitle(e, 'Docs for Verification')}>
                                            <Link to='/documentsforverification' id='link_style_sub_menu'>
                                                <a href="#0" >
                                                    Docs for Verification
                                                </a>
                                            </Link>
                                        </li>
                                        
                                        <li className="menu-item" id="nav_menu_sub" onMouseEnter={(e, values) => handleChangeTitle(e, 'Driver Documents')}>
                                            <Link to='/driverdocuments' id='link_style_sub_menu'>
                                                <a href="#0" >
                                                    Driver Documents
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="menu-item" id="nav_menu_sub" onMouseEnter={(e, values) => handleChangeTitle(e, 'Driver Compliance')}>
                                            <Link to='drivercompliancecheck' id='link_style_sub_menu'>
                                                <a href="#0" >
                                                    Driver Compliance 
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="menu-item" id="nav_menu_sub" onMouseEnter={(e, values) => handleChangeTitle(e, 'Company Vans')}>
                                            <Link to='/companyvans' id='link_style_sub_menu'>
                                                <a href="#0" >
                                                    Company Vans
                                                </a>
                                            </Link>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
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
                <Link to="/rentalvantracker" className='links'>
                    <div className='link_style'>
                        Rental Van Tracker
                    </div>
                </Link>
                <Link to="/summary" className='links'>
                    <div className='link_style'>
                        Payroll
                    </div>
                </Link>
            </div>
        </>
    )
}
// dashboard, , daily work, invoice work, vehical checklist, driver documents

export default NavigationBar