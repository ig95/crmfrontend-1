import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import ComplianceCheck from '../components/ComplianceCheck'

const DriverComplianceCheck = (props) => {
    const [ data, setData ] = useState(null)
    const [ reload, setReload ] = useState(0) 

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
        })
    }, [reload])

    // reload
    const makeReload = () => {
        let myVar = reload
        let nextVar = myVar+1
        setReload(nextVar)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Driver Compliance Check'/>
            <div className='main_content_compliance_check'>
                <ComplianceCheck 
                    user_name={props.user_name}
                />
            </div>
        </div>
    )
}

export default DriverComplianceCheck