import React, { useEffect, useState }  from 'react'
import NavigationBar from '../components/NavBar'

const MakeEmployee = (props) => {
    const [ logicalGate, setLogicalGate ] = useState(false)
    const [ dataSet, setDataSet ] = useState(null)

    useEffect(() => {
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/data/').then( (response) => {
            console.log(response.data.drivers)
            setDataSet(response.data.drivers)
        })  
    }, [])

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

    const backToNormal = () => {
        setLogicalGate(false)
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
                    <div className="button-container-2" onClick={handleSubmit}>
                        <span className="mas2">Make Driver</span>
                        <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Make Driver
                        </button>
                    </div>  
                    <br />   
                    <div className="button-container-2" onClick={backToNormal}>
                        <span className="mas2">Return</span>
                        <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Return
                        </button>
                    </div>     
                </form>
            </div>
        )
    }

    var content

    // make the list of driver
    const makeListDrivers = () => {
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
          }
        let localArray = []
        if (dataSet) {
            localArray.push(
                <div key={5000} className='bottom_name_divs_new_driver'>
                    <div className='inner_new_document_divs_name_top'>
                        <h3>Name</h3>
                    </div>
                    <div className='inner_new_document_divs_top'>
                        <h3>Email</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Phone</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Onboarding Tasks</h3>
                    </div>
                    <div className='inner_new_document_divs_phone_top'>
                        <h3>Status</h3>
                    </div>
                </div>
            )
            dataSet.forEach( (ele, id) => {
                localArray.push(
                    <div key={id} className='bottom_name_divs_new_driver'>
                        <div className='inner_new_document_divs_name'>
                            <h3>{ele.name}</h3>
                        </div>
                        <div className='inner_new_document_divs'>
                            <h3>{ele.email ? ele.email : `${ele.name}@gmail.com` }</h3>
                        </div>
                        <div className='inner_new_document_divs_phone'>
                            <h3>{ele.phone ? ele.phone : `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}-${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}`}</h3>
                        </div>
                        <div className='inner_new_document_divs_phone'>
                            <h3>{ele.onboarding ? `${ele.onboarding}/13 Completed` : `${getRandomInt(10)}/13 Completed` }</h3>
                        </div>
                        <div className='inner_new_document_divs_phone_status'>
                            <h3>{ele.status ? ele.status : 'Offboarded' }</h3>
                        </div>
                    </div>
                )
            })
        }
        return localArray
    }
    content = makeListDrivers()

    // look for drivers
    const handleSubmitSearch = () => {

    }

    // new driver selection
    const handleMakeDriverPage = () => {
        setLogicalGate(true)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Create Driver'/>
            {makeTheDriver}
            <div className='main_content_new_driver'>
                <div className='search_bar_top_new_driver'>
                    <div>
                        <form onSubmit={handleSubmitSearch} className='form_new_driver_page'>
                            <div className='inputs_new_driver'>
                                <label htmlFor="Status">Status</label>
                                    <input type="text" name="Status" className='inputs_new_driver_page'/>
                                
                            </div>
                            <div className='inputs_new_driver'>
                                <label htmlFor="Name">Name</label>
                                    <input type="text" name="Name" className='inputs_new_driver_page'/>
                                
                            </div>
                            <div className='inputs_new_driver'>
                                <label htmlFor="Email">Email</label>
                                    <input type="text" name="Email" className='inputs_new_driver_page'/>
                            </div>
                            <div className='inputs_new_driver'>
                                <label htmlFor="Service Areas">Service Areas</label>
                                    <input type="text" name="Service Areas" className='inputs_new_driver_page'/>
                                
                            </div>
                        </form>
                    </div>
                    <div className="button-container-2" >
                      <span className="mas2">Search</span>
                      <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Search
                      </button>
                    </div>  
                    <div className="button-container-2" onClick={handleMakeDriverPage}>
                      <span className="mas2">Add Driver</span>
                      <button className='buttonFront2' id='work2' type="button" name="Hover">
                        Add Driver
                      </button>
                    </div>  
                </div>
                <div className='content_bottom_new_driver'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default MakeEmployee