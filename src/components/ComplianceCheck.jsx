import React, { useEffect, useState} from 'react'

const ComplianceCheck = (props) => {
    const [ topRow, setTopRow ] = useState([])
    const [ bottomRows, setBottomRows ] = useState([])


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
            console.log(props.data)
            let localCheckArray = []
            if (props.data) {
                props.data.drivers.forEach( (driver, driverID) => {
                    let localArray = []
                    localArray.push(
                        <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='labels_for_compliance_check_name'>
                            {driver.name}
                        </div>
                    )
                    for (let i = 0; i < 24 ; i++) {
                        localArray.push(
                            <div key={driverID*(Math.floor(Math.random()*Math.floor(9000)))} className='drivers_for_compliance_check_documents_missing'>
                                Missing
                            </div>
                        )
                    }
                    driver.imgArray.forEach( (image, imageId) => {
                        if (image.name === 'Passport' || image.name === 'ID') {
                            console.log('found passport', driver)
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
                    // 'TAX',
                    // 'MOT',
                    // 'Motor Insurance',
                    // 'G.I.T. Insurance',
                    // 'P.L. Insurance',
                    // 'V5' 
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
                    localCheckArray.push(localArray)
                })
            }
            return localCheckArray
        }

        // set the rows into state for display
        setTopRow(makeTopRow()) 
        setBottomRows(makeBottomRows())
    }, [props.data])

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