import React, { useEffect, useState }  from 'react'
import NavigationBar from '../components/NavBar'

const MakeEmployee = (props) => {
    const [ logicalGate, setLogicalGate ] = useState(true)

    // send form to backend
    const handleSubmit = (e) => {
        e.preventDefault();

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

        postData('https://pythonicbackend.herokuapp.com/drivers/', {
            name: e.target.name.value, 
            location: e.target.location.value
        }).then( (response) => {
                console.log(response)
        })

        e.target.submit.value = 'Thanks'
        e.target.name.value = ''
        e.target.location.value = ''
    }

    var makeTheDriver
    if (logicalGate) {
        makeTheDriver = (
            <div className='new_driver_form_container'>
                <form onSubmit={handleSubmit} className='new_employee_form'>
                    <label className='labels'>Name</label>
                        <input className='inputs' type="text" name='name'/>
                    <label className='labels'>Station</label>
                        <input className='inputs' type="text" name='location'/>
                    <label className='labels'>Address</label>
                        <input className='inputs' type="text" name='address'/>
                    <label className='labels'>Mobile</label>
                        <input className='inputs' type="text" name='mobile'/>
                    <label className='labels'>Email</label>
                        <input className='inputs' type="text" name='email'/>
                        <br /><br />
                    <div className="btn_big" onClick={handleSubmit}>
                        <svg width="200" height="60">
                            <defs>
                                <linearGradient id="grad1">
                                    <stop offset="0%" stopColor="#232F3E"/>
                                    <stop offset="100%" stopColor="#232F3E" />
                                </linearGradient>
                            </defs>
                            <rect x="5" y="5" rx="20" fill="none" stroke="url(#grad1)" width="180" height="50"></rect>
                        </svg>
                        <span className='span_in_Button_big'>Create Driver</span>  
                    </div>     
                </form>
            </div>
        )
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Create Driver'/>
            {makeTheDriver}
            {/* <div className='main_content_new_driver'>
                <div className='search_bar_top_new_driver'>

                </div>
                <div className='content_bottom_new_driver'>

                </div>
            </div> */}
        </div>
    )
}

export default MakeEmployee