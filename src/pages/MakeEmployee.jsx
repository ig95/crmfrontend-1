/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState }  from 'react'
import NavigationBar from '../components/NavBar'

const MakeEmployee = (props) => {
    var CryptoJS = require("crypto-js");
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

        getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
            setDataSet(response.data.drivers)
        })  
    }, [reloadGate])

    // send form to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitPressed('Created')
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
                            <input className='inputs' type="text" name='name' required/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Depot</label>
                            <input className='inputs' type="text" name='location' required/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Address</label>
                            <input className='inputs' type="text" name='address' required/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Mobile</label>
                            <input className='inputs' type="tel" name='mobile' placeholder='required format: 425-314-9311' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Email</label>
                            <input className='inputs' type="email" name='email' required/>
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
            getData('https://intense-headland-70415.herokuapp.com/mail', {
                password: process.env.REACT_APP_INTERCHANGE,
                email: props.user_email,
                // email: selectedDriver.email,
                subject: 'Document Signiture',
                // message: `Link for the document https://crmsignitures.netlify.app/${randoNumber}`
                message: 
                    `
                    <style>

                        #buttonHover:hover {
                            transform: translateY(-.1rem)
                            background-color: rgb(43, 58, 77);
                        }
                    </style>
                    <h1 style="color: #232F3E;">H2O Logistics Docusigniture</h1><br />
                    <h2 style="color: #232F3E;">Click for the document </h2><br />
                        <a href=https://crmsignitures.netlify.app/${randoNumber} id='buttonHover'>
                            <button 
                                style="
                                background-color: #232F3E;
                                color: white;
                                width: 150px;
                                height: 75px;
                                border-radius: .5rem;
                                border: none;
                                "
                            >
                                <h2>
                                    HERE
                                </h2>
                            </button>
                        </a>
                    
                    `
                }).then ( response => {
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
        setSelectedDriver(driver)
    }

    // handle offboarding text
    const offBoardedText = (status) => {
        if (status === 'OffboardedForever') {
            return 'Offboarded'
        } else if (status === null) {
            return 'NonVerified'
        } else {
            return status
        }
    }

    var content
    // make the list of driver
    const makeListDrivers = () => {
        // const getRandomInt = (max) => {
        //     return Math.floor(Math.random() * Math.floor(max));
        //   }
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
                                <div className='inner_new_document_divs_phoney'>
                                    <h3>{ele.phone ? ele.phone : '--'}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3>{ele.imgArray ? `${ele.imgArray.length}/13 `: '0/0 '}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone_status'>
                                    <h3>{offBoardedText(ele.status)}</h3>
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
                                <div className='inner_new_document_divs_phoney'>
                                    <h3 className='get_rid_of_padding'>{ele.phone ? ele.phone : '--'}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone'>
                                    <h3 className='get_rid_of_padding'>{ele.imgArray ? `${ele.imgArray.length}/13 `: '0/0 '}</h3>
                                </div>
                                <div className='inner_new_document_divs_phone_status'>
                                    <h3 className='get_rid_of_padding'>{offBoardedText(ele.status)}</h3>
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
                            <div className='inner_new_document_divs_phoney'>
                                <h3 className='get_rid_of_padding'>{ele.phone ? ele.phone : '--'}</h3>
                            </div>
                            <div className='inner_new_document_divs_phone'>
                                <h3 className='get_rid_of_padding'>{ele.imgArray ? `${ele.imgArray.length}/13 `: '0/0 '}</h3>
                            </div>
                            <div className='inner_new_document_divs_phone_status'>
                                <h3 className='get_rid_of_padding'>{offBoardedText(ele.status)}</h3>
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
            <NavigationBar title='Drivers' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
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
                                                <li className="menu-item" onClick={(e, city) => handleSelectStation(e, 'DXP1')}><a href="#0">DXP1</a></li>
                                            </ol>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </form>
                    </div>
                    {singleDriverScreen}
                    <button className='compliance_add_driver_button_submit'>
                        <span className='span_in_complaince_button'>Search</span> 
                    </button> 
                    <button className='compliance_add_driver_button_submit' onClick={handleMakeDriverPage}>
                        <span className='span_in_complaince_button'>Add Driver</span> 
                    </button>
                </div>
                <div className='content_bottom_new_driver'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee