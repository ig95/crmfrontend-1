import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const InvoiceWork = (props) => {
    const [ dataset, setDataset ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ dateSelected, setDateSelected ] = useState('')
    const [ dateSelectedEnd, setDateSelectedEnd ] = useState('')
    const [ calanderWidget, setCalendarWidget ] = useState([])
    const [ calanderWidgetEnd, setCalendarWidgetEnd ] = useState([])
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ selectedDateEnd, setSelectedDateEnd ] = useState(new Date())
    const [ myCounter, setMyCounter ] = useState(0)
    const [ invoivesMappedArray, setInvoicesMappedArray ] = useState([])
    const [ selectedInvoice, setSelectedInvoice ] = useState(null)

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
            setDataset(response.data.drivers)
            console.log(response.data.drivers)
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
                if (dateSelected && dateSelectedEnd ) {
                    mapDatesDesired(selectedDate, selectedDateEnd, ele)
                }
            }    
        })
        setDriverSearchArray(localArray)
    }  

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e, value) => {
        setSelectedDate(e)
        setDateSelected(e.toDateString())
        setCalendarWidget('')
        if (dateSelectedEnd && selectedDriver) {
            mapDatesDesired(e, value)
        }
    }
    
    
    // changes the selected date with the calendar selections end dates
    const handleCalendarChangeEnd = (e, value) => {
        setSelectedDateEnd(e)
        setDateSelectedEnd(e.toDateString())
        setCalendarWidgetEnd('')
        if (dateSelected && selectedDriver) {
            mapDatesDesired(value, e)
        }
    }

    // handle selecting invoice from bar
    const handleInvoiceSelection = (e, date) => {
        console.log(date)
        if (date !== 'overall') {
            invoivesMappedArray.forEach( (ele, id) => {
                if (ele.date === date) {
                    setSelectedInvoice(ele)
                    console.log(ele)
                }
            })
        } else {
            invoivesMappedArray.forEach( (ele, id) => {
                if (ele.date === date) {
                    setSelectedInvoice(ele)
                    console.log(ele)
                }
            })
        }
    }

    // what is being displayed
    var invoiceContent
    if (invoivesMappedArray.length > 0) {
        let topBar = []
        invoivesMappedArray.forEach( (ele, id) => {
            topBar.push(
                <div className='top_divs' onClick={(e, date) => handleInvoiceSelection(e, ele.date)}>
                    <p>{ele.date}</p>
                </div>
            )
        })
        topBar.push(
            <div className='top_divs' onClick={(e, date) => handleInvoiceSelection(e, 'overall')}>
                <p>Overall</p>
            </div>
        )
        invoiceContent = (
            <div className='invoice_date_list'>
                {topBar}
            </div>
        )
    }

    // map the invoices for the selected period to the array
    const mapDatesDesired = (date1, date2, driver=selectedDriver) => {
        let localArray = []
        dataset.forEach( (ele, id) => {
            if (ele.name === driver.name) {
                ele.datesArray.forEach(( ele, id) => {
                    if (date1.getTime() < new Date(ele.date).getTime() && new Date(ele.date).getTime() < date2.getTime()) {
                        localArray.push(ele)
                    }
                })
            }
        })
        setInvoicesMappedArray(localArray)
    }

    // handle click for first calendar
    const handleDateClick = () => {
        setMyCounter(myCounter+1)
        let localArray = [<Calendar 
        onChange={(e, value) => handleCalendarChange(e, selectedDateEnd)}
        value={selectedDate}
        className='calander'
        />]
        setCalendarWidget(localArray)
    }

    // handle click for second calendar
    const handleDateClickEnd = () => {
        setMyCounter(myCounter+1)
        let localArray = [<Calendar 
        onChange={(e, value) => handleCalendarChangeEnd(e, selectedDate)}
        value={selectedDateEnd}
        className='calander'
        />]
        setCalendarWidgetEnd(localArray)
    }

    var invoiceSelection
    if (selectedInvoice) {
        invoiceSelection = (
            <div className='single_Invoice'>
                <div className='invoice_item'>
                    <h3>
                        Date: {selectedInvoice.date}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        Location: {selectedInvoice.location}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        Deductions: {selectedInvoice.deductions}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        logIn_time: {selectedInvoice.logIn_time}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        logOut_time: {selectedInvoice.logOut_time}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        Time Difference: {selectedInvoice.timeDifference[0]}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        CRT: {selectedInvoice.CRT}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        LVP: {selectedInvoice.LVP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        LWP: {selectedInvoice.LWP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        RL: {selectedInvoice.RL}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        SUP: {selectedInvoice.SUP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        Fuel: {selectedInvoice.fuel}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3>
                        Parcel: {selectedInvoice.parcel}
                    </h3>
                </div>
            </div>
        )
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
                    <div className='documents_search_bar_invoicing_dates'>
                        <div>
                            <label >Invoice from Date</label><br />
                                <input className='search_bar' type="text" name='Date' value={dateSelected} onClick={handleDateClick}/>
                                <div>
                                    {calanderWidget}
                                </div>
                        </div>
                        <div>        
                            <label >Invoice to Date</label><br />
                                <input className='search_bar' type="text" name='Date' value={dateSelectedEnd} onClick={handleDateClickEnd}/>
                                <div>
                                    {calanderWidgetEnd}
                                </div>
                        </div>
                    </div>
                </div>
                <div className='invoices_overall'>
                    {invoiceContent}
                    {invoiceSelection}
                </div>
            </div>
        </div>
    )
}

export default InvoiceWork