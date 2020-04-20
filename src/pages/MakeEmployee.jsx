import React  from 'react'
import NavigationBar from '../components/NavBar'

const MakeEmployee = (props) => {
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

    return (
        <div className='home_content'>
            <NavigationBar title='Create Driver'/>
            <div className='main_content_new_driver'>
                <div className='new_driver_form_container'>
                    <form onSubmit={handleSubmit} className='new_employee_form'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name'/>
                        <label className='labels'>Station</label>
                            <input className='inputs' type="text" name='location'/>
                        <input type="submit" value="Submit" name='submit' className='submit_button'/>    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee