import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

const SingleDay = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentDate, setCurrentDate] = useState(new Date())


    useEffect( () => {
        let currentDate = /SingleDay(.*)/.exec(window.location.href)[0].replace(/SingleDay\//, '')
        let dateArray = currentDate.split('')
        let finalDate = dateArray[0]+dateArray[1]+dateArray[2]+' '+dateArray[3]+dateArray[4]+dateArray[5]+' '+dateArray[6]+dateArray[7]+' ' +dateArray[8]+dateArray[9]+dateArray[10]+dateArray[11]
        setSelectedDate(new Date(finalDate))
    }, [])

    useEffect( () => {
        setInterval( () => {
            setCurrentDate(new Date())
        }, 1000)
    }, [])

    return (
        <div className='home_content'>
            <div className='nav_bar'>
                <div className='drop_down_hamburger'>
                    <div className='nav_line'></div>
                    <div className='nav_line'></div>
                    <div className='nav_line'></div>
                    <div className='drop_down_content'>
                        <div className='link_style'>
                            <Link to="/" className='links'>Home</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Schedule for: {selectedDate.toDateString()}</h1>
                </div>
                <div>
                    <h3 className='nav_current_date'>{currentDate.toDateString()} {' | '}{currentDate.toLocaleTimeString()}</h3>
                </div>
            </div>
            
        </div>
    )
}

export default SingleDay