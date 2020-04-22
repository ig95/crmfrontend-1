import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'

const VehicleChecklist = (props) => {
    const [ dataset, setDataset ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ selectedDriver, setSelectedDriver ] = useState(null)

    useEffect( () => {
        async function getDataNext(url = '') {
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
    
        getDataNext('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
            console.log(response.data.drivers)
            setDataset(response.data.drivers)
        })
    }, [])

    // search bar function
    const handleChange = (e) => {
        let localArray = []
        dataset.forEach( (ele, id) => {
            if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 3) {
                localArray.push(
                    <h4 key={id}>{ele.name}</h4>
                )
            }
            if (e.target.value === ele.name) {
                setSelectedDriver(ele)
            }    
        })
        setDriverSearchArray(localArray)
    }  
    
    return (
        <div className='home_content'>
            <NavigationBar title='Vehicle Checklist'/>
            <div className='main_content_invoicing'>
                <div className='documents_search_bar_invoicing'>
                    <label >Find Driver </label><br />
                        <input className='search_bar' type="text" name='searchBar' onChange={handleChange} />
                        <div>
                            {driverSearchArray}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleChecklist