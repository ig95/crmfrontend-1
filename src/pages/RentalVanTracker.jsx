import React from 'react'
import NavigationBar from '../components/NavBar'

const RentalVanTracker = (props) => {

    return (
        <div className='home_content' >
            <NavigationBar title='Rental Van Tracker' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>

        </div >
    )
}

export default RentalVanTracker