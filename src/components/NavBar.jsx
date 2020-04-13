import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
    const [ currentDate, setCurrentDate ] = useState(new Date())

    return (
        <div className='nav_bar'>
            <div className='drop_down_hamburger'>
                <div className='nav_line'></div>
                <div className='nav_line'></div>
                <div className='nav_line'></div>
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
            <div>
                <h1>{props.title}</h1>
            </div>
            <div>
                <h3 className='nav_current_date'>{currentDate.toDateString()}{' | '}{currentDate.toLocaleTimeString()}</h3>
            </div>
        </div>
    )
}

export default NavigationBar