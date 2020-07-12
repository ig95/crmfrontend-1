/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'

const SingleDay = () => {
    var CryptoJS = require("crypto-js");
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedDateString, setSelectedDateString] = useState('')
    const [ selectedLocation, setSelectedLocation ] = useState('')

    // setting all the data
    useEffect( () => {
        let currentDate = /SingleDay(.*)/.exec(window.location.href)[0].replace(/SingleDay\//, '')
        let dateArray = currentDate.split('')
        let finalDate = dateArray[0]+dateArray[1]+dateArray[2]+' '+dateArray[3]+dateArray[4]+dateArray[5]+' '+dateArray[6]+dateArray[7]+' ' +dateArray[8]+dateArray[9]+dateArray[10]+dateArray[11]
        let locationString = ''
        for (let i = 13; i < dateArray.length; i++) {
            locationString += dateArray[i]
        }
        setSelectedLocation(locationString)
        setSelectedDateString(finalDate)
        setSelectedDate(new Date(finalDate))
    }, [])

    return (
        <div className='home_content'>
            <NavBar 
                title={`${selectedLocation}: ${selectedDateString}`}
                other={selectedDate}
            />
        </div>
    )
}

export default SingleDay