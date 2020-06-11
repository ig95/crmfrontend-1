import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/NavBar'
import { Link } from 'react-router-dom';

const Compliance = () => {
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ logicalGate, setLogicalGate ] = useState(false)
    const [ submitPressed, setSubmitPressed ] = useState('Create Driver')
    const [ reloadGate, setReloadGate ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ nonActiveDrivers, setNonActiveDrivers ] = useState([])
    const [ nonVerifiedImages, setNonVerifiedImages ] = useState([])
    const [ nonDriverVans, setNonDriverVans ] = useState([])
    const [ vanList, setVanList ] = useState([])
    const [ selectedVan, setSelectedVan ] = useState(null)
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ reload, setReload ] = useState(0)
    const [ idVans, setIdVans ] = useState([])

    // grab the main data
    useEffect( () => {
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
        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response.data)
            getData('https://pythonicbackend.herokuapp.com/vehicles/').then( reponse => {
                setVanList(reponse.results)
            })
        })
    }, [reload])
    
    // make a vehicle belong to a driver
    if (selectedDriver && selectedVan) {
        async function putData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });

            return response ? response.json() : console.log('no reponse')

        };
        console.log(`https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`)
        putData(`https://pythonicbackend.herokuapp.com/vehicles/${selectedVan.vehicle_id}/`, {
            driver_id: `https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`
        }).then( response => {
            console.log(response)
            setSelectedDriver(null)
            setSelectedVan(null)
            let x = reload
            let y = x + 1
            setReload(y)
        })
    }

    // function for changing the city from dropdown
    const handleSelectCity = (e, selectCity) => {
        setSelectedCity(selectCity)
    }
    
    // send form to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitPressed('Created')
        console.log('submitting')
        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            
            return response ? response.json() : console.log('no reponse')

        };

        postData('https://pythonicbackend.herokuapp.com/drivers/', {
            name: e.target.name.value ? e.target.name.value : 'null',
            location: e.target.location.value ? e.target.location.value : 'null',
            phone: e.target.mobile.value ? e.target.mobile.value : 'null',
            email: e.target.email.value ? e.target.email.value : 'null',
            UTRNumber: e.target.UTRNumber.value ? e.target.UTRNumber.valuee : 'null',
        }).then( (response) => {
            console.log(response)
            reloadGate ? setReloadGate(false) : setReloadGate(true)
        })
    }

    // reset the page
    const backToNormal = () => {
        setLogicalGate(false)
    }

    // make the driver page
    var makeTheDriver
    if (logicalGate) {
        makeTheDriver = (
            <div className='new_driver_form_container'>
                <h1>Add Driver</h1>
                <form onSubmit={handleSubmit} className='new_employee_form'>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Depot</label>
                            <input className='inputs' type="text" name='location' defaultValue={selectedCity}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Address</label>
                            <input className='inputs' type="text" name='address'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Mobile</label>
                            <input className='inputs' type="text" name='mobile'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Email</label>
                            <input className='inputs' type="text" name='email'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>UTR Number</label>
                            <input className='inputs' type="text" name='UTRNumber'/>
                    </div>
                    <div className='buttons_new_driverPage'>
                        <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                        <button className='compliance_add_driver_button_submit' onClick={backToNormal}>
                            <span className='span_in_complaince_button'>Return</span> 
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    // set the gate for make driver page
    const handleMakeDriverPage = () => {
        console.log('make the driver page please')
        setLogicalGate(true)
    }

    // select a van to assign to a driver
    const handleSelectDriver = (e, driver) => {
        let localArray = driverLocalList
        console.log(localArray)
        setSelectedDriver(driver)
        localArray.forEach( (driverEle, driverEleId) => {
            console.log(parseInt(driverEle.key), driver.driver_id)
            if (parseInt(driverEle.key) === driver.driver_id) {
                localArray[driverEleId] = (
                    <div key={driver.driver_id}>
                        <h3 className='h3_for_compliance_Page_colored' onClick={handleSelectDriver}>
                            {driver.name}
                        </h3>
                        <br />
                    </div>
                )
            }
        })
        setNonActiveDrivers([localArray])
    }

    // react you can actually suck a fat dick and then i hope you choke
    var driverLocalList

    // map the non active drivers to list
    useEffect( () => {
        let localArray = []
        if (data) {
            data.drivers.forEach( (driver, driverID) => {
                if (driver.status) {
                    if (driver.status !== 'Active') {
                        localArray.push(
                            <div key={driver.driver_id}>
                                <h3 key={driverID} className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                    {driver.name}
                                </h3>
                                <br />
                            </div>
                        )
                    }
                }
                if (!driver.status) {
                    localArray.push(
                        <div key={driver.driver_id}>
                            <h3 key={driverID} className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                {driver.name}
                            </h3>
                            <br />
                        </div>
                    )
                }
            })
        }
        console.log(localArray)
        setNonActiveDrivers(localArray)
        driverLocalList = localArray
    }, [data])

    useEffect( () => {
        let localArray = []
        if (data) {
            data.drivers.forEach( (driver, driverID) => {
                if (driver.status) {
                    if (driver.status === 'Active') {
                        localArray.push(
                            <>
                                <h3 key={driverID} className='h3_for_compliance_Page'>
                                    {driver.name}
                                </h3>
                                <br />
                            </>
                        )
                    }
                }
            })
        }
        console.log(localArray)
        setNonVerifiedImages(localArray)
    }, [data])

    // react you fucking suck
    var stupidAssList

    // select a van to assign to a driver
    const handleVanNameClick = (e, van) => {
        let localArray = stupidAssList
        setSelectedVan(van)
        localArray.forEach( (vanEle, vanEleId) => {
            if (vanEle.key === van.registration) {
                localArray[vanEleId] = (
                    <div key={van.registration}>
                        <h3 className='h3_for_compliance_Page_colored' onClick={(e, theVan) => handleVanNameClick(e, van)}>
                            {van.registration} {van.model} {van.make}
                        </h3>
                        <br />
                    </div>
                )
            }
        })
        setNonDriverVans([localArray])
    }

    useEffect( () => {
        let localArray = []
        let localArrayIDeD = []
        if (vanList) {
            vanList.forEach( (van, vanID) => {
                console.log(van)
                if (van.driver_id === null) {
                    localArray.push(
                        <div key={van.registration}>
                            <h3 className='h3_for_compliance_Page' onClick={(e, theVan) => handleVanNameClick(e, van)}>
                                {van.registration} {van.model} {van.make}
                            </h3>
                            <br />
                        </div>
                    )
                } else {
                    localArrayIDeD.push(
                        <div key={van.registration}>
                            <h3 className='h3_for_compliance_Page' onClick={(e, theVan) => handleVanNameClick(e, van)}>
                                {van.registration} {van.model} {van.make}
                            </h3>
                            <br />
                        </div>
                    )
                }
            })
        }
        console.log(localArray)
        setIdVans(localArrayIDeD)
        setNonDriverVans(localArray)
        stupidAssList = localArray
    }, [vanList])

    return (
        <div className='home_content'>
            <NavigationBar title='Compliance'/>
            {makeTheDriver}
            <div className='main_content_compliance'>
                <div className='top_container_compliance_page'>
                    <div className='drop_down_bar_container'>
                        <nav class="menu">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div>
                        <button className='compliance_add_driver_button' onClick={handleMakeDriverPage}>
                            <span className='span_in_complaince_button'>ADD DRIVER</span> 
                        </button>
                    </div>
                </div>
                <div className='bottom_container_compliance_page'>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='/documentsforverification' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Waiting for Verification</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>NonVerified Drivers</h2>
                        {nonActiveDrivers}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='/driverdocuments' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Documents</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>Verified Drivers</h2>
                        {nonVerifiedImages}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='drivercompliancecheck' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Compliance Check</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>Assigned Vans</h2>
                        {idVans}
                    </div>
                    <div className='bottom_buttons_compliance_page' id='last_div_compliance_page'>
                        <Link to='/companyvans' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Company Vans</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>Not Assigned Vans</h2>
                        {nonDriverVans}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compliance