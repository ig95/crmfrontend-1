import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import axios from 'axios'

const Driver = (props) => {
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ image, setImage ] = useState('')
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ gate, setGate ] = useState('')

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

    var handleSubmit = (e) => {
        e.preventDefault()
        let localArray = selectedDriver.documents ? selectedDriver.documents : []
        localArray.push(valueForSubmit)

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')
        };
        
        postData(`https://pythonicbackend.herokuapp.com/employees/${selectedDriver.employee_id}/`, {
            documents: localArray
        }).then( response => {
            console.log(response)
            mainContent = documents()
        })
    }

    // CONTENT SECTIONS

    // Details
    var details = () => {
        return (
            <div>
                <h1>Details</h1>
            </div>
        )
    }
    
    // Daily Operations
    var daily = () => {
        return (
            <div>
                <h1>Daily operations</h1>
            </div>
        )
    }
    
    // Invoices
    var invoices = () => {
        return (
            <div>
                <h1>Invoices</h1>
            </div>
        )
    }
        
    // Trainings
    var training = () => {
        return (
            <div>
                <h1>Training</h1>
            </div>
        )
    }
        
    // Documents
    var documents = () => {
        var imageArray
        if (selectedDriver.documents) {
            imageArray = selectedDriver.documents.map( (ele, id) => 
                <div>
                    <img src={ele} alt='cannot view' key={id} className='uploaded_image_two'/>
                </div>
            )
        } else {
            imageArray = ''
        }

        return (
            <div className='overall_documents'>
                <div className='submit_files'>
                    <form onSubmit={handleSubmit}>
                        <h3>Upload Image</h3>
                        <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} /><br /><br />
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

    var mainContent
    const handleClick = (e, details) => {
        setGate(details)
    }
    
    if (gate === 'documents') {
        mainContent = documents()
    } else if (gate === 'details') {
        mainContent = details()
    } else if (gate === 'daily') {
        mainContent = daily()
    } else if (gate === 'invoices') {
        mainContent = invoices()
    } else if (gate === 'training') {
        mainContent = training()
    }


    useEffect( () => {
        // development data
        // let devObject = {
        //     employee_id: 1,
        //     name: "Nicholas Shankland",
        //     inOff: 1,
        //     location: "DBS2",
        //     route: "DBS2",
        //     mileage: 0,
        //     parcel: 0,
        //     LWP: 0,
        //     LVP: 0,
        //     CRT: 0,
        //     RL: 0,
        //     SUP: "0.0000",
        //     fuel: "0.0000",
        //     vans: "0.0000",
        //     supportDeductions: "0.0000",
        //     documents: ['a string', 'another string'],
        //     datesList: [],
        // }
        // setSelectedDriver(devObject)


        let currentDate = /driver(.*)/.exec(window.location.href)[0].replace(/driver\//, '')
        let driverID = parseInt(currentDate[0])
        let selectedDate = currentDate.slice(2)
        let finalDate = new Date(selectedDate.slice(0,3).concat(' ').concat(selectedDate.slice(3, 6)).concat(' ').concat(selectedDate.slice(6,8)).concat(' ').concat(selectedDate.slice(8,12)))
        setSelectedDate(finalDate)
        props.driver_data.forEach( (ele, id) => {
            console.log(ele.employee_id, ' ', driverID)
            if (ele.employee_id === driverID) {
                console.log(ele)
                setSelectedDriver(ele)
                setSelectedDate(finalDate)
            }
        })
    }, [props.driver_data, props])

    // title at top
    const mainTitleDriverPage = (
        <div className='main_title_driver_page_inc'>
            <h1 className='driver_page_title'>{selectedDriver ? selectedDriver.name : 'loading'}</h1>
            <h3 className='driver_page_title_under'>{selectedDriver ? selectedDriver.location : 'loading'}</h3>
        </div>
    )

    // left Nav
    const leftNav = (
        <div className='left_nav_driver_page'>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'details')}>
                <h3>Details</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'daily')}>
                <h3>Daily Operations</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'invoices')}>
                <h3>Invoices</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'training')}>
                <h3>Trainings</h3>
            </div>
            <div className='left_nav_driver_page_inner_div' onClick={(e, details) => handleClick(e, 'documents')}>
                <h3>Documents</h3>
            </div>
        </div>
    )

    return (
        <div className='home_content'>
            <NavigationBar />
            <div className='main_content_driver'>
                {mainTitleDriverPage}
                {leftNav}
                {mainContent}
            </div>
        </div>
    )
}

export default Driver