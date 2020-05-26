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
            console.log(response)
            setData(response.data)
        })
    }, [])
    
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

    // map the non active drivers to list
    useEffect( () => {
        let localArray = []
        if (data) {
            data.drivers.forEach( (driver, driverID) => {
                if (driver.status) {
                    if (driver.status !== 'active') {
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
                if (!driver.status) {
                    localArray.push(
                        <>
                            <h3 key={driverID} className='h3_for_compliance_Page'>
                                {driver.name}
                            </h3>
                            <br />
                        </>
                    )
                }
            })
        }
        console.log(localArray)
        setNonActiveDrivers(localArray)
    }, [data])

    useEffect( () => {
        let localArray = []
        if (data) {
            data.drivers.forEach( (driver, driverID) => {
                if (driver.status) {
                    if (driver.status === 'active') {
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
                        <br />
                        {nonActiveDrivers}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='/driverdocuments' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Documents</span> 
                            </button>
                        </Link>
                        <br />
                        {nonVerifiedImages}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='drivercompliancecheck' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Compliance Check</span> 
                            </button>
                        </Link>
                    </div>
                    <div className='bottom_buttons_compliance_page' id='last_div_compliance_page'>
                        <Link to='/companyvans' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Company Vans</span> 
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compliance