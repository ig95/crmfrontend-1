import React, { useEffect, useState }  from 'react'
import NavigationBar from '../components/NavBar'

const MakeEmployee = (props) => {
    const [ logicalGate, setLogicalGate ] = useState(false)
    const [ dataSet, setDataSet ] = useState(null)
    const [ status, setStatus ] = useState('Offboarded')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ driverSearchEmailArray, setDriverSearchEmailArray ] = useState([])
    const [ nameValue, setNameValue ] = useState('')
    const [ emailValue, setEmailValue ] = useState('')
    const [ station, setStation ] = useState('DBS2')
    const [ reloadGate, setReloadGate ] = useState(false)
    const [ submitPressed, setSubmitPressed ] = useState('Submit')
    const [ selectedDriver, setSelectedDriver ] = useState(null)

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
            setDataSet(response.data.drivers)
            console.log(response.data.drivers)
        })  
    }, [reloadGate])

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
            status: e.target.status.value ? e.target.status.value : 'null',
            onboarding: e.target.Onboarding.value ? e.target.Onboarding.value : 0,
            phone: e.target.mobile.value ? e.target.mobile.value : 'null',
            email: e.target.email.value ? e.target.email.value : 'null',
            BadgeNumber: e.target.BadgeNumber.value ? e.target.BadgeNumber.value : 'null',
            DriverUniqueId: e.target.DriverID.value ? e.target.DriverID.value : 'null',
            NINNumber: e.target.NINNumber.value ? e.target.NINNumber.value : 'null',
            UTRNumber: e.target.UTRNumber.value ? e.target.UTRNumber.valuee : 'null',
            VatNumber: e.target.VATNumber.value ? e.target.VATNumber.value : 'null',
        }).then( (response) => {
            console.log(response)
            reloadGate ? setReloadGate(false) : setReloadGate(true)
        })
    }

    const backToNormal = () => {
        setLogicalGate(false)
    }

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
                        <label className='labels'>Station</label>
                            <input className='inputs' type="text" name='location' defaultValue={station}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Status</label>
                            <input className='inputs' type="text" name='status' defaultValue='OnBoarding'/>
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
                        <label className='labels'>Badge Number</label>
                            <input className='inputs' type="text" name='BadgeNumber'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Driver ID</label>
                            <input className='inputs' type="text" name='DriverID'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>NIN Number</label>
                            <input className='inputs' type="text" name='NINNumber'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>UTR Number</label>
                            <input className='inputs' type="text" name='UTRNumber'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>VAT Number</label>
                            <input className='inputs' type="text" name='VATNumber'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Onboarding</label>
                            <input className='inputs' type="text" name='Onboarding' defaultValue='0'/>
                    </div>
                    <div className='buttons_new_driverPage'>
                        <div className="button-container-2" >
                        <span className="mas2">{submitPressed}</span>
                            <button className='buttonFront2' id='work2' type="button" name="Hover">
                                <input type="submit" value={`${submitPressed}`} className='make_submit_invisible'/>
                            </button>
                        </div>
                        <div className="button-container-2" onClick={backToNormal}>
                            <span className="mas2">Return</span>
                            <button className='buttonFront2' id='work2' type="button" name="Hover">
                            Return
                            </button>
                        </div>  
                    </div>
                </form>
            </div>
        )
    }

    // const send document to new driver
    const handleSendDocument = (e, randoNumber) => {

        // email bit
        async function getData(url = '', data={}) {
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response ? response.json() : console.log('no reponse')
        };

        // change the fields in the backend
        async function postData(url = '', data = {}) {
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
        
        postData(`https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`, {
            driver_id: `https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`,
            SigningUrlNumber: randoNumber
        }).then( response => {
            console.log(response)
            getData('https://intense-headland-70415.herokuapp.com/mail', {
                password: process.env.REACT_APP_INTERCHANGE,
                email: props.user_email,
                // email: selectedDriver.email,
                subject: 'Document Signiture',
                // message: `Link for the document https://crmsignitures.netlify.app/${randoNumber}`
                message: `Link for the document http://localhost:3000/${randoNumber}`
                }).then ( response => {
                    console.log(response)
            })
        })
        setSelectedDriver(null)
    }
    
    // single driver component screen
    var singleDriverScreen
    if (selectedDriver) {
        const generateRandom = (amount) => {
            let localString = []
            let myArray = [
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','-','_'
            ]
            for (let i = 0; i < amount; i++) {
                localString.push(myArray[Math.floor(Math.random() * myArray.length)])
            }
            return localString.join('')
        }

        let randomNumber = generateRandom(60)

        singleDriverScreen = (
            <div className='new_driver_form_container'>
                <div className="button-container-2" onClick={(e, number) => handleSendDocument(e, randomNumber)}>
                    <span className="mas2">Send Document</span>
                    <button className='buttonFront2' id='work2' type="button" name="Hover">
                    Send Document
                    </button>
                </div> 
            </div>
        )
    }

    // make the single driver page
    const handleSingleDriver = (e, driver) => {
        console.log('clicked')
        console.log(driver)
        setSelectedDriver(driver)
    }

    var content
    // make the list of driver
    const makeListDrivers = () => {
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
          }
        let localArray = []
        if (dataSet) {
            localArray.push(
                <div key={5000} className='bottom_name_divs_new_driver'>
                    <div className='inner_new_document_divs_name_top'>
                        <h3>Name</h3>
                    </div>
                    <div className='inner_new_document_divs_top'>
                        <h3>Email</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Phone</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Onboarding Tasks</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Status</h3>
                    </div>
                </div>
            )
            dataSet.forEach( (ele, id) => {
                if (nameValue) {
                    if (ele.name === nameValue) {
                        localArray.push(
                            <div key={id} className='bottom_name_divs_new_driver' onClick={(e, targetDriver) => handleSingleDriver(e, ele)}>
                                <div className='inner_new_document_divs_name'>
                                    <h3>{ele.name}</h3>
                                </div>
                                <div className='inner_new_document_divs'>
                                    <h3>{ele.email ? ele.email : `${ele.name}@gmail.com` }</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3>{ele.phone ? ele.phone : `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}-${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}`}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3>{ele.onboarding ? `${ele.onboarding}/13 Completed` : `${getRandomInt(10)}/13 Completed` }</h3>
                                </div>
                                <div className='inner_new_document_divs_phone_status'>
                                    <h3>{ele.status ? ele.status : 'Offboarded' }</h3>
                                </div>
                            </div>
                        )
                    }
                } else if (emailValue) {
                    if (ele.email === emailValue) {
                        localArray.push(
                            <div key={id} className='bottom_name_divs_new_driver' onClick={(e, targetDriver) => handleSingleDriver(e, ele)}>
                                <div className='inner_new_document_divs_name'>
                                    <h3 className='get_rid_of_padding'>{ele.name}</h3>
                                </div>
                                <div className='inner_new_document_divs'>
                                    <h3 className='get_rid_of_padding'>{ele.email ? ele.email : `${ele.name}@gmail.com` }</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3 className='get_rid_of_padding'>{ele.phone ? ele.phone : `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}-${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}`}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3 className='get_rid_of_padding'>{ele.onboarding ? `${ele.onboarding}/13 Completed` : `${getRandomInt(10)}/13 Completed` }</h3>
                                </div>
                                <div className='inner_new_document_divs_phone_status'>
                                    <h3 className='get_rid_of_padding'>{ele.status ? ele.status : 'Offboarded' }</h3>
                                </div>
                            </div>
                        )
                    }   
                } else {
                    localArray.push(
                        <div key={id} className='bottom_name_divs_new_driver' onClick={(e, targetDriver) => handleSingleDriver(e, ele)}>
                            <div className='inner_new_document_divs_name' >
                                <h3 className='get_rid_of_padding'>{ele.name}</h3>
                            </div>
                            <div className='inner_new_document_divs'>
                                <h3 className='get_rid_of_padding'>{ele.email ? ele.email : `${ele.name}@gmail.com` }</h3>
                            </div>
                            <div className='inner_new_document_divs_phone'>
                                <h3 className='get_rid_of_padding'>{ele.phone ? ele.phone : `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}-${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}`}</h3>
                            </div>
                            <div className='inner_new_document_divs_phone'>
                                <h3 className='get_rid_of_padding'>{ele.onboarding ? `${ele.onboarding}/13 Completed` : `${getRandomInt(10)}/13 Completed` }</h3>
                            </div>
                            <div className='inner_new_document_divs_phone_status'>
                                <h3 className='get_rid_of_padding'>{ele.status ? ele.status : 'Offboarded' }</h3>
                            </div>
                        </div>
                    )
                }
            })
        }
        return localArray
    }
    content = makeListDrivers()

    // look for drivers
    const handleSubmitSearch = () => {

    }

    // new driver selection
    const handleMakeDriverPage = () => {
        setLogicalGate(true)
    }

    // change status
    const handleSelectStatus = (e, value) => {
        setStatus(value)
    }

    // select name
    const handleNameClick = (e, theName) => {
        setNameValue(theName)
    }

    // handle the name selection bar
    const handleSelectName = (e, value) => {
        setNameValue(value)
    }

    // handle the station selection bar
    const handleSelectStation = (e, value) => {
        setStation(value)
    }

    // search bar function for names
    const handleChange = (e) => {
        if (dataSet) {
            setNameValue(e.target.value)
            let localArray = []
            dataSet.forEach( (ele, id) => {
                if (ele.name) {
                    if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                        localArray.push(
                            <li className="menu-item" onClick={(e, city) => handleSelectName(e, ele.name)}><a href="#0"><h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${ele.name}`)}>{ele.name}</h4></a></li>
                        )
                    }
                }
            })
            setDriverSearchArray(localArray)
        }
    }

    // select email
    const handleEmailClick = (e, theemail) => {
        setEmailValue(theemail)
    }

    // handle the email selection bar
    const handleSelectEmail = (e, value) => {
        setEmailValue(value)
    }

    // search bar function for email
    const handleChangeEmail = (e) => {
        if (dataSet) {
            setEmailValue(e.target.value)
            let localArray = []
            console.log(dataSet)
            dataSet.forEach( (ele, id) => {
                if (ele.email !== null) {
                    if (ele.email.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                        localArray.push(
                            <li className="menu-item" onClick={(e, city) => handleSelectEmail(e, ele.email)}><a href="#0"><h4 className='name_suggestions' onClick={(e, theName) => handleEmailClick(e, `${ele.email}`)}>{ele.email}</h4></a></li>
                        )
                    }
                }
            })
            setDriverSearchEmailArray(localArray)
        }
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Drivers'/>
            {makeTheDriver}
            <div className='main_content_new_driver'>
                <div className='search_bar_top_new_driver'>
                    <div>
                        <form onSubmit={handleSubmitSearch} className='form_new_driver_page' autoComplete='off'>
                            <div className='inputs_new_driver'>
                                <nav className="menu_drivers">
                                    <ol>
                                        <li className="menu-item"><a href="#0">{status}</a>
                                            <ol className="sub-menu">
                                                <li className="menu-item" onClick={(e, city) => handleSelectStatus(e, 'Offboarded')}><a href="#0">Offboarded</a></li>
                                                <li className="menu-item" onClick={(e, city) => handleSelectStatus(e, 'OnBoarding')}><a href="#0">OnBoarding</a></li>
                                                <li className="menu-item" onClick={(e, city) => handleSelectStatus(e, 'Active')}><a href="#0">Active</a></li>
                                                <li className="menu-item" onClick={(e, city) => handleSelectStatus(e, 'Inactive')}><a href="#0">Inactive</a></li>
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className='inputs_new_driver'>
                                <nav className="menu_names">
                                    <ol>
                                        <li className="menu-item"><input className='search_bar_driver_page' type="text" id='$0' name='fuckYouChromeName' value={nameValue} onChange={handleChange}  autoComplete='off' placeholder='Search Names'/>
                                            <ol className="sub-menu">
                                            {driverSearchArray}
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className='inputs_new_driver'>
                                <nav className="menu_names">
                                    <ol>
                                        <li className="menu-item"><input className='search_bar_driver_page' type="text" id='$0' name='fuckYouChromeEmail' value={emailValue} onChange={handleChangeEmail}  autoComplete='off' placeholder='Email'/>
                                            <ol className="sub-menu">
                                                {driverSearchEmailArray}
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className='inputs_new_driver'>
                                <nav className="menu_drivers">
                                    <ol>
                                        <li className="menu-item"><a href="#0">{station}</a>
                                            <ol className="sub-menu">
                                                <li className="menu-item" onClick={(e, city) => handleSelectStation(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                                <li className="menu-item" onClick={(e, city) => handleSelectStation(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                                <li className="menu-item" onClick={(e, city) => handleSelectStation(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </form>
                    </div>
                    {singleDriverScreen}
                    <div className="button-container-2" >
                      <span className="mas2">Search</span>
                      <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Search
                      </button>
                    </div>  
                    <div className="button-container-2" onClick={handleMakeDriverPage}>
                      <span className="mas2">Add Driver</span>
                      <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Add Driver
                      </button>
                    </div>  
                </div>
                <div className='content_bottom_new_driver'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee