import React, {useState, useEffect} from 'react'
import Documents from '../components/Documents'
import NavigationBar from '../components/NavBar'

const DriverDocumentation = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ drivers, setDrivers ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ dataset, setDataset ] = useState(null)
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ nameValue, setNameValue ] = useState('')

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
    
    // select name
    const handleNameClick = (e, theName) => {
        makeSearchUnderBar('', 10)
        setNameValue(theName)
        dataset.forEach( (ele, id) => {
            if (ele.name === theName) {
                setSelectedDriver(ele)
            }
        })
    }

    // search bar 
    const makeSearchUnderBar = (theValue, theLength) => {
        if (theValue !== '' && theLength <= 3) {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_docs')
        } else {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_none')
        }
    }

    // search bar function
    const handleChange = (e) => {
        if (dataset) {
            setNameValue(e.target.value)
            makeSearchUnderBar(e.target.value, nameValue.length)
            let localArray = []
            dataset.forEach( (ele, id) => {
                if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                    localArray.push(
                        <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${ele.name}`)}>{ele.name}</h4>
                    )
                }
            })
            setDriverSearchArray(localArray)
        }
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Driver Documents'/>
            <div className='main_content_driver_documents'>
                <div className='documents_search_bar'>
                    <div className='invoice_form_divs_name'>
                        <div>
                            <label className='dashboard_labels'>Find Driver </label>
                        </div>
                            <input className='search_bar' type="text" name='Name' value={nameValue} onChange={handleChange} autoComplete='off'/>
                        <div className={`${makeSearchBarVisible}`}>
                            {driverSearchArray}
                        </div>
                    </div>
                </div>
                {content}
            </div>
        </div>
    )
}

export default DriverDocumentation