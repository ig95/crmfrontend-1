import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'

const DriverComplianceCheck = () => {
    const [ data, setData ] = useState(null)

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
    }, [])

    return (
        <div className='home_content'>
            <NavigationBar title='Driver Compliance Check'/>
            <div className='main_content_driver_documents'>
            </div>
        </div>
    )
}

export default DriverComplianceCheck