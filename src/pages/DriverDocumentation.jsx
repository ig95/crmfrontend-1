import React, {useState, useEffect} from 'react'
import Documents from '../components/Documents'
import NavigationBar from '../components/NavBar'

const DriverDocumentation = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ drivers, setDrivers ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])

    // make this like the daily operations page. show vehicle recommendation in entry column
    // location rota system shows not exceeding 7 days for same person

    // fetch call to the db for all data related to drivers and schedule
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

        getData('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
            setDrivers(response.results)
        })
    }, [])
    
    var content
    if (selectedDriver) {
        content = (
            <>
                <Documents selectedDriver={selectedDriver} />
            </>
        )
    }

    // search bar function
    const handleChange = (e) => {
        let localArray = []
        drivers.forEach( (ele, id) => {
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
            <NavigationBar title='Driver Documents'/>
            <div className='main_content_driver_documents'>
                <div className='documents_search_bar'>
                    <label >Find Driver </label><br />
                        <input className='search_bar' type="text" name='searchBar' onChange={handleChange} />
                        <div>
                            {driverSearchArray}
                        </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default DriverDocumentation