/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import VansComponent from '../components/VansComponent'

const CompanyVans = (props) => {
    var CryptoJS = require("crypto-js");

    const [ selection, setSelection ] = useState('')
    const [ content, setContent ] = useState(null)
    const [ vansList, setVansList ] = useState([])
    const [ reRenderTrigger, setReRenderTrigger ] = useState(0)
    const [ displayDiv, setDisplayDiv ] = useState('diplay_none')
    const [ letMeView, setLetMeView ] = useState('main_div_vans_none')
    const [ vanDocs, setVanDocs ] = useState([])
    const [ selectedVan, setSelectedVan ] = useState(null)

    useEffect(() => {
        setDisplayDiv('display_none')
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

        getData('https://pythonicbackend.herokuapp.com/vehicles/').then( (response) => {
            setVansList(response.results)
            getData('https://pythonicbackend.herokuapp.com/images/').then( (response) => {
                let localArray = []
                response.results.forEach( (image, ImageID) => {
                    if (image.vehicle_id) {
                        localArray.push(image)
                    }
                })
                setVanDocs(localArray)
            })
        })
    }, [])

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

        getData('https://pythonicbackend.herokuapp.com/vehicles/').then( (response) => {
            setVansList(response.results)
            getData('https://pythonicbackend.herokuapp.com/images/').then( (response) => {
                let localArray = []
                response.results.forEach( (image, ImageID) => {
                    if (image.vehicle_id) {
                        localArray.push(image)
                    }
                })
                setVanDocs(localArray)
            })
        })
    }, [reRenderTrigger])

    // function for rerendering
    const reRenderMe = (content=null, selectedVan=null) => {
        let myVar = reRenderTrigger
        myVar++
        setReRenderTrigger(myVar)
        if (content !== null) {
            if (content === true) {
                setLetMeView('main_div_vans')
                setSelection('H2O Vans')
                setContent(true)
            } else {
                setLetMeView('main_div_vans')
                setSelection('Rental Vans')
                setContent(false)
            }
        }
        if (selectedVan !== null) {
            setSelectedVan(selectedVan)
        }
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
        <NavigationBar title='Company Vans' />
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
                    content={content}
                    selectedVan={selectedVan}
                />
            </div>
        </div>
    </div>
    )
}

export default CompanyVans