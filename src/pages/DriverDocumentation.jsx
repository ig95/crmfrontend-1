import React, {useState, useEffect} from 'react'
import Documents from '../components/Documents'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import folderPic from '../images/folder.png'

const DriverDocumentation = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ drivers, setDrivers ] = useState(null)
    const [ dataset, setDataset ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')

    // fetch call to the db for all data related to drivers and schedule
    useEffect(() => {
        console.log('firing')
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
            getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
                setDataset(response.data.drivers)
            })
        })
    }, [selectedDriver])
    
    var content
    if (selectedDriver) {
        content = (
            <>
                <Documents selectedDriver={selectedDriver} loginName={props.user_name} email={props.user_email}/>
            </>
        )
    }

    // select driver
    const handleClick = (e, element) => {
        setSelectedDriver(element)
    }
    
    // make list of files
    const listTheDrivers = () => {
        let localArray = []
        if (dataset) {
            dataset.forEach( (ele, id) => {
                if (ele.location === selectedCity) {
                    localArray.push(
                        <h3 className='name_list_documents' onClick={(e, name )=> handleClick(e, ele)}>
                            {ele.name} 
                            <img src={folderPic} alt="Folder" className='image_in_documents_folder'/>
                        </h3>
                    )
                }
            })
        }
        return localArray
    }

    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
    }

    var driverList = listTheDrivers()
    return (
        <div className='home_content'>
            <NavigationBar title='Driver Documents'/>
            <div className='main_content_driver_documents'>
                <div className='documents_search_bar'>
                    <nav class="menu">
                        <ol>
                            <li class="menu-item"><a href="#0">{selectedCity}</a>
                                <ol class="sub-menu">
                                    <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                    <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                    <li class="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                </ol>
                            </li>
                        </ol>
                    </nav>
                    <div className='drivers_names_documents'>
                        {driverList}
                    </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default DriverDocumentation