import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const DivWeek = (props) => {

    // last weeks divs
    const lastWeekDivCreation = () => {
        let lastWeekDivs = []
        let selectedDate = props.currentDate
        for (let i = 7; i > 0; i--) {
            let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() - i)).toDateString()
            lastWeekDivs.push(<Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} className='cal_divs'><div key={i}><h4 className='inner_calander_text'>{dateVar}</h4></div></Link>)
            selectedDate.setDate(selectedDate.getDate() + i )
        }
        return lastWeekDivs
    }
    
    // this weeks divs
    function thisWeekDivs (lastWeekDivs) {
        let thisWeekDivs = []
        let selectedDate = props.currentDate
        for (let i = 0; i < 7; i++) {
            let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
            thisWeekDivs.push(<Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} className='cal_divs'><div key={i+8}><h4 className='inner_calander_text'>{dateVar}</h4></div></Link>)
            selectedDate.setDate(selectedDate.getDate() - i )
        }  
        let almostFinalDivs = [...lastWeekDivs, ...thisWeekDivs]
        return almostFinalDivs
    }

    // next weeks divs
    function nextWeekDivs (thisWeekDivs) {
        let nextWeekDivs = []
        let selectedDate = props.currentDate
        for (let i = 7; i < 14; i++) {
            let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
            nextWeekDivs.push(<Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} className='cal_divs'><div key={i+8}><h4 className='inner_calander_text'>{dateVar}</h4></div></Link>)
            selectedDate.setDate(selectedDate.getDate() - i )
        }  
        let finalDivs = [...thisWeekDivs, ...nextWeekDivs]
        return finalDivs
    }

    // all the divs for rendering
    const overAllDivs = nextWeekDivs(thisWeekDivs(lastWeekDivCreation()))
    return (
        <>
            {overAllDivs}
        </>
    )
}

export default DivWeek