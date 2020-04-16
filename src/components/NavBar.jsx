import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import triangle from '../images/triangle.png'

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

    return (
        <div className='nav_bar'>
            <div className='nav_left_content'>
                {/* drivers */}
                <div className='drop_down_hamburger'>
                    <div className='nav_title'>Workforce {
                        <img 
                            src={triangle} 
                            className='triangleImage'
                            alt='Triangle'
                        />}
                    </div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                        <div className='link_style'>
                            <Link to="/makemployee" className='links'>Make Employee</Link>
                        </div>
                        <div className='link_style'>
                            <Link to="/depots" className='links'>Depots</Link>
                        </div>
                        <div className='link_style'>
                            <Link to="/weekschedule" className='links'>Week Schedule</Link>
                        </div>
                    </div>
                </div>
                <div className='nav_title'>
                    |
                </div>
                {/* vehicles */}
                <div className='drop_down_hamburger'>
                        <div className='nav_title'>Vehicles {
                        <img 
                            src={triangle} 
                            className='triangleImage'
                            alt='Triangle'
                        />}</div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                    </div>
                </div>
                <div className='nav_title'>
                    |
                </div>
                {/* Billing */}
                <div className='drop_down_hamburger'>
                        <div className='nav_title'>Billing {
                        <img 
                            src={triangle} 
                            className='triangleImage'
                            alt='Triangle'
                        />}</div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                    </div>
                </div>
                <div className='nav_title'>
                    |
                </div>
                {/* History */}
                <div className='drop_down_hamburger'>
                        <div className='nav_title'>History {
                        <img 
                            src={triangle} 
                            className='triangleImage'
                            alt='Triangle'
                        />}</div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                    </div>
                </div>
            <div className='nav_title'>
                |
            </div>
            </div>
            <div className='middle_nav'>
                <h1>{props.title}</h1>
            </div>
            <div>
                <h3 className='nav_current_date'>{currentDate.toDateString()}{' | '}{currentDate.toLocaleTimeString()}</h3>
            </div>
        </div>
    )
}

export default NavigationBar