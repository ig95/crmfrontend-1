/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import NavigationBar from '../components/NavBar'

const RentalVanTracker = (props) => {
    var CryptoJS = require("crypto-js");
    const [ data, setData ] = useState(null)
    const [ vanData, setVanData ] = useState([])
    const [ mathSunday, setMathSunday ] = useState('14')
    const [ sunday, setSunday ] = useState(new Date())
    const [ driverData, setDriverData ] = useState([])
    const [ vehicleData, setVehicleData ] = useState([])
    const [ registrationSearch, setRegistrationSearch ] = useState([])

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
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/vandata/').then( (response) => {
            setData(response.data)
            getData('https://pythonicbackend.herokuapp.com/drivers/').then( response => {
                setDriverData(response.results)
                getData('https://pythonicbackend.herokuapp.com/vehicles/').then( response => {
                    setVehicleData(response.results)
                })
            })
        })  
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setMathSunday(myDate.toDateString())
    }, [])

    const mapRegistrations = (letters) => {
        var registrationList = []
        if (vehicleData.length > 0) {
            vehicleData.forEach( (ele, eleId) => {
                if (ele.registration.includes(letters)) {
                    registrationList.push(
                        <div key={eleId}>{ele.registration}</div>
                    )
                }
            })
        }
        return registrationList
    }

    const handleChange = (e, key) => {
        let myVanData = vanData
        console.log(myVanData[key+1].props.children.props.children[1])
        myVanData[key+1].props.children.props.children[1] = (
            <div>
                <input type="text" className='inputRentalVanTracker' />
                {mapRegistrations(e.target.value)}
            </div>
        )
    }

    useEffect( () => {
        let localArray = []
        mapRegistrations('I')
        if (data && vehicleData && driverData) {
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
            driverData.forEach( (driver, vanID) => {
                localArray.push (
                    <form key={vanID} onChange={(e) => handleChange(e, vanID)}>
                        <div className='van_Horizontal' >
                            <div className='van_vertical'>
                                {driver.name}
                            </div>
                            <div className='van_vertical_weekday_registration' >
                                <input type="text" className='inputRentalVanTracker' />
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                            <div className='van_vertical_weekday'>
                                
                            </div>
                        </div>
                    </form>
                )
            })
            
        }
        setVanData(localArray)
    }, [data, driverData, vehicleData])

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