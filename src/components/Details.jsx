import React from 'react'

const Details = (props) => {
    console.log(props)

    return (
        <div className='details_component_overall'> 
        <h2>From last trip</h2><br />
            <form className='details_form'>
                <h3>Name: {props.selectedDriver.name}</h3>
                <h3>Route: {props.selectedDriver.route}</h3>
                <h3>Mileage: {props.selectedDriver.mileage}</h3>
                <h3>Parcel: {props.selectedDriver.parcel}</h3>
                <h3>Log In: 33:33</h3>
                <h3>Log Out: 33:33</h3>
                <h3>TORH: {props.selectedDriver.RL}</h3>
                <h3>SUP: {props.selectedDriver.SUP}</h3>
            </form>
        </div>
    )
}

export default Details