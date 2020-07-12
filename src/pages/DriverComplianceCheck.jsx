/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import ComplianceCheck from '../components/ComplianceCheck'

const DriverComplianceCheck = (props) => {
    var CryptoJS = require("crypto-js");
    // eslint-disable-next-line no-unused-vars
    const [ data, setData ] = useState(null)
    const [ reload, setReload ] = useState(0) 
    const [ selectedCity, setSelectedCity ] = useState('DBS2')

    // grab the main data
    useEffect( () => {
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
        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response.data)
        })
    }, [reload])

    // reload
    // eslint-disable-next-line no-unused-vars
    const makeReload = () => {
        let myVar = reload
        let nextVar = myVar+1
        setReload(nextVar)
    }

    // function for changing the city from dropdown
    const handleSelectCity = (e, selectCity) => {
        setSelectedCity(selectCity)
    }

    const myIffe = () => {
        if (selectedCity === 'DBS2') {
            return <h2 className='compliance_check_center_this'>Bristol</h2>
        } else if (selectedCity === 'DSN1') {
            return <h2 className='compliance_check_center_this'>Swindon</h2>
        } else if (selectedCity === 'DXP1') {
            return <h2 className='compliance_check_center_this'>Plymouth</h2>
        } else {
            return <h2 className='compliance_check_center_this'>Exeter</h2>
        }
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Driver Compliance Check'/>
            <div className='main_content_compliance_check'>
                <div className='complianceCheck_title'>
                    <div className='drop_down_bar_container'>
                        <nav class="menu">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DXP1')}><a href="#0">DXP1</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div>
                        <h2>{myIffe()}</h2>
                    </div>
                </div>
            <ComplianceCheck 
                user_name={props.user_name}
                selectedCity={selectedCity}
            />
            </div>
        </div>
    )
}

export default DriverComplianceCheck