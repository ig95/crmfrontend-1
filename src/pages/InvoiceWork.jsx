import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const InvoiceWork = (props) => {
    const [ dataset, setDataset ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ selectedInvoice, setSelectedInvoice ] = useState(null)
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ nameValue, setNameValue ] = useState('')
    const [ sundayDate, setSundayDate ] = useState('')
    const [ sundayTwoWeeks, setSundayTwoWeeks ] = useState('')

    useEffect( () => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSundayDate(myDate.toDateString())
        setSundayTwoWeeks(new Date(myDate.getTime() + 12096e5).toDateString())
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
        })
    }, [])

    // select name
    const handleNameClick = (e, theName) => {
        makeSearchUnderBar('', 10)
        setNameValue(theName)
    }

    // search bar 
    const makeSearchUnderBar = (theValue, theLength) => {
        if (theValue !== '' && theLength <= 3) {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_invoicing')
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


    // what is being displayed
    var invoiceContent
    const mapTheContent = (theInvoiceArray) => {
        console.log('inside the if here')
        let topBar = []
        theInvoiceArray.forEach( (ele, id) => {
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
    
    // map the dates to the invoice section
    const myMapFunc = () => {
        console.log('map func firing')
        let localArray = []
        dataset.forEach( (ele, id) => {
            if (ele.name === nameValue) {
                ele.datesArray.forEach( (dateEle, dateId) => {
                    if (new Date(dateEle.date) > new Date(sundayDate) && new Date(dateEle.date) <  new Date(new Date(sundayDate).getTime() + 12096e5)) {
                        localArray.push(dateEle)
                    }
                })
            }
        })
        return localArray
    }

    if (nameValue) {
        dataset.forEach( (ele, id) => {
            if (nameValue === ele.name) {
                mapTheContent(myMapFunc()) 
            }
        })
    }
    
    // handle selecting invoice from bar
    const handleInvoiceSelection = (e, date) => {
        let invoices = myMapFunc()
        if (date !== 'overall') {
            invoices.forEach( (ele, id) => {
                if (ele.date === date) {
                    setSelectedInvoice(ele)
                    console.log(ele)
                }
            })
        }
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

    var MyDocument
    if (selectedInvoice) {
        // pdf stuff
        const styles = StyleSheet.create({
            page: {
              flexDirection: "column"
            },
            section: {
              flexGrow: 1
            }
          });

        MyDocument = (
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Date: {selectedInvoice.date}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Location: {selectedInvoice.location}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Deductions: {selectedInvoice.deductions}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Time Difference: {selectedInvoice.timeDifference[0]}</Text>
                </View>
                <View style={styles.section}>
                    <Text>CRT: {selectedInvoice.CRT}</Text>
                </View>
                <View style={styles.section}>
                    <Text>LVP: {selectedInvoice.LVP}</Text>
                </View>
                <View style={styles.section}>
                    <Text>LWP: {selectedInvoice.LWP}</Text>
                </View>
                <View style={styles.section}>
                    <Text>RL: {selectedInvoice.RL}</Text>
                </View>
                <View style={styles.section}>
                    <Text>SUP: {selectedInvoice.SUP}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Fuel: {selectedInvoice.fuel}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Parcel: {selectedInvoice.parcel}</Text>
                </View>
              </Page>
            </Document>
          );
      }

    return (
        <div className='home_content'>
            <NavigationBar title='Invoicing'/>
            <div className='main_content_invoicing'>
                <div className='documents_search_bar_invoicing'>
                    <div className='invoice_form_divs_name'>
                            <div>
                                <label className='dashboard_labels'>Name </label>
                            </div>
                                <input className='search_bar' type="text" name='Name' value={nameValue} onChange={handleChange} autoComplete='off'/>
                        <div className={`${makeSearchBarVisible}`}>
                            {driverSearchArray}
                        </div>
                    </div>
                    <div className='documents_search_bar_invoicing_dates'>
                        Invoice from: {sundayDate} to {sundayTwoWeeks} 
                    </div>
                </div>
                <div className='invoices_overall'>
                    {invoiceContent}
                    {invoiceSelection}
                    <PDFDownloadLink document={MyDocument} filename='Invoice.pdf'  className='pdf_text'>
                        {({ blob, url, loading, error }) => (loading ? <div className='loading_link'><h3 className='loading_text'>Loading document...</h3></div>: <div className='loading_link'><h3 className='loading_text'>Download now</h3></div>)}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default InvoiceWork