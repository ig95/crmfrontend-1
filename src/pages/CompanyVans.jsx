import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import VansComponent from '../components/VansComponent'

const CompanyVans = () => {

    const [ selection, setSelection ] = useState('')
    const [ content, setContent ] = useState(null)
    const [ vansList, setVansList ] = useState()

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

        getData('https://pythonicbackend.herokuapp.com/vehicles/').then( (response) => {
            console.log(response)
            setVansList(response)
        })
    }, [])

    // make the h2o vans option appear
    const handleH2oVansClick = () => {
        setSelection('H2O Vans')
        setContent(
            <VansComponent data={vansList}/>
            )
        }
        
    // make the h2o vans option appear
    const handleRentalVansClick = () => {
        setSelection('Rental Vans')
        setContent(
            <VansComponent data={vansList}/>
        )
    }

    // render the correct vans selections

    return (
        <div className='home_content'>
        <NavigationBar title='Company Vans'/>
        <div className='main_content_vans'>
            <div className='top_company_vans'>
                <button className='compliance_add_driver_button_submit' onClick={handleH2oVansClick}>
                    <span className='span_in_complaince_button'>H2O Vans</span> 
                </button>
                <button className='compliance_add_driver_button_submit' onClick={handleRentalVansClick}>
                    <span className='span_in_complaince_button'>Rental Vans</span> 
                </button>
                <h2>{selection}</h2>
            </div>
            {content}
        </div>
    </div>
    )
}

export default CompanyVans