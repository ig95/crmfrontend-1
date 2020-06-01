import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const DocumentVans = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ dateSelected, setDateSelected ] = useState(new Date())
    const [ dateSelectedTwo, setDateSelectedTwo ] = useState(new Date())
    const [ calendarGate, setCalendarGate] = useState(false)
    const [ calendarGateTwo, setCalendarGateTwo] = useState(false)
    const [ nameFromListArray, setNameFromListArray] = useState([])
    const [ nameFromList, setNameFromList] = useState('')
    const [ damageNameFromList, setDamageNameFromList] = useState('')
    const [ damageNamesListArray, setDamageNamesListArray] = useState([])
    const [ displayNameArray, setDisplayNameArray ] = useState('names_list_array_container_none')
    const [ damageDisplayNameArray, setDamageDisplayNameArray ] = useState('names_list_array_container_none')
    const [ submitPressed, setSubmitPressed] = useState('Submit')
    const [ vanDocuments, setVanDocuments ] = useState([])
    const [ submitFilesDivSelection, setSubmitFilesDivSelection ] = useState(false)
    const [ buttonText, setButtonText ] = useState('Add Document')
    const [ classForDiv, setClassForDiv ] = useState('submit_files')
    const [ highlightedPicture, setHighlightedPicture ] = useState(null)
    const [ highlightedImageDetails, setHighlitedImageDetails ] = useState(null)
    const [ currentId, setCurrentId ] = useState(0)
    const [ damageGate, setDamageGate ] = useState(false)

    // save image to cloudinary
    var uploadImage = (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
        data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY)
        axios.post(process.env.REACT_APP_UPLOAD_IMAGE, data).then(response => {
            let myOtherResponse = ''
            if (response.data.secure_url.includes('.pdf')) {
                let myNewName = response.data.secure_url.replace(/.pdf/, '.png')
                response.data.secure_url = myNewName
            }
            setValueForSubmit(myOtherResponse ? myOtherResponse : response.data.secure_url)
        })
    }

    useEffect( () => {
        let localArray = []
        props.vanDocs.forEach( (vanDoc, vanDocId) => {
            console.log(props.selectedVan.vehicle_id, parseInt(vanDoc.vehicle_id.split('/')[4]))
            if (parseInt(vanDoc.vehicle_id.split('/')[4]) === props.selectedVan.vehicle_id) {
                localArray.push(
                    <div className='spacer_div_vans_list'>
                        <div className='h3_for_compliance_Page' onClick={(e, vanItem) => handleMakingMainImage(e, vanDoc.imagesLink, vanDoc)}>
                            {vanDoc.name}
                            <img src={vanDoc.imagesLink} alt="Folder" className='image_in_documents_folder'/>
                        </div>
                    </div>
                )
            }
        })
        setVanDocuments(localArray)
    }, [props])

    // handle submitting document to backend
    var handleSubmit = (e) => {
        e.preventDefault()

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        
        postData(`https://pythonicbackend.herokuapp.com/images/`, {
            imagesLink: valueForSubmit,
            name: nameFromList,
            expiryDate: dateSelected,
            vehicle_id: `https://pythonicbackend.herokuapp.com/vehicles/${props.selectedVan.vehicle_id}/`
        }).then( response => {
            console.log(response)
            setSubmitted()
            props.reRender()
        })
    }

    const setSubmitted = () => {
        setSubmitPressed('Added')
        setTimeout( () => {
            setSubmitPressed('Submit')
        }, 2000)
    }

    // make react happy
    const handleChangeCalendar = () => {

    }
    // make react happy
    const handleChangeCalendarTwo = () => {

    }

    // date selection function
    var theCalendar
    const handleDateSelection = (date) => {
        setDateSelected(date)
        setCalendarGate(false)
    }

    // date selection function
    var theCalendarTwo
    const handleDateSelectionTwo = (date) => {
        setDateSelectedTwo(date)
        setCalendarGateTwo(false)
    }

    // calendar function
    const handleMakingCalendar = () => {
        console.log('clicked')
        setCalendarGate(true)
    }

    const handleMakingCalendarTwo = () => {
        console.log('clicked')
        setCalendarGateTwo(true)
    }

    // make the calendar
    if (calendarGate) {
        theCalendar = (
            <div>
                <Calendar
                    onChange={handleDateSelection}
                    value={dateSelected}
                />
            </div>
        )
    } 

    // make the calendar
    if (calendarGateTwo) {
        theCalendarTwo = (
            <div>
                <Calendar
                    onChange={handleDateSelectionTwo}
                    value={dateSelectedTwo}
                />
            </div>
        )
    } 

    // handle selecting name of document
    const handleNameClick = (e, targetName) => {
        setNameFromList(targetName)
        setNameFromListArray([])
        setDisplayNameArray('names_list_array_container_none')
    }

    // handle selecting name of document
    const handleDamageNameClick = (e, targetName) => {
        setDamageNameFromList(targetName)
        setDamageNamesListArray([])
        setDamageDisplayNameArray('names_list_array_container_none')
    }

    // function for making drop down for names list
    const mouseEnterName = () => {
        let localArray = []
        namesListArray.forEach( (ele, id) => {
            localArray.push(
                <div key={id} className='names_in_names_list_array_forms' onClick={(e, targetName) => handleNameClick(e, ele)}>
                    <p>{ele}</p>
                </div>    
            )
        })
        setNameFromListArray(localArray)
        setDisplayNameArray('names_list_array_container')
    }

    // function for mouse leaving names list
    const mouseLeaveName = () => {
        setNameFromListArray([])
        setDisplayNameArray('names_list_array_container_none')
    }

    // function for making drop down for names list
    const mouseEnterDamageName = () => {
        let localArray = []
        damageNamesListArrayTwo.forEach( (ele, id) => {
            localArray.push(
                <div key={id} className='names_in_names_list_array_forms' onClick={(e, targetName) => handleDamageNameClick(e, ele)}>
                    <p>{ele}</p>
                </div>    
            )
        })
        setDamageNamesListArray(localArray)
        setDamageDisplayNameArray('names_list_array_container')
    }

    // function for mouse leaving names list
    const mouseLeaveDamageName = () => {
        setDamageNamesListArray([])
        setDamageDisplayNameArray('names_list_array_container_none')
    }

    // list of names for documents
    let namesListArray = [
        'TAX',
        'MOT',
        'Motor Insurance',
        'G.I.T. Insurance',
        'P.L. Insurance',
        'V5' 
    ]


    let damageNamesListArrayTwo = [
        'Rental Agreement',
        'Pictures of Damages',
        'Statement',
        'Quote',
        'Invoice'
    ]

    const handleMakingMainImage = (e, source, fullSource, id) => {
        setClassForDiv('submit_files_dissapear')
        setButtonText('Add Document')
        setTimeout( () => {
            setSubmitFilesDivSelection(false)
            setClassForDiv('submit_files')
        }, 1000)
        setCurrentId(id)
        setHighlitedImageDetails(fullSource)
        setHighlightedPicture(<img src={source} alt='cannot view' className='big_picture'/>)
    }

    // after the highlighted image screen get the normal divs back 
    const getDivsBack = () => {
        setHighlightedPicture(null)
        setHighlitedImageDetails(null)
    }
    
    // verification process
    const getDivsBackAndVerify = (e) => {
        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        
        postData(`https://pythonicbackend.herokuapp.com/images/${highlightedImageDetails.image_id}/`, {
            verified: true,
            driver_id: `https://pythonicbackend.herokuapp.com/drivers/${props.selectedDriver.driver_id}/`
        }).then( response => {
            
        })
        setHighlitedImageDetails(null)
        setHighlightedPicture(null)
    }

    // submit damage report for vehicle
    const handleSubmitDamage = (e) => {
        // e.preventDefault()
        // let mySubmitObject
        // // 'Rental Agreement',
        // // 'Pictures of Damages',
        // // 'Statement',
        // // 'Quote',
        // // 'Invoice'
        // if (damageNameFromList === 'Statement') {
        //     mySubmitObject = {
        //         statementOfDamage: e.target.statement.value,
        //         vehicle_id: `https://pythonicbackend.herokuapp.com/vehicles/${props.selectedVan.vehicle_id}/`,
        //         dateOfIncident: dateSelectedTwo
        //     }
        // } else if (damageNameFromList === 'Rental Agreement') {

        // }

        //     // VehicleDamages_id = models.AutoField(primary_key=True)
        //     // driver_id = models.ForeignKey(Driver, blank=True, null=True, on_delete=models.CASCADE)
        //     // vehicle_id = models.ForeignKey(Vehicles, on_delete=models.CASCADE)
        //     // statmentOfDamage = models.CharField(max_length = 500)
        //     // dateOfIncident = models.CharField(max_length = 100)
        //     // picturesOfIncident = ArrayField(models.CharField(max_length=100), default=list, blank=True)
        //     // quotePrice = MoneyField("INCIDENT QUOTE", default=0, max_digits=19, decimal_places=2, default_currency='GBP', null = True)
        //     // invoice = MoneyField("INCIDENT INVOICE", default=0, max_digits=19, decimal_places=2, default_currency='GBP', null = True)
        //     // list of names for documents

        // async function postData(url = '', data = {}) {
        //     const response = await fetch(url, {
        //         method: 'POST', 
        //         mode: 'cors',
        //         cache: 'no-cache',
        //         credentials: 'same-origin',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Token ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify(data)
        //         });

        //     return response ? response.json() : console.log('no reponse')
        // };
        
        // postData(`https://pythonicbackend.herokuapp.com/vehicledamages/`, mySubmitObject).then( response => {
        //     console.log(response)
        //     setSubmitted()
        //     props.reRender()
        // })
    }

    var content

    // verify button
    var verifyButton 
    if (highlightedPicture) {
        console.log(highlightedPicture)
        if (!highlightedPicture.verified) {
            verifyButton = (
                <div className="btn_picture" onClick={(e, targetImage) => getDivsBackAndVerify(e, highlightedPicture)}>
                <svg width="125" height="45">
                <defs>
                    <linearGradient id="grad1">
                        <stop offset="0%" stopColor="#F3F6F6"/>
                        <stop offset="100%" stopColor="#F3F6F6" />
                    </linearGradient>
                </defs>
                <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                </svg>
                <span className='span_in_Button'>Verify</span>  
            </div>  
            )
        }
    }

    // render the damage entry form
    const handleDamageClick = () => {
        setDamageGate(true)
    }

    var statementBox
    if (damageNameFromList === 'Statement') {
        statementBox = (
            <div>
                <h3 className='documents_h3'>Statement:</h3>
                <textarea type="textarea" name="statement" className='textarea_vans_page'/>
            </div>
        )
    }
    // if pressed make to form to submit new damage documentation
    var damageContent
    if (damageGate) {
        damageContent = (
            <form onSubmit={handleSubmitDamage} className='form_on_document_page'>
                <div className='enter_information_documents'>
                    <h3 className='documents_h3'>Upload Image for {props.selectedVan.registration}</h3>
                        <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input_forms_top'/>
                        <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
                        <div className='input_information_documents_tab'>
                            <div className='inner_input_information_documents_tab'>
                                <h3 className='documents_h3'>Name of Document:</h3>
                                    <input type="text" 
                                    name="theName"  
                                    value={damageNameFromList} 
                                    autoComplete='off' 
                                    className='document_input_forms' 
                                    onMouseEnter={mouseEnterDamageName}
                                    />
                                    <div className={damageDisplayNameArray} onMouseLeave={mouseLeaveDamageName}>
                                        {damageNamesListArray}
                                    </div>
                            </div>
                            <div className='inner_input_information_documents_tab'>
                                <h3 className='documents_h3'>Expiry Date:</h3>
                                    <input type="text" name="expiryDate"  className='document_input_forms'value={dateSelectedTwo.toDateString()}  onChange={handleChangeCalendarTwo} autoComplete='off' onClick={handleMakingCalendarTwo}/>
                                    {theCalendarTwo}
                            </div>
                            {statementBox}
                        </div>
                        <br />
                    <div className="button-container-2" id="formsButtonSubmit">
                        <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                    </div> 
                </div>
            </form>
        )
    } else {
        damageContent = (
            <div className="button-container-2" id="formsButtonSubmit" onClick={handleDamageClick}>
                <span className='compliance_add_driver_button_submit' >Add Damage</span>
            </div> 
        )
    }

    // function for submitting files
    var submitFilesDiv
    if (highlightedPicture) {
        console.log(highlightedImageDetails)
        submitFilesDiv = (
            <div className='big_picture_div'>
            <div className='button_div_box_top'>
                <div>
                    <h3>
                        Document: {highlightedImageDetails.name}
                    </h3>
                    <h3>
                        Verified: {highlightedImageDetails.verified ? 'True' : 'False'}
                    </h3>
                    <h3>
                        Expiry Date: {new Date(highlightedImageDetails.expiryDate).toDateString()}
                    </h3>
                </div>
            </div>
                <div>
                    {highlightedPicture}
                </div>
            <div className='button_div_box'>
                <div className="btn_picture" onClick={getDivsBack}>
                    <svg width="125" height="45">
                    <defs>
                        <linearGradient id="grad1">
                            <stop offset="0%" stopColor="#F3F6F6"/>
                            <stop offset="100%" stopColor="#F3F6F6" />
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                    </svg>
                    <span className='span_in_Button'>Return</span>  
                </div>   
                {verifyButton}
            </div>
        </div>
        )
    } else if (props.selectedVan) {
        submitFilesDiv = (
            <div className='document_vans_container'>
                <div className='submit_files_three_freedom'>
                    <form onSubmit={handleSubmit} className='form_on_document_page'>
                        <div className='enter_information_documents'>
                            <h3 className='documents_h3'>Upload Image for {props.selectedVan.registration}</h3>
                                <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input_forms_top'/>
                                <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
                                <div className='input_information_documents_tab'>
                                    <div className='inner_input_information_documents_tab'>
                                        <h3 className='documents_h3'>Name of Document:</h3>
                                            <input type="text" 
                                            name="theName"  
                                            value={nameFromList} 
                                            autoComplete='off' 
                                            className='document_input_forms' 
                                            onMouseEnter={mouseEnterName}
                                            />
                                            <div className={displayNameArray} onMouseLeave={mouseLeaveName}>
                                                {nameFromListArray}
                                            </div>
                                    </div>
                                    <div className='inner_input_information_documents_tab'>
                                        <h3 className='documents_h3'>Expiry Date:</h3>
                                            <input type="text" name="expiryDate"  className='document_input_forms'value={dateSelected.toDateString()}  onChange={handleChangeCalendar} autoComplete='off' onClick={handleMakingCalendar}/>
                                            {theCalendar}
                                    </div>
                                </div>
                                <br />
                            <div className="button-container-2" id="formsButtonSubmit">
                                <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                            </div> 
                        </div>
                    </form>
                </div>
                <div className='van_documents_document_vans'>
                    <h2>Documents for Van</h2>
                    <div>
                        {vanDocuments}
                    </div>
                </div>
                <div className='van_documents_document_vans'>
                    <h2>Van Damage Documentation</h2>
                    {damageContent}
                </div>
            </div>
        )
    }

    return (
        <>
            {submitFilesDiv}
        </>
    )
}

export default DocumentVans