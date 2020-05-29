import React, { useEffect, useState} from 'react'
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Documents = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ imageArray, setImageArray ] = useState([])
    const [ submitFilesDivSelection, setSubmitFilesDivSelection ] = useState(false)
    const [ buttonText, setButtonText ] = useState('Add Document')
    const [ classForDiv, setClassForDiv ] = useState('submit_files')
    const [ highlightedPicture, setHighlightedPicture ] = useState(null)
    const [ highlightedImageDetails, setHighlitedImageDetails ] = useState(null)
    const [ currentId, setCurrentId ] = useState(0)

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

    useEffect( () => {
        console.log('on the docs page', props.selectedDriver.imgArray)
        let ImageArray = []
        if (props.selectedDriver.imgArray) {
            props.selectedDriver.imgArray.forEach( (ele, id) => {
                if (ele.verified === false) {
                    ImageArray.push (
                        <div className='image_list_divs_false'>
                            <h3>{ele.name}</h3>
                            <img src={ele.imagesLink} alt='cannot view' key={id} className='uploaded_image_two_false' onClick={(e, source) => handleMakingMainImage(e, ele.imagesLink, ele, id)}/>
                        </div>
                    )
                }
            }
            )
            setImageArray(ImageArray)
        } else {
            setImageArray([])
        }
    }, [props.selectedDriver])

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
            let localArray = [...imageArray]
            localArray[currentId] = (
                <div className='image_list_divs'>
                    <h3>{highlightedImageDetails.name}</h3>
                    <img src={highlightedImageDetails.imagesLink} alt='cannot view' className='uploaded_image_two_true' onClick={(e, source) => handleMakingMainImage(e, highlightedImageDetails.imagesLink, highlightedImageDetails, currentId)}/>
                </div>
            )
            setImageArray(localArray)
        })
        setHighlitedImageDetails(null)
        setHighlightedPicture(null)
    }

    var content

    // verify button
    var verifyButton 
    if (highlightedPicture) {
        if (!highlightedImageDetails.verified) {
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

    // make the big picture appear ------ defining content
    if (highlightedPicture) {
        console.log(highlightedImageDetails)
        content = (
            <div className='big_picture_div'>
                <div className='button_div_box_top'>
                    <div>
                        <h3>
                            Driver: {highlightedImageDetails.driver_id}
                        </h3>
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
    } else {
        content = (
            <div className='submit_files_two'> 
                {imageArray}
            </div>  
        )
    }

    return (
        <div className='overall_documents'>
            {content}
        </div>
    )
}

export default Documents