import React, {useEffect, useState} from 'react'

const DivSingleWeek = (props) => {
    const [ topRow, setTopRow ]= useState([])
    const [ middleRow, setMiddleRow ]= useState([])
    const [ bottomRow, setBottomRow ]= useState([])

    useEffect( () => {
        // top row mapped divs
        var checkForDate = []
        function thisWeekDivs () {
            var thisWeekDivsArray = []
            let localDateArray = []
            let selectedDate = props.selectedDate
            thisWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Search Bar</h4></div>)
            for (let i = 0; i < 7; i++) {
                let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
                thisWeekDivsArray.push(<div key={i+8} className='cal_divs_single'><h5 className='inner_calander_text'>{dateVar}</h5></div>)
                localDateArray.push(dateVar)
                selectedDate.setDate(selectedDate.getDate() - i )
            }  
            checkForDate = localDateArray
            return thisWeekDivsArray
        }

        // middle row mapped divs
        function middleRows () {
            var mappedProps = []
            let localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1]
            console.log('*******************************************************************************************')
            console.log(checkForDate)
            for (let ele in props.drivers) {
                mappedProps.push(<div className='cal_divs_single_first'>{ele}</div>)
                for (let i = 0; i < 7; i++) {
                    if (checkForDate.includes(new Date(props.drivers[ele].booked[i]).toDateString())) {
                        localAwesomeArray[checkForDate.indexOf(new Date(props.drivers[ele].booked[i]).toDateString())] = i
                    }
                }
                console.log(localAwesomeArray)
                for (let i = 0; i < 7; i++) {
                    if (localAwesomeArray[i] !== -1) {
                        // logic for date booked or not
                        mappedProps.push(<div key={Math.random()} className='cal_divs_single_booked'>
                            <h5 className='inner_calander_text'>
                                'BOOKED'
                            </h5>
                        </div>)
                    } else {
                        // logic for date booked or not
                        mappedProps.push(<div key={Math.random()} className='cal_divs_single_table'>
                            <h5 className='inner_calander_text'>
                                
                            </h5>
                        </div>)
                    }
                }  
                localAwesomeArray = [-1, -1, -1, -1, -1, -1, -1]
            }
            return mappedProps
        }

        // bottom row mapped divs
        function bottomDivs () {
            var lastWeekDivsArray = []
            lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Total for week:</h4></div>)
            for (let i = 0; i < 7; i++) {
                lastWeekDivsArray.push(<div key={i+50} className='cal_divs_single'><h5 className='inner_calander_text'>{Math.floor(Math.random() * 100)}</h5></div>)
            }  
            return lastWeekDivsArray
        }

        setTopRow(thisWeekDivs())
        setMiddleRow(middleRows())
        setBottomRow(bottomDivs())
    }, [props.selectedDate])



    return (
        <div className='single_week_grid'>
            <div className='top_row'>
                {topRow}
            </div>
            <div className='middle_row'>
                {middleRow}
            </div>
            <div className='bottom_row'>
                {bottomRow}
            </div>
        </div>
    )
}

export default DivSingleWeek