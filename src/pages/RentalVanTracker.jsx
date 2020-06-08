import React, { useEffect, useState} from 'react'
import NavigationBar from '../components/NavBar'

const RentalVanTracker = (props) => {
    const [ data, setData ] = useState(null)
    const [ vanData, setVanData ] = useState([])
    const [ mathSunday, setMathSunday ] = useState('14')
    const [ sunday, setSunday ] = useState(new Date())

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 7; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                setSunday(dateInner)
            }
        }
    }

    useEffect( () => {
        if (mathSunday) {
            getSundays()
        }
    }, [mathSunday])

    useEffect(() => {
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
            setData(response.data)
        })  
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setMathSunday(myDate.toDateString())
    }, [])

    useEffect( () => {
        let localArray = []
        if (data) {
            localArray.push(
                <div className='van_Horizontal'>
                    <div className='van_vertical'>
                        DA Name
                    </div>
                    <div className='van_vertical_weekday'>
                        Van Reg
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 7)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        {new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString()}
                    </div>
                    <div className='van_vertical_weekday'>
                        Total Rental
                    </div>
                </div>
            )
            let localArrayOfDate = [
                new Date(sunday.setDate(sunday.getDate() - 6)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString(),
                new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()
            ]
            data.drivers.forEach( (driver, driverID) => {
                if (driver.vehicleArray.length > 0) {
                    let myDateArrayLocal = []
                    driver.datesArray.forEach( (date, dateID) => {
                        if (localArrayOfDate.includes(new Date(date.date).toDateString())) {
                            myDateArrayLocal.push(date.date)
                        }
                    })
                    localArray.push (
                        <div className='van_Horizontal'>
                            <div className='van_vertical'>
                                {driver.name}
                            </div>
                            <div className='van_vertical_weekday'>
                                {driver.vehicleArray[0].registration}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[0]) ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[1])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>  
                                {myDateArrayLocal.includes(localArrayOfDate[2])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[3])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[4])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[5])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday'>
                                {myDateArrayLocal.includes(localArrayOfDate[6])  ? 1 : 0}
                            </div>
                            <div className='van_vertical_weekday_total'>
                                {myDateArrayLocal.length}
                            </div>
                        </div>
                    )
                }
            })
            
        }
        console.log(localArray)
        setVanData(localArray)
    }, [data])

    return (
        <div className='home_content' >
            <NavigationBar title='Rental Van Tracker' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='van_rental_tracker_overall'>
                {vanData}

            </div>
        </div >
    )
}

export default RentalVanTracker