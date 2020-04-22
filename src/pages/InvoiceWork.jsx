import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const InvoiceWork = (props) => {
    const [ dataset, setDataset ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ dateSelected, setDateSelected ] = useState('')
    const [ calanderWidget, setCalendarWidget ] = useState([])
    const [ selectedDate, setSelectedDate ] = useState(new Date())

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

    var invoiceContent
    if (selectedDriver) {
        console.log(selectedDriver)
        invoiceContent = (
            <div className='invoice_content'>
                <h3>
                    Name: {selectedDriver.name}
                </h3>
                <h3>
                    Location: {selectedDriver.location}
                </h3>
            </div>
        )
    }

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e) => {
        setSelectedDate(e)
        setDateSelected(e.toDateString())
        setCalendarWidget('')
    }

    const handleDateClick = () => {
        console.log('clicked')
        let localArray = [<Calendar 
        onChange={handleCalendarChange}
        value={selectedDate}
        className='calander'
        />]
        setCalendarWidget(localArray)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Invoicing'/>
            <div className='main_content_invoicing'>
                <div className='documents_search_bar_invoicing'>
                    <div>
                        <label >Find Driver </label><br />
                            <input className='search_bar' type="text" name='searchBar' onChange={handleChange} />
                            {driverSearchArray}
                    </div>
                    <div>
                        <label >Date </label><br />
                            <input className='search_bar' type="text" name='Date' value={dateSelected} onClick={handleDateClick}/>
                            <div>
                                {calanderWidget}
                            </div>
                    </div>
                </div>
                {invoiceContent}
            </div>
        </div>
    )
}

export default InvoiceWork