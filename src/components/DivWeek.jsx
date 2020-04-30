import React, { useState, useEffect} from 'react'

const DivWeek = (props) => {
    const [ overAllDivs, setOverAllDivs ] = useState([])

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
                        // <Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} >
                            <div key={i} className='cal_divs'>
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
                    // <Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} >
                            <div key={i+8} className='cal_divs'>
                                <h4 className='inner_calander_text'>
                                    {dateVar}<br /><br />
                                    Booked Drivers: {count}
                                </h4>
                            </div>)
                        // </Link>)
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
                    // <Link to={`/SingleDay/${dateVar.toString().split(' ').join('')}/${props.selectedLocation}`} >
                        <div key={i+8} className='cal_divs'>
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
    }, [props.currentDate, props.scheduleDates, props.selectedLocation])
    
    return (
        <>
            {overAllDivs}
        </>
    )
}

export default DivWeek