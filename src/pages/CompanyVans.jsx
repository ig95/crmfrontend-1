import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import VansComponent from '../components/VansComponent'

const CompanyVans = () => {

    const [ selection, setSelection ] = useState('')
    const [ content, setContent ] = useState(null)
    const [ vansList, setVansList ] = useState([])
    const [ reRenderTrigger, setReRenderTrigger ] = useState(0)
    const [ displayDiv, setDisplayDiv ] = useState('diplay_none')
    const [ letMeView, setLetMeView ] = useState('main_div_vans_none')
    const [ vanDocs, setVanDocs ] = useState([])

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
            console.log(response.results)
            setVansList(response.results)
            getData('https://pythonicbackend.herokuapp.com/images/').then( (response) => {
                let localArray = []
                response.results.forEach( (image, ImageID) => {
                    if (image.vehicle_id) {
                        localArray.push(image)
                    }
                })
                setVanDocs(localArray)
                console.log(localArray)
            })
        })
    }, [reRenderTrigger])

    // function for rerendering
    const reRenderMe = () => {
        let myVar = reRenderTrigger
        myVar++
        setReRenderTrigger(myVar)
    }

    // make the h2o vans option appear
    const handleH2oVansClick = () => {
        setLetMeView('main_div_vans')
        setSelection('H2O Vans')
        setContent(true)
    }
        
    // make the h2o vans option appear
    const handleRentalVansClick = () => {
        setLetMeView('main_div_vans')
        setSelection('Rental Vans')
        setContent(false)
    }

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
            <div className={displayDiv}>
                <VansComponent 
                    owned={content}
                    data={vansList}
                    reRender={reRenderMe}
                    viewMe={letMeView}
                    vanDocs={vanDocs}
                />
            </div>
        </div>
    </div>
    )
}

export default CompanyVans