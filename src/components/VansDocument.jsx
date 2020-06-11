import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const VansDocument = (props) => {
    const [ nameFromListArray, setNameFromListArray] = useState([])
    const [ nameFromList, setNameFromList] = useState('')
    const [ displayNameArray, setDisplayNameArray ] = useState('types_list_array_container_none')
    const [ submitPressed, setSubmitPressed] = useState('Submit')

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
        
        postData(`https://pythonicbackend.herokuapp.com/vehicles/`, {
            make: e.target.make.value,
            vtype: nameFromList,
            registration: e.target.registration.value,
            year: e.target.year.value,
            model: e.target.model.value,
            companyOwned : props.owned
        }).then( response => {
            console.log(response)
            setSubmitted()
            props.reRender(props.content)
        })
    }

    const setSubmitted = () => {
        setSubmitPressed('Added')
        setTimeout( () => {
            setSubmitPressed('Submit')
        }, 2000)
    }

    // list of names for documents
    let namesListArray = [
        'Standard',
        'Large'
    ]   

    // handle selecting name of document
    const handleNameClick = (e, targetName) => {
        setNameFromList(targetName)
        setNameFromListArray([])
        setDisplayNameArray('names_list_array_container_none')
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
        setDisplayNameArray('types_list_array_container')
    }

    // function for mouse leaving names list
    const mouseLeaveName = () => {
        setNameFromListArray([])
        setDisplayNameArray('types_list_array_container_none')
    }

    return (
        <>
            <div className='submit_files_three_freedom'>
                <form onSubmit={handleSubmit} className='form_on_new_Van'>
                    <div className='enter_information_documents_vans'>
                        <div className='inner_input_information_documents_tab'>
                            <h3 className='documents_h3'>Vehicle Type:</h3>
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
                            <h3 className='documents_h3'>Registration:</h3>
                                <input type="text" name="registration" className='document_input_forms' autoComplete='off' required/>
                        </div>
                        <div className='inner_input_information_documents_tab'>
                            <h3 className='documents_h3'>Make:</h3>
                                <input type="text" name="make" className='document_input_forms' autoComplete='off' required/>
                        </div>
                        <div className='inner_input_information_documents_tab'>
                            <h3 className='documents_h3'>Model:</h3>
                                <input type="text" name="model" className='document_input_forms' autoComplete='off' required/>
                        </div>
                        <div className='inner_input_information_documents_tab'>
                            <h3 className='documents_h3'>Year:</h3>
                                <input type="text" name="year" className='document_input_forms' autoComplete='off' required/>
                        </div>
                    </div>
                            <br />
                        <div className="button-container-2" id="formsButtonSubmit">
                            <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                        </div> 
                </form>
            </div>
        </>
    )
}

export default VansDocument