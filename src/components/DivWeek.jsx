/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'

const DivWeek = (props) => {
    var CryptoJS = require("crypto-js");
    const [ overAllDivs, setOverAllDivs ] = useState([])
    const [ theDate, setTheDate ] = useState(new Date())

    useEffect( () => {
        // last weeks divs
        if (props.scheduleDates) {
            const lastWeekDivCreation = () => {
                let lastWeekDivs = []
                let selectedDate = new Date(props.currentDate)
                for (let i = 7; i > 0; i--) {
                    let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() - i)).toDateString()
                    let count = 0
                    props.scheduleDates.forEach( (scheduleEle, id) => {
                        if (dateVar === scheduleEle.date) {
                            count += 1
                        }
                    })
                    lastWeekDivs.push(
                            <div key={i} className={dateVar === theDate.toDateString() ? 'cal_divs_current' : 'cal_divs'}>
                                <h4 className='inner_calander_text'>
                                    {dateVar}<br /><br />
                                    Booked Drivers: {count}
                                </h4>
                            </div>)
                    selectedDate.setDate(selectedDate.getDate() + i )
                }
                return lastWeekDivs
            }
            
            // this weeks divs
            function thisWeekDivs (lastWeekDivs) {
                let thisWeekDivs = []
                let selectedDate = new Date(props.currentDate)
                for (let i = 0; i < 7; i++) {
                    let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
                    let count = 0
                    props.scheduleDates.forEach( (scheduleEle, id) => {
                        if (dateVar === scheduleEle.date) {
                            count += 1
                        }
                    })
                    thisWeekDivs.push(
                            <div key={i+8} className={dateVar === theDate.toDateString() ? 'cal_divs_current' : 'cal_divs'}>
                                <h4 className='inner_calander_text'>
                                    {dateVar}<br /><br />
                                    Booked Drivers: {count}
                                </h4>
                            </div>)
                    selectedDate.setDate(selectedDate.getDate() - i )
                }  
                let almostFinalDivs = [...lastWeekDivs, ...thisWeekDivs]
                return almostFinalDivs
            }
        
            // next weeks divs
            function nextWeekDivs (thisWeekDivs) {
                let nextWeekDivs = []
                let selectedDate = new Date(props.currentDate)
                for (let i = 7; i < 14; i++) {
                    let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
                    let count = 0
                    props.scheduleDates.forEach( (scheduleEle, id) => {
                        if (dateVar === scheduleEle.date) {
                            count += 1
                        }
                    })
                    nextWeekDivs.push(
                        <div key={i+8} className={dateVar === theDate.toDateString() ? 'cal_divs_current' : 'cal_divs'}>
                            <h4 className='inner_calander_text'>
                                {dateVar}<br /><br />
                                Booked Drivers: {count}
                            </h4>
                        </div>)
                    selectedDate.setDate(selectedDate.getDate() - i )
                }  
                let finalDivs = [...thisWeekDivs, ...nextWeekDivs]
                return finalDivs
            }
        
            // all the divs for rendering
            setOverAllDivs(nextWeekDivs(thisWeekDivs(lastWeekDivCreation())))
        }
    }, [props.currentDate, props.scheduleDates, props.selectedLocation, theDate])
    
    return (
        <div className='three_week_calendar'>
            {overAllDivs}
        </div>
    )
}

export default DivWeek