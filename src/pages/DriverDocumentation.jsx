import React, {useState, useEffect} from 'react'
import Documents from '../components/Documents'
import NavigationBar from '../components/NavBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import folderPic from '../images/folder.png'

const DriverDocumentation = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ drivers, setDrivers ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ dataset, setDataset ] = useState(null)
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ nameValue, setNameValue ] = useState('')
    const [ selectedCity, setSelectedCity ] = useState('DBS2')

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
            getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
                setDataset(response.data.drivers)
            })
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


    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCity(e.value)
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

    var driverList = listTheDrivers()
    return (
        <div className='home_content'>
            <NavigationBar title='Driver Documents'/>
            <div className='main_content_driver_documents'>
                <div className='documents_search_bar'>
                    <div className='drop_down_bar_container'>
                        <Dropdown 
                            options={options} 
                            onChange={onSelect} 
                            value={selectedCity} 
                            placeholder="Select an option" 
                            className='drop_down_bar'
                        />
                    </div>
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