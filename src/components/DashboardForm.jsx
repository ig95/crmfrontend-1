/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const DashboardForm = (props) => {
    var CryptoJS = require("crypto-js");
    const [ myForm, setMyForm ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('Bristol - DBS2')
    const [ selectedCityAbbrev, setSelectedCityAbbrev ] = useState('DBS2')
    const [ dateSelected, setDateSelected ] = useState('')
    const [ nameValue, setNameValue ] = useState('')
    const [ submittedArray, setSubmittedArray ] = useState([])
    const [ selectedRouteType, setSelectedRouteType ] = useState('Full Standard Van Route')
    const [ otherSelection, setOtherSelection] = useState(null)
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ nameState, setNameState ] = useState('')
    const [ waveTime, setWaveTime ] = useState('')
    const [ startMileage, setStartMileage ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
    const [ parcelsNotDelivered, setParcelsNotDelivered ] = useState('')
    const [ logOutTime, setLogOutTime ] = useState('')
    const [ finishMileage, setFinishMileage ] = useState('')
    const [ routeNumber, setRouteNumber ] = useState('')
    const [ parcelsDelivered, setParcelsDelivered ] = useState('')
    const [ vehicleRegistaration, setVehicleRegistaration ] = useState('')
    const [ logInTime, setLogInTime ] = useState('')
    const [ support, setSupport ] = useState('')
    const [ deductions, setDeductions ] = useState('')
    const [ deductionType, setDeductionType ] = useState('none')
    const [ supportType, setSupportType ] = useState('none')
    const [ deductionArea, setDeductionArea ] = useState(null)
    const [ deductionComment, setDeductionComment ] = useState('Required Comment')
    const [ supportArea, setSupportArea ] = useState(null)
    const [ supportComment, setSupportComment ] = useState('Required Comment')
    const [ reRender, setReRender] = useState(0)
    
    // list for routes
    const onSelectTwo = (e) => {
        setSelectedRouteType(e.value)
    }

    var textMaker = 'none'
    var supportMaker = 'none'

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCityAbbrev(e.value)
    }

    // dropdown menu selection function
    const onSelectDeduction = (e) => {
        setDeductionType(e.value)
        textMaker = e.value
        makeComment()
    }

    // dropdown menu selection function
    const onSelectSupport = (e) => {
        setSupportType(e.value)
        supportMaker = e.value
        makeSupportComment()
    }

    // submit
    const handleSubmit = (e) => {
        e.preventDefault()
        let localDriverId = 0
        let localID = 0
        let driverID = ''
        let mileage = e.target.FinishMileage.value - e.target.StartMileage.value
        props.data.drivers.forEach( (ele, id) => {
            if (ele.name === e.target.Name.value) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            props.data.dates.forEach( (ele, id) => {
                if (ele.driver_id === `https://pythonicbackend.herokuapp.com/drivers/${localDriverId}/` && ele.date === dateSelected) {
                    driverID = ele.driver_id
                    localID = ele.date_id
                }
            })
        }
        async function postData(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        let myObjectToPut = () => {
            let myObj = {}
                nameValue ? myObj['name'] = {nameValue} : console.log(null)
                selectedRouteType ? myObj['route'] = selectedRouteType : console.log(null)
                e.target.LogInTime.value ? myObj['logIn_time'] = e.target.LogInTime.value : console.log(null)
                e.target.LogOutTime.value ? myObj['logOut_time'] = e.target.LogOutTime.value : console.log(null) 
                selectedCity ? myObj['location'] = myObj['location'] = selectedCity : console.log(null) 
                mileage ? myObj['mileage'] = mileage : console.log(null) 
                e.target.NoParcelsDelivered.value ? myObj['parcels'] = e.target.NoParcelsDelivered.value : console.log(null)
                myObj['driver_id'] = driverID
            return (
                myObj
            )
        }
        if (localID > 0) {
            postData(`https://pythonicbackend.herokuapp.com/schedule/${localID}/`, myObjectToPut())
            .then( response => {
                let localArray = []
                submittedArray.length > 0 ? localArray = [...submittedArray] : localArray = []
                localArray.push(response)
            })
        }
    }

    // submit for state form
    const handleSubmitState = (e) => {
        e.preventDefault()
        let localDriverId = 0
        let localID = 0
        let driverID = ''
        props.drivers.forEach( (ele, id) => {
            if (ele.name === nameState) {
                localDriverId = ele.driver_id
            }
        })
        if (localDriverId > 0) {
            props.dates.forEach( (ele, id) => {
                if (ele.driver_id === `https://pythonicbackend.herokuapp.com/drivers/${localDriverId}/` && ele.date === props.otherSelection.date) {
                    driverID = ele.driver_id
                    localID = ele.date_id
                }
            })
        }
        async function postData(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        async function postDataPost(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        let logInLocal = logInTime.slice(0, 4)
        let logOutLocal = logOutTime.slice(0, 4)

        let myObjectToPut = () => {
            let myObj = {
                name: nameState,
                start_mileage: startMileage,
                route: selectedRouteType,
                logOut_time: logOutLocal,
                logIn_time: logInLocal,
                finish_mileage: finishMileage,
                LateWavePayment: waveTime,
                location: selectedCityAbbrev,
                parcel: parcelsDelivered,
                parcelNotDelivered: parcelsNotDelivered,
                driver_id: driverID,
                routeNumber: routeNumber,
            }

            return (
                myObj
            )
        }

        let myDeductionsObj = () => {
            let myObj = {}
            if (deductionType !== 'none') {
                myObj = {
                    date_id: `https://pythonicbackend.herokuapp.com/schedule/${localID}/`,
                    name: deductionType,
                    amount: deductions,
                    comment: deductionComment,
                }
            } 

            return (
                myObj
            )
        }

        let mySupportsObj = () => {
            let myObj = {}
            if (supportType !== 'none') {
                myObj = {
                    date_id: `https://pythonicbackend.herokuapp.com/schedule/${localID}/`,
                    name: supportType,
                    amount: support,
                    comment: supportComment,
                }
            }

            return (
                myObj
            )
        }
        if (localID.length > 0) {
            postDataPost(`https://pythonicbackend.herokuapp.com/deductions/`, myDeductionsObj()).then( response => {
                postDataPost(`https://pythonicbackend.herokuapp.com/support/`, mySupportsObj()).then( response => {
                    postData(`https://pythonicbackend.herokuapp.com/schedule/${localID}/`, myObjectToPut())
                    .then( response => {
                        props.updateParentFunction()
                    })
                })
            })
        }
    }

    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2',
        'DXP1'
    ]

    // dropdown for route menu
    const optionsTwo = [
        'Full Standard Van Route',
        'Full Large Van Route',
        'Transportation Route',
        'MFN Route',
        'Missort Route',
        'Classroom Training',
        'Ride Along',
        'Sweeper',
        'None'
    ]

    // // select name
    // const handleNameClick = (e, theName) => {
    //     makeSearchUnderBar('', 10)
    //     setNameValue(theName)
    // }

    // make the div under the name search bar
    const makeSearchUnderBar = (theValue, theLength) => {
        if (theValue !== '' && theLength <= 3) {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar')
        } else {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_none')
        }
    }

    // // search bar function
    // const handleChange = (e) => {
    //     setNameValue(e.target.value)
    //     makeSearchUnderBar(e.target.value, nameValue.length)
    //     let localArray = []
    //     props.data.drivers.forEach( (ele, id) => {
    //         if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
    //             localArray.push(
    //                 <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${ele.name}`)}>{ele.name}</h4>
    //             )
    //         }
    //     })
    //     setDriverSearchArray(localArray)
    // }
    
    // map props to state
    useEffect( () => {
        if (props.otherSelection) {
            let deductionsValue = props.otherSelection.deductionSum.replace(/GB£/, '')
            let supportValue = props.otherSelection.supportSum.replace(/GB£/, '')
            if (props.otherSelection.route !== "0") {
                setSelectedRouteType(props.otherSelection.route)
            } else {
                setSelectedRouteType('Full Standard Van Route')
            }
            setOtherSelection(props.otherSelection)
            setNameState(props.otherSelection.driver_id)
            setWaveTime(props.otherSelection.LateWavePayment)
            setStartMileage('0')
            setVehicleType('Not Owned')
            setParcelsNotDelivered(props.otherSelection.parcelNotDelivered)
            setLogOutTime(props.otherSelection.logOut_time)
            setFinishMileage(props.otherSelection.finish_mileage)
            setRouteNumber(props.otherSelection.route)
            setParcelsDelivered(props.otherSelection.parcel)
            setVehicleRegistaration('0')
            setLogInTime(props.otherSelection.logIn_time)
            setRouteNumber(props.otherSelection.routeNumber)
            setSupport(supportValue)
            setDeductions(deductionsValue)
        }
    }, [props.otherSelection])

    // handle the input changes
    const handleChangeInputs = (e) => {
        let myVar = reRender
        let newVar = myVar + 1
        let x = 0
        e.target.name === 'Name' ? setNameState(e.target.value) : x = x + 1
        e.target.name === 'waveTime' ? setWaveTime(e.target.value) : x = x + 1
        e.target.name === 'LogOutTime' ? setLogOutTime(e.target.value) : x = x + 1
        e.target.name === 'StartMileage' ? setStartMileage(e.target.value) : x = x + 1
        e.target.name === 'FinishMileage' ? setFinishMileage(e.target.value) : x = x + 1
        e.target.name === 'VehicleType' ? setVehicleType(e.target.value) : x = x + 1
        e.target.name === 'Route' ? setRouteNumber(e.target.value) : x = x + 1
        e.target.name === 'ParcelsDelivered' ? setParcelsDelivered(e.target.value) : x = x + 1
        e.target.name === 'ParcelsNotDelivered' ? setParcelsNotDelivered(e.target.value) : x = x + 1
        e.target.name === 'LogInTime' ? setLogInTime(e.target.value) : x = x + 1
        e.target.name === 'deductions' ? setDeductions(e.target.value) : x = x + 1
        e.target.name === 'support' ? setSupport(e.target.value) : x = x + 1
        setReRender(newVar)
    }

    let myDeductionList = [
        'none',
        'HiVis',
        'Key Chain',
        'Fuel Card Charge',
        'Manual'
    ]

    let mySupportList = [
        'Late Wave Payment',
        'Additional Support',
        'Manual'
    ]

    let mySuperSupportList = [
        'none',
        'Late Wave Payment',
        'Additional Support',
        'Seasonal Incentive',
        'DPMO Incentive',
        'Manual'
    ]

    const handleDeductionComment = (e) => {
        setDeductionComment(e.target.value)
    }
    
    const makeComment = () => {
        if (textMaker !== 'none') {
            setDeductionArea(
                <textarea onChange={handleDeductionComment} rows="4" cols="50" id='deduction_textarea'>
                    {deductionComment}
                </textarea>
            )
        } else {
            setDeductionArea(null)
        }
    }
    
    const handleSupportComment = (e) => {
        setSupportComment(e.target.value)
    }

    const makeSupportComment = () => {
        if (supportMaker !== 'none') {
            setSupportArea(
                <textarea onChange={handleSupportComment} rows="4" cols="50" id='deduction_textarea'>
                    {supportComment}
                </textarea>
            )
        } else {
            setSupportArea(null)
        }
    }

    useEffect( () => {
        setMyForm(
            <form onSubmit={handleSubmitState}  autoComplete='off'>
                <div className='dashboard_form'>
                    <div className='dashboard_form_divs_name'>
                        <div>
                            <label className='dashboard_labels'>Name</label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Name' value={nameState} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                        </div><label className='dashboard_labels'>Location </label>
                        <Dropdown 
                            options={options} 
                            onChange={onSelect} 
                            value={selectedCityAbbrev} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                            id='drop_down_style'
                        />
                    </div>
                    <div className='dashboard_form_divs'>    
                        <div>
                            <label className='dashboard_labels'>Route No. </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='Route' value={routeNumber} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Route Type</label>
                        </div>
                        <Dropdown 
                            options={optionsTwo} 
                            onChange={onSelectTwo} 
                            value={selectedRouteType} 
                            placeholder="Select an option" 
                            className='drop_down_bar_dashboard'
                            id='drop_down_style'
                        />
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Log In Time </label>
                        </div>
                            <input className='input_dashboard_page' type="time" name='LogInTime' value={logInTime} onChange={handleChangeInputs} required/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Log Out Time </label>
                        </div>
                            <input className='input_dashboard_page' type="time" name='LogOutTime' value={logOutTime} onChange={handleChangeInputs} required/>
                    </div>
                    <div className='dashboard_form_divs_texty'>  
                            <div>
                                <label className='dashboard_labels'>Support </label>        
                            </div>
                        <div className='solve_this'>
                            <div>
                                <Dropdown 
                                    options={mySuperSupportList} 
                                    onChange={onSelectSupport} 
                                    value={supportType} 
                                    placeholder="Select an option" 
                                    className='drop_down_bar_dashboard'
                                    id='drop_down_style'
                                />
                                <input className='input_dashboard_page' type="text" name='support' value={support} onChange={handleChangeInputs}/>
                                {supportArea}
                            </div>
                        </div>  
                    </div>
                    <div className='dashboard_form_divs_texty'>    
                        <div>
                            <label className='dashboard_labels'>Deduction </label>        
                        </div>
                        <div className='solve_this'>
                            <div>
                                <Dropdown 
                                    options={myDeductionList} 
                                    onChange={onSelectDeduction} 
                                    value={deductionType} 
                                    placeholder="Select an option" 
                                    className='drop_down_bar_dashboard'
                                    id='drop_down_style'
                                />
                                <input className='input_dashboard_page' type="text" name='deductions' value={deductions} onChange={handleChangeInputs}/>
                                {deductionArea}
                            </div>
                        </div>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Start Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='StartMileage' value={startMileage} onChange={handleChangeInputs}/>
                    </div>
                    <div className='dashboard_form_divs'>
                        <div>
                            <label className='dashboard_labels'>Finish Mileage </label>
                        </div>
                            <input className='input_dashboard_page' type="text" name='FinishMileage' value={finishMileage} onChange={handleChangeInputs}/>
                    </div>        

                </div>
                <div className="button_daily_service" onClick={handleSubmitState}>
                    <h3 className='remove_h3_padding'>Submit</h3>  
                </div>  
            </form>
        )
    }, [otherSelection, deductionArea, supportArea, reRender])
    
    return (
       <>
        {myForm}
       </>
    )
}

export default DashboardForm