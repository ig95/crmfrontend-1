import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Documents from '../components/Documents'
import Daily from '../components/Daily'
import Details from '../components/Details'
import Invoices from '../components/Invoices'
import Training from '../components/training'

const Driver = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())

    const [ gate, setGate ] = useState('')

    // CONTENT SECTIONS
    var mainContent
    const handleClick = (e, details) => {
        setGate(details)
    }
    
    if (gate === 'documents') {
        mainContent = <Documents selectedDriver={selectedDriver}/>
    } else if (gate === 'details') {
        mainContent = <Details />
    } else if (gate === 'daily') {
        mainContent = <Daily />
    } else if (gate === 'invoices') {
        mainContent = <Invoices />
    } else if (gate === 'training') {
        mainContent = <Training />
    }


    useEffect( () => {
        // development data
        let devObject = {
            employee_id: 1,
            name: "Nicholas Shankland",
            inOff: 1,
            location: "DBS2",
            route: "DBS2",
            mileage: 0,
            parcel: 0,
            LWP: 0,
            LVP: 0,
            CRT: 0,
            RL: 0,
            SUP: "0.0000",
            fuel: "0.0000",
            vans: "0.0000",
            supportDeductions: "0.0000",
            documents: [],
            datesList: [],
        }
        setSelectedDriver(devObject)


        // let currentDate = /driver(.*)/.exec(window.location.href)[0].replace(/driver\//, '')
        // let driverID = parseInt(currentDate[0])
        // let selectedDate = currentDate.slice(2)
        // let finalDate = new Date(selectedDate.slice(0,3).concat(' ').concat(selectedDate.slice(3, 6)).concat(' ').concat(selectedDate.slice(6,8)).concat(' ').concat(selectedDate.slice(8,12)))
        // setSelectedDate(finalDate)
        // props.driver_data.forEach( (ele, id) => {
        //     console.log(ele.employee_id, ' ', driverID)
        //     if (ele.employee_id === driverID) {
        //         console.log(ele)
        //         setSelectedDriver(ele)
        //         setSelectedDate(finalDate)
        //     }
        // })
    }, [props.driver_data, props])

    // title at top
    const mainTitleDriverPage = (
        <div className='main_title_driver_page_inc'>
            <h1 className='driver_page_title'>{selectedDriver ? selectedDriver.name : 'loading'}</h1>
            <h3 className='driver_page_title_under'>{selectedDriver ? selectedDriver.location : 'loading'}</h3>
        </div>
    )

    // left Nav
    const leftNav = (
        <div className='left_nav_driver_page'>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'details')}>
                <h3>Details</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'daily')}>
                <h3>Daily Operations</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'invoices')}>
                <h3>Invoices</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'training')}>
                <h3>Trainings</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'documents')}>
                <h3>Documents</h3>
            </div>
        </div>
    )

    return (
        <div className='home_content'>
            <NavigationBar />
            <div className='main_content_driver'>
                {mainTitleDriverPage}
                {leftNav}
                {mainContent}
            </div>
        </div>
    )
}

export default Driver