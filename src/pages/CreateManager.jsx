import React from 'react'
import NavigationBar from '../components/NavBar'

const CreateManager = (props) => {
    return (
        <div className='home_content'>
            <NavigationBar title='Create Manager' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='main_content_driver_documents'>

            </div>
        </div>
    )
}

export default CreateManager