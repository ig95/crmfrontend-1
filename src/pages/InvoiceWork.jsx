import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import waterDrop from '../images/waterDrop.png'

const InvoiceWork = (props) => {
    const [ dataset, setDataset ] = useState(null)
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ selectedInvoice, setSelectedInvoice ] = useState(null)
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
    
    var invoiceSelection
    // handle selecting invoice from bar
    const handleInvoiceSelection = (e, date) => {
        let invoices = myMapFunc()
        console.log(date)
        if (date !== 'overall') {
            invoices.forEach( (ele, id) => {
                if (ele.date === date) {
                    setSelectedInvoice(ele)
                }
            })
        } else {
            setSelectedInvoice('overall')
        }
    }
    

    if (selectedInvoice !== 'overall' && selectedInvoice ) {
        invoiceSelection = (
            <div className='single_Invoice'>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Date: {selectedInvoice.date}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Location: {selectedInvoice.location}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Deductions: {selectedInvoice.deductions}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        logIn_time: {selectedInvoice.logIn_time}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        logOut_time: {selectedInvoice.logOut_time}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Time Difference: {selectedInvoice.timeDifference[0]}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        CRT: {selectedInvoice.CRT}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        LVP: {selectedInvoice.LVP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        LWP: {selectedInvoice.LWP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        RL: {selectedInvoice.RL}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        SUP: {selectedInvoice.SUP}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Fuel: {selectedInvoice.fuel}
                    </h3>
                </div>
                <div className='invoice_item'>
                    <h3 className='inside_text_invoice'>
                        Parcel: {selectedInvoice.parcel}
                    </h3>
                </div>
            </div>
        )
        if (selectedInvoice) {
            const styles = StyleSheet.create({
                single_Invoice_overall: {
                    height: '70vh',
                    marginTop: '5px',
                    borderTop: '1px solid #232F3E',
                    padding: '1rem'
                },
            
                invoice_overall_title: {
                    backgroundColor: '#232F3E',
                    color: 'white',
                    minHeight: '25vh',
                    alignItems: "center"
                },
            
                h20_title: {
                    fontSize: 30,
                    paddingTop: 15,
                    alignItems: "center",
                    color: 'white'
                },
            
                billing_details_portion: {
                    flex: 2,
                    flexDirection: "row",
                    border: '2px solid #232F3E',
                    marginTop: '.5rem',
                    minHeight: '60vh',
                },
            
                water_drop_picture: {
                    paddingTop: 75,
                    height: '18vh',
                    width: '13vw'
                },
            
                left_section_invoice: {
                    width: '40vw',
                    margin: 20
                },
            
                right_section_invoice: {
                    width: '40vw',
                    margin: 20
                },
            
                driver_details_section: {
                    width: '20vw',
                    height: '10vh',
                    fontSize: '1.5em',
                    padding: 20,
                    margin: 20,
                    borderBottom: '1px solid #232F3E'
                },
                
                driver_details_section_right: {
                    width: '25vw',
                    height: '10vh',
                    padding: 20,
                    margin: 20
                },
    
                page: {
                  flexDirection: "column"
                },
    
                spacer: {
                    paddingLeft: 15
                },
    
                section1: {
                  flexGrow: 1
                },
    
                section2: {
                  flexGrow: 2
                }, 
    
                section3: {
                  flexGrow: 2
                }
            });
            let invoices = myMapFunc()
            if (invoices.length > 0) {
                MyDocument = (
                    <Document>
                        <Page size="A4" style={styles.page}>
                        <View style={styles.single_Invoice_overall}>
                            <View style={styles.section1}>
                                <View style={styles.invoice_overall_title}>
                                    <View style={styles.water_drop_container}>
                                        <Image src={waterDrop} alt="water" style={styles.water_drop_picture}/>
                                    </View>
                                    <Text style={styles.h20_title}>
                                        H20 Logistics
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.billing_details_portion}>
                                <View style={styles.section2}>
                                    <View style={styles.left_section_invoice}>
                                        <Text style={styles.spacer}>
                                            {invoices[0].driver_id}
                                        </Text>
                                        <View
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                                marginBottom: 10,
                                                marginTop: 10
                                            }}
                                        />
                                        <Text style={styles.spacer}>
                                            {invoices[0].location}
                                        </Text>
                                        <View
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                                marginBottom: 10,
                                                marginTop: 10
                                            }}
                                        />
                                        <Text style={styles.spacer}>
                                            Comment: This driver is truly exceptional
                                        </Text>
                                    </View>
                                </View>  
                                <View style={styles.section2}>
                                    <View style={styles.right_section_invoice}>
                                        <Text style={styles.spacer}>
                                            Dates: {sundayDate} to {sundayTwoWeeks}
                                        </Text>
                                        <View
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                                marginBottom: 10,
                                                marginTop: 10
                                            }}
                                        />
                                        <Text style={styles.spacer}>
                                            Amount: {invoices[0].supportDeductions}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        </Page>
                    </Document>
                )
            }
        }
    } else if (selectedInvoice === 'overall') {
        let invoices
        if (nameValue) {
            invoices = myMapFunc()
        }
        if (invoices.length > 0) {
            console.log(invoices)
            invoiceSelection = (
                <div className='single_Invoice_overall'>
                    <div className='invoice_overall_title'>
                        <div className='water_drop_container'>
                            <img src={waterDrop} alt="water" className='water_drop_picture'/>
                        </div>
                        <div>
                            <h1 className='h20_title'>
                                H20 Logistics
                            </h1>
                        </div>
                    </div>
                    <div className='billing_details_portion'>
                        <div className='left_section_invoice'>
                            <div className='driver_details_section'>
                                {invoices[0].driver_id}
                                <br />
                                {invoices[0].location}
                            </div>
                            <div className='driver_details_section'>
                                Comment: This driver is truly exceptional
                            </div>
                        </div>
                        <div className='right_section_invoice'>
                            <div className='driver_details_section_right'>
                                Dates: {sundayDate} to {sundayTwoWeeks}
                            </div>
                            <div className='driver_details_section_right'>
                                Amount: {invoices[0].supportDeductions}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (selectedInvoice) {
            // pdf stuff
            const styles = StyleSheet.create({
                single_Invoice_overall: {
                    height: '70vh',
                    marginTop: '5px',
                    borderTop: '1px solid #232F3E',
                    padding: '1rem'
                },
            
                invoice_overall_title: {
                    backgroundColor: '#232F3E',
                    color: 'white',
                    minHeight: '25vh',
                    alignItems: "center"
                },
            
                h20_title: {
                    fontSize: 30,
                    paddingTop: 15,
                    alignItems: "center",
                    color: 'white'
                },
            
                billing_details_portion: {
                    flex: 2,
                    flexDirection: "row",
                    border: '2px solid #232F3E',
                    marginTop: '.5rem',
                    minHeight: '60vh',
                },
            
                water_drop_picture: {
                    paddingTop: 75,
                    height: '18vh',
                    width: '13vw'
                },
            
                left_section_invoice: {
                    width: '40vw',
                    margin: 20
                },
            
                right_section_invoice: {
                    width: '40vw',
                    margin: 20
                },
            
                driver_details_section: {
                    width: '20vw',
                    height: '10vh',
                    fontSize: '1.5em',
                    padding: 20,
                    margin: 20,
                    borderBottom: '1px solid #232F3E'
                },
                
                driver_details_section_right: {
                    width: '25vw',
                    height: '10vh',
                    padding: 20,
                    margin: 20
                },

                page: {
                  flexDirection: "column"
                },

                spacer: {
                    paddingLeft: 15
                },

                section1: {
                  flexGrow: 1
                },

                section2: {
                  flexGrow: 2
                }, 

                section3: {
                  flexGrow: 2
                }
              });
    
            MyDocument = (
                <Document>
                  <Page size="A4" style={styles.page}>
                    <View style={styles.single_Invoice_overall}>
                        <View style={styles.section1}>
                            <View style={styles.invoice_overall_title}>
                                <View style={styles.water_drop_container}>
                                    <Image src={waterDrop} alt="water" style={styles.water_drop_picture}/>
                                </View>
                                <Text style={styles.h20_title}>
                                    H20 Logistics
                                </Text>
                            </View>
                        </View>
                        <View style={styles.billing_details_portion}>
                            <View style={styles.section2}>
                                <View style={styles.left_section_invoice}>
                                    <Text style={styles.spacer}>
                                        {invoices[0].driver_id}
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                            marginBottom: 10,
                                            marginTop: 10
                                        }}
                                    />
                                    <Text style={styles.spacer}>
                                        {invoices[0].location}
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                            marginBottom: 10,
                                            marginTop: 10
                                        }}
                                    />
                                    <Text style={styles.spacer}>
                                        Comment: This driver is truly exceptional
                                    </Text>
                                </View>
                            </View>  
                            <View style={styles.section2}>
                                <View style={styles.right_section_invoice}>
                                    <Text style={styles.spacer}>
                                        Dates: {sundayDate} to {sundayTwoWeeks}
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                            marginBottom: 10,
                                            marginTop: 10
                                        }}
                                    />
                                    <Text style={styles.spacer}>
                                        Amount: {invoices[0].supportDeductions}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                  </Page>
                </Document>
            );
        }
    }

    var MyDocument

    return (
        <div className='home_content'>
            <NavigationBar title='Invoicing' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
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
                        {({ blob, url, loading, error }) => (
                            loading ? 
                            <div className='loading_link'>
                                <h3 className='loading_text'>
                                    Loading document...
                                </h3>
                            </div> : 
                            <div className='loading_link'>
                                <h3 className='loading_text'>
                                    Download now
                                </h3>
                            </div>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default InvoiceWork