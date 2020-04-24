import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Documents = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ imageArray, setImageArray ] = useState([])
    const [ reRenderTrigger, setReRenderTrigger ] = useState(0)

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

    useEffect( () => {
        if (props.selectedDriver.documents) {
            let imageArray
            imageArray = props.selectedDriver.documents.map( (ele, id) => 
                <div>
                    <img src={ele} alt='cannot view' key={id} className='uploaded_image_two'/>
                </div>
            )
            setImageArray(imageArray)
        } else {
            setImageArray([])
        }
    }, [reRenderTrigger, props.selectedDriver.documents])

    return (
        <div className='overall_documents'>
            <div className='submit_files'>
                <form onSubmit={handleSubmit}>
                    <h3>Upload Image</h3>
                    <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input'/><br /><br />
                    <input type='submit' value='Submit' className='submit_image'/>
                </form><br /><hr /><br />
                <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
            </div>
            <div className='submit_files_two'>
                {imageArray}
            </div>
        </div>
    )
}

export default Documents