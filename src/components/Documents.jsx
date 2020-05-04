import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Documents = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ imageArray, setImageArray ] = useState([])
    const [ reRenderTrigger, setReRenderTrigger ] = useState(0)
    const [ submitFilesDivSelection, setSubmitFilesDivSelection ] = useState(false)
    const [ buttonText, setButtonText ] = useState('Add Document')
    const [ classForDiv, setClassForDiv ] = useState('submit_files')
    const [ highlightedPicture, setHighlightedPicture ] = useState(null)

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
                // if (response.data.secure_url.includes('.jpg')) {
                //     let myNewName = response.data.secure_url.replace(/.jpg/, '.png')
                //     response.data.secure_url = myNewName
                // }
                setValueForSubmit(myOtherResponse ? myOtherResponse : response.data.secure_url)
            })
        }
    
    var handleSubmit = (e) => {
        e.preventDefault()
        let localArray = props.selectedDriver.documents ? props.selectedDriver.documents : []
        localArray.push(valueForSubmit)

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
        
        postData(`https://pythonicbackend.herokuapp.com/drivers/${props.selectedDriver.driver_id}/`, {
            documents: localArray
        }).then( response => {
            setReRenderTrigger(reRenderTrigger+1)
        })
    }

    const handleMakingMainImage = (e, source) => {
        setClassForDiv('submit_files_dissapear')
        setButtonText('Add Document')
        setTimeout( () => {
            setSubmitFilesDivSelection(false)
            setClassForDiv('submit_files')
        }, 1000)
        setHighlightedPicture(<img src={source} alt='cannot view' className='big_picture'/>)
    }

    useEffect( () => {
        if (props.selectedDriver.documents) {
            let imageArray
            imageArray = props.selectedDriver.documents.map( (ele, id) => 
                <div>
                    <img src={ele} alt='cannot view' key={id} className='uploaded_image_two' onClick={(e, source) => handleMakingMainImage(e, ele)}/>
                </div>
            )
            setImageArray(imageArray)
        } else {
            setImageArray([])
        }
    }, [reRenderTrigger, props.selectedDriver.documents])

    const handleClick = () => {
        if (buttonText === 'Add Document') {
            setSubmitFilesDivSelection(true)
            setButtonText('View Full')
        } else {
            setClassForDiv('submit_files_dissapear')
            setButtonText('Add Document')
            setTimeout( () => {
                setSubmitFilesDivSelection(false)
                setClassForDiv('submit_files')
            }, 1000)
        }
    }

    var submitFilesDiv
    if (submitFilesDivSelection) {
        submitFilesDiv = (
            <div className={`${classForDiv}`}>
                <form onSubmit={handleSubmit} className='form_on_document_page'>
                    <h3>Upload Image for {props.selectedDriver.name}</h3>
                    <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input'/><br /><br />
                    <div class="btn" onClick={handleSubmit}>
                        <svg width="125" height="45">
                            <defs>
                                <linearGradient id="grad1">
                                    <stop offset="0%" stop-color="#232F3E"/>
                                    <stop offset="100%" stop-color="#232F3E" />
                                </linearGradient>
                            </defs>
                            <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                        </svg>
                        <span className='span_in_Button_add'>Submit</span>  
                    </div>            
                </form><br /><br /><br /><br /><hr />
                <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
            </div>
        )
    }
    const getDivsBack = () => {
        setHighlightedPicture(null)
    }
    
    const getDivsBackAndVerify = () => {
        setHighlightedPicture(null)
    }

    var content
    if (highlightedPicture) {
        content = (
            <div className='big_picture_div'>
                <div>
                    {highlightedPicture}
                </div>
                <div className='button_div_box'>
                    <div class="btn_picture" onClick={getDivsBack}>
                        <svg width="125" height="45">
                        <defs>
                            <linearGradient id="grad1">
                                <stop offset="0%" stop-color="#F3F6F6"/>
                                <stop offset="100%" stop-color="#F3F6F6" />
                            </linearGradient>
                        </defs>
                        <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                        </svg>
                        <span className='span_in_Button'>Return</span>  
                    </div>   
                    <div class="btn_picture" onClick={getDivsBackAndVerify}>
                        <svg width="125" height="45">
                        <defs>
                            <linearGradient id="grad1">
                                <stop offset="0%" stop-color="#F3F6F6"/>
                                <stop offset="100%" stop-color="#F3F6F6" />
                            </linearGradient>
                        </defs>
                        <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="115" height="35"></rect>
                        </svg>
                        <span className='span_in_Button'>Verify</span>  
                    </div>   
                </div>
            </div>
        )
    } else {
        content = (
            <div className='submit_files_two'>
                <div class="btn_big" onClick={handleClick}>
                    <svg width="200" height="60">
                        <defs>
                            <linearGradient id="grad1">
                                <stop offset="0%" stop-color="#232F3E"/>
                                <stop offset="100%" stop-color="#232F3E" />
                            </linearGradient>
                        </defs>
                        <rect x="5" y="5" rx="20" fill="none" stroke="url(#grad1)" width="180" height="50"></rect>
                    </svg>
                    <span className='span_in_Button_big'>{buttonText}</span>  
                </div>    
                {imageArray}
            </div>  
        )
    }

    return (
        <div className='overall_documents'>
            {submitFilesDiv}
            {content}
        </div>
    )
}

export default Documents