import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const FormsDocuments = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ imageArray, setImageArray ] = useState([])
    const [ submitFilesDivSelection, setSubmitFilesDivSelection ] = useState(true)
    const [ highlightedPicture, setHighlightedPicture ] = useState(null)
    const [ nameValue, setNameValue ] = useState('')
    const [ dateSelected, setDateSelected ] = useState(new Date())
    const [ calendarGate, setCalendarGate] = useState(false)


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

    // function for selecting image for big div 
    const handleMakingMainImage = (e, source) => {
        setHighlightedPicture(<img src={source} alt='cannot view' className='big_picture'/>)
    }

    // handle submitting document to backend
    var handleSubmit = (e) => {
        e.preventDefault()
        console.log(valueForSubmit)
        console.log(props.selectedDriver.driver_id)
        let imageName
        nameValue ? imageName = nameValue : imageName = 'None'

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
            ImagesLink: valueForSubmit,
            ImageName: imageName,
            ExpiryDate: dateSelected,
            driver_id: `https://pythonicbackend.herokuapp.com/drivers/${props.selectedDriver.driver_id}/`
        }).then( response => {
            let myNum = 0
            if (imageArray.length > 0) {
                myNum = imageArray.length-1
            }
            let valueForImage = (
                <div className='image_list_divs_false'>
                    <h3>{imageName}</h3>
                    <img src={valueForSubmit} alt='cannot view' className='uploaded_image_two_false' onClick={(e, source) => handleMakingMainImage(e, valueForSubmit, response, myNum)}/>
                </div>
            )
            let localArray = []
            if (imageArray.length > 0) {
                localArray = [...imageArray]
                localArray.push(valueForImage)
            } else {
                localArray.push(valueForImage)
            }
            setImageArray(localArray)
        })
    }
     // make the state keep he name
     const handleChange = (e) => {
        setNameValue(e.target.value)
    }

    // make react happy
    const handleChangeCalendar = () => {

    }

    // date selection function
    var theCalendar
    const handleDateSelection = (date) => {
        setDateSelected(date)
        setCalendarGate(false)
    }

    // calendar function
    const handleMakingCalendar = () => {
        console.log('clicked')
        setCalendarGate(true)
    }

    // make the calendar
    if (calendarGate) {
        theCalendar = (
            theCalendar = (
                <div>
                    <Calendar
                        onChange={handleDateSelection}
                        value={dateSelected}
                    />
                </div>
            )
        )
    }

    // function for submitting files
    var submitFilesDiv
    if (props.selectedDriver) {
        console.log(props)
        submitFilesDiv = (
            <div className='submit_files_two_freedom'>
                <form onSubmit={handleSubmit} className='form_on_document_page'>
                    <div className='enter_information_documents'>
                        <h3 className='documents_h3'>Upload Image for {props.selectedDriver.name}</h3>
                            <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input_forms_top'/>
                            <div className='input_information_documents_tab'>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Name of Document:</h3>
                                        <input type="text" name="theName"  value={nameValue} onChange={handleChange} autoComplete='off' className='document_input_forms'/>
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Expiry Date:</h3>
                                        <input type="text" name="theName"  className='document_input_forms'value={dateSelected.toDateString()}  onChange={handleChangeCalendar} autoComplete='off' onClick={handleMakingCalendar}/>
                                        {theCalendar}
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Country of Issue:</h3>
                                        <input type="text" name="country" className='document_input_forms' autoComplete='off'/>
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Registration:</h3>
                                        <input type="text" name="registration" className='document_input_forms' autoComplete='off'/>
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Vehicle Type:</h3>
                                        <input type="text" name="vehicleType" className='document_input_forms' autoComplete='off'/>
                                </div>
                            </div>
                            <br />
                    <div className="button-container-2" >
                        <span className="mas2">Submit</span>
                            <button className='buttonFront2' id='work2' type="button" name="Hover">
                                <input type="submit" value='Submit' className='make_submit_invisible'/>
                            </button>
                        </div> 
                    </div> 
                </form>
                <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
            </div>
        )
    }

    return (
        <>
        {submitFilesDiv}
        </>
    )
}

export default FormsDocuments