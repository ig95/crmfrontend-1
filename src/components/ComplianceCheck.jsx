/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'

const ComplianceCheck = (props) => {
    var CryptoJS = require("crypto-js");
    const [ topRow, setTopRow ] = useState([])
    const [ bottomRows, setBottomRows ] = useState([])
    const [ data, setData ] = useState(null)
    
    // grab the main data
    useEffect( () => {
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
        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response.data)
        })
    }, [])

    // verify the driver
    const handleVerifyDriver = (e, driverProfile, anId) => {
        let theDate = new Date()

        // handle submitting document to backend
        async function putData(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        
        putData(`https://pythonicbackend.herokuapp.com/drivers/${driverProfile.driver_id}/`, {
            status: 'Active',
            approvedBy: props.user_name,
            approvedDateAndTime: theDate.toDateString()
            
        }).then( response => {
            setBottomRows(null)
            if (response.driver_id) {
                bottomArraysKeeper[anId][23] = (
                    <div 
                        key={12*(Math.floor(Math.random()*Math.floor(6000)))} 
                        className='drivers_for_compliance_check_documents' 
                    >
                        {props.user_name}
                    </div>
                )
                bottomArraysKeeper[anId][24] = (
                    <div 
                        key={10*(Math.floor(Math.random()*Math.floor(23000)))} 
                        className='drivers_for_compliance_check_documents' 
                    >
                        {theDate.toDateString()}
                    </div>
                )
            }
            return bottomArraysKeeper
        }).then( response => {
            setBottomRows(response)
        })
    }

    // fuck you react, you are literally shit
    var bottomArraysKeeper

    // function for making the grid
    useEffect( () => {

        // top row list of catagories
        let documentList = [
            'Passport / ID Card',
            'Country of issue',
            'Expiry Date',
            'VISA Expiry Date',
            'Driving License Country Issue',
            'Expiry Date',
            'DVLA Check Expiry Date',
            'BGC',
            'D&A Date Passed',
            'Application Pack',
            'NIN',
            'UTR',
            'P.O.A',
        ]
        let vanList = [
            'Van Owner',
            'Registration Number',
            'Vehicle Type',
            'MOT Expire Date',
            'Motor Insurance Expiry Date',
            'G.I.T. Insurance Expiry Date',
            'P.L. Insurance Expiry Date',
            'V5',
            'Tax Due Date',
        ]
        let managerList = [
            'Approved By',
            'Date & Time'
        ] 
        

        // function for making the top row
        const makeTopRow = () => {
            let localArray = []
            localArray.push(
                <div key={831} className='labels_for_compliance_check_name'>
                    DA Name
                </div>
            )
            documentList.forEach( (label, labelID) => {
                localArray.push(
                    <div key={labelID+5} className='labels_for_compliance_check_documents'>
                        {label}
                    </div>
                )
            })
            vanList.forEach( (label, labelID) => {
                localArray.push(
                    <div key={labelID*(Math.floor(Math.random()*Math.floor(9000)))} className='labels_for_compliance_check_vans'>
                        {label}
                    </div>
                )
            })
            managerList.forEach( (label, labelID) => {
                localArray.push(
                    <div key={labelID*(Math.floor(Math.random()*Math.floor(9000)))} className='labels_for_compliance_check_manager'>
                        {label}
                    </div>
                )
            })
            return localArray
        }

        // middle/bottom rows
        const makeBottomRows = () => {
            if (data) {
                let localArray = []
                data.drivers.forEach( (driver, driverID) => { 
                    if (driver.status !== 'OffboardedForever' && driver.location === props.selectedCity) { 
                        localArray.push(driver)
                    }
                })
                let localCheckArray = []
                localArray.forEach( (driver, driverID) => {
                    
                        let localArray = []
                        
                        for (let i = 0; i < 22 ; i++) {
                            localArray.push(
                                <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_missing'>
                                    Missing
                                </div>
                            )
                        }
                        for (let i = 0; i < 2 ; i++) {
                            localArray.push(
                                <div 
                                    key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} 
                                    className='drivers_for_compliance_check_documents_missing_verify' 
                                    onClick={(e, driverProfile, anId) => handleVerifyDriver(e, driver, driverID)}
                                >
                                    Not Verified
                                </div>
                            )
                        }
                        localArray.unshift(
                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='labels_for_compliance_check_name'>
                                {driver.name}
                            </div>
                        )
                        driver.imgArray.forEach( (image, imageId) => {
                            if (image.name === 'Passport' || image.name === 'ID') {
                                localArray[1] = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {image.name}
                                    </div>
                                )
                                localArray[2] = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {image.countryOfIssue ? image.countryOfIssue : 'not entered'}
                                    </div>
                                )
                                localArray[3] = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {new Date(image.expiryDate).toDateString()}
                                    </div>
                                )
                            } 
                            if (image.name === 'Visa') {
                                localArray[4]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {new Date(image.expiryDate).toDateString()}
                                    </div>
                                )
                            }
                            if (image.name === 'Driving licence Front' || image.name === 'Driving licence Back') {
                                localArray[5]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {image.countryOfIssue ? image.countryOfIssue : 'not entered'}
                                    </div>
                                )
                                localArray[6]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {new Date(image.expiryDate).toDateString()}
                                    </div>
                                )
                            }
                            if (image.name === 'DVLA Check') {
                                localArray[7]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {new Date(image.expiryDate).toDateString()}
                                    </div>
                                )
                            }
                            if (image.name === 'BGC') {
                                localArray[8]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                        V
                                    </div>
                                )
                            }
                            if (image.name === 'D&A test') {
                                localArray[9]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                        {new Date(image.expiryDate).toDateString()}
                                    </div>
                                )
                            }
                            if (image.name === 'Application Package') {
                                localArray[10]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                        V
                                    </div>
                                )
                            }
                            if (image.name === 'NIN') {
                                localArray[11]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                        V
                                    </div>
                                )
                            }
                            if (image.name === 'UTR') {
                                localArray[12]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                        V
                                    </div>
                                )
                            }
                            if (image.name === 'POA') {
                                localArray[13]  = (
                                    <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                        V
                                    </div>
                                )
                            }
                        })
                        if (driver.vehicleArray) {
                            if (driver.vehicleArray.length > 0) {
                                // 14
                                if (!driver.vehicleArray[0]) {
                                    localArray[14] = (
                                        <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                            V
                                        </div>
                                    )
                                } else {
                                    localArray[14] = (
                                        <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_false'>
                                            X
                                        </div>
                                    )
                                }
                                if (driver.vehicleArray[0]) {
                                    localArray[15] = (
                                        <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                            {driver.vehicleArray[0].registration}
                                        </div>
                                    )
                                }
                                if (driver.vehicleArray[0]) {
                                    localArray[16] = (
                                        <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                            {driver.vehicleArray[0].vtype}
                                        </div>
                                    )
                                }
                            }
                        }
                        if (driver.vehicleArray) {
                            if (driver.vehicleArray.length > 0) {
                                driver.vehicleArray[0].imgArray.forEach( (vehicleImage, vehicleImageID) => {
                                    if (vehicleImage.name === 'MOT') {
                                        localArray[17] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                                {new Date(vehicleImage.expiryDate).toDateString()}
                                            </div>
                                        )
                                    }
                                    if (vehicleImage.name === 'Motor Insurance') {
                                        localArray[18] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                                {new Date(vehicleImage.expiryDate).toDateString()}
                                            </div>
                                        )
                                    }
                                    if (vehicleImage.name === 'G.I.T. Insurance') {
                                        localArray[19] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                                {new Date(vehicleImage.expiryDate).toDateString()}
                                            </div>
                                        )
                                    }
                                    if (vehicleImage.name === 'P.L. Insurance') {
                                        localArray[20] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                                {new Date(vehicleImage.expiryDate).toDateString()}
                                            </div>
                                        )
                                    }
                                    if (vehicleImage.name === 'V5') {
                                        localArray[21] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_check'>
                                                V
                                            </div>
                                        )
                                    }
                                    if (vehicleImage.name === 'TAX') {
                                        localArray[22] = (
                                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents'>
                                                {new Date(vehicleImage.expiryDate).toDateString()}
                                            </div>
                                        )
                                    }
                                })
                            }
                        }
                        if (driver.status === 'Active') {
                            localArray[23] = (
                                <div 
                                    key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} 
                                    className='drivers_for_compliance_check_documents' 
                                >
                                    {driver.approvedBy}
                                </div>
                            )
                            localArray[24] = (
                                <div 
                                key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} 
                                className='drivers_for_compliance_check_documents' 
                                >
                                    {driver.approvedDateAndTime}
                                </div>
                            )
                        }
                        localCheckArray.push(localArray)
                    })
                    return localCheckArray
                } else {
                    return []
                }
        }
        let topArray = makeTopRow()
        let bottomArray = makeBottomRows()
        // set the rows into state for display
        setTopRow(topArray) 
        setBottomRows(bottomArray)
        bottomArraysKeeper = bottomArray
    }, [data, props.selectedCity])

    return (
        <div className='compliance_check_container'>
            <div className='row_container'>
                {topRow}
            </div>
            <div className='row_container'>
                {bottomRows}
            </div>
        </div>
    )
}

export default ComplianceCheck