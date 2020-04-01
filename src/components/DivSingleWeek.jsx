import React from 'react'

const DivSingleWeek = (props) => {

    // top row mapped divs
    function thisWeekDivs () {
        var thisWeekDivsArray = []
        let selectedDate = props.selectedDate
        thisWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Search Bar</h4></div>)
        for (let i = 0; i < 7; i++) {
            let dateVar = new Date(selectedDate.setDate(selectedDate.getDate() + i)).toDateString()
            thisWeekDivsArray.push(<div key={i+8} className='cal_divs_single'><h5 className='inner_calander_text'>{dateVar}</h5></div>)
            selectedDate.setDate(selectedDate.getDate() - i )
        }  
        return thisWeekDivsArray
    }

    // middle row mapped divs
    function middleRows () {
        var mappedProps = []
        for (let ele in props.drivers) {
            mappedProps.push(<div className='cal_divs_single_first'>{ele}</div>)
            for (let i = 0; i < 7; i++) {
                mappedProps.push(<div key={Math.random()} className='cal_divs_single'><h5 className='inner_calander_text'>scheduled</h5></div>)
            }  
        }
        return mappedProps
    }

    // bottom row mapped divs
    function bottomDivs () {
        var lastWeekDivsArray = []
        lastWeekDivsArray.push(<div className='cal_divs_single_first'><h4>Total for week:</h4></div>)
        for (let i = 0; i < 7; i++) {
            lastWeekDivsArray.push(<div key={i+50} className='cal_divs_single'><h5 className='inner_calander_text'>numbers</h5></div>)
        }  
        return lastWeekDivsArray
    }

    return (
        <div className='single_week_grid'>
            <div className='top_row'>
                {thisWeekDivs()}
            </div>
            <div className='middle_row'>
                {middleRows()}
            </div>
            <div className='bottom_row'>
                {bottomDivs()}
            </div>
        </div>
    )
}

export default DivSingleWeek