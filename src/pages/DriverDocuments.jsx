import React, { useState, useEffect, useRef } from 'react'
import NavigationBar from '../components/NavBar'
import FormsDocuments from '../components/FormsDocuments'

const DriverDocuments = (props) => {
    const [ data, setData ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState(props.station ? props.station : 'DBS2')
    const [ driverList, setDriverList ] = useState(null)
    const [ listClassName, setListClassName ] = useState('')
    const [ driverSearchArray, setDriverSearchArray ] = useState([])
    const [ makeSearchBarVisible, setMakeSearchBarVisible ] = useState('dashboard_form_divs_name_bar_none')
    const [ nameValue, setNameValue ] = useState('')
    const [ arrowSelect, setArrowSelect ] = useState(0)
    const [ nameList, setNameList ] = useState(null)
    const [ shorterList , setShorterList ] = useState([])
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ driverForOffboarding, setDriverForOffboarding ] = useState(null)
    const [ reload, setReload] = useState(0)
    const [ otherReload, setOtherReload ] = useState(0)

    // grab the main data
    useEffect( () => {
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
        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response.data)
            console.log(reload)
        })
    }, [reload])

    // function for handling changing the dropdiwn selection
    const handleSelectCity = (e, cityAbbreviation) => {
        setSelectedCity(cityAbbreviation)
    }

    // change color and select name from list
    const handleNameSelection = (e, nameSelection) => {
        setListClassName(nameSelection)
        data.drivers.forEach( driver => {
            if (driver.name === nameSelection) {
                setDriverForOffboarding(driver)
            }
        })
    }

    // map the drivers
    // changes when the data changes
    useEffect( () => {
        const mapTheDrivers = () => {
        let localArray = []
        if (data) {
            console.log(data)
            data.drivers.forEach( driver => {
                if (driver.location === selectedCity) {
                    if (driver.status === 'Active') {
                        localArray.push(
                            driver.name
                        )
                    }
                }
            })
        }
            let quicksort = (arr, min, max) => {
                // set the quicksort pointer to the first element in the array
                if (min === undefined) {
                    min = 0
                }
        
                // set the quicksort max pointer to the last element in the array
                if (max === undefined) {
                    max = arr.length - 1
                }
        
                // if the arr pointer's aren't at each other yet then continue recursively iterating
                if (min < max) {
                    let pivot = partition(arr, min, max)
                    quicksort(arr, min, pivot)
                    quicksort(arr, pivot + 1, max)
                }
        
                // return the arr after it has been sorted
                return arr
            }
        
            let partition = (arr, min, max) => {
                // set the pivot in the middle of the array
                let pivotNumber = Math.floor(min + (max - min) / 2) 
                let pivot = arr[pivotNumber]
        
                // for each of these later there are do-while loops impemented to we set them out of range
                let i = min - 1
                let j = max + 1
        
                // infinite loop until conditions are met
                while (true) {
                    // while i is refrencing a point lower than the middle of the array iterate up unitl the middle is reached
                    do {
                        i++
                    } 
                    while (arr[i] < pivot)
        
                    // while j is higher than the middle index of the array iterate down towards the middle
                    do {
                        j--
                    } 
                    while (arr[j] > pivot)
        
                    // if the point is reached where both indices are pointing at the middle point then do a switch and put the numbers on the other side of the pivot
                    if (i >= j) {
                    return j
                    }
                    let temp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = temp 
                }
            }
            quicksort(localArray)
            localArray.forEach( (ele, id) => {
                localArray[id] = (
                    <>
                        <h3 className={ele === listClassName ? 'driver_list_text selected_forms_name' : 'driver_list_text'} onClick={(e, theNAme) => handleNameSelection(e, ele)}>
                            {ele}
                        </h3>
                        <br/>
                    </>
                )
            })
            return localArray
        }
        setDriverList(mapTheDrivers())
    }, [data, otherReload, listClassName])

    // handle deactivating
    const handleDeactivation = () => {
        console.log(driverForOffboarding)
        let theDate = new Date()
        // handle submitting document to backend
        if (driverForOffboarding !== null) {
            async function putData(url = '', data = {}) {
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
            
            putData(`https://pythonicbackend.herokuapp.com/drivers/${driverForOffboarding.driver_id}/`, {
                status: 'Offboarded',
                approvedBy: props.user_name,
                approvedDateAndTime: theDate.toDateString()
            }).then( response => {
                console.log(response)
                let myVar = reload
                let myReloadVar = myVar + 1
                setReload(myReloadVar)
            })
        }
    }

    // select name
    const handleNameClick = (e, theName) => {
        makeSearchUnderBar('', 10)
        setNameValue(theName)
    }

    // search bar 
    const makeSearchUnderBar = (theValue, theLength) => {
        if (theValue !== '' && theLength <= 3) {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_forms')
        } else {
            setMakeSearchBarVisible('dashboard_form_divs_name_bar_none')
        }
    }

    // search bar function
    const handleChange = (e) => {
        if (data) {
            setNameValue(e.target.value)
            makeSearchUnderBar(e.target.value, nameValue.length)
            let localArray = []
            data.drivers.forEach( (ele, id) => {
                if (ele.name.includes(e.target.value) && e.target.value !== '' && e.target.value.length < 4) {
                    localArray.push(
                        <h4 className='name_suggestions' id={id} onClick={(e, theName) => handleNameClick(e, `${ele.name}`)} >{ele.name}</h4>
                    )
                }
            })
            setDriverSearchArray(localArray)
        }
    } 

    // handle arrow keys
    const handleArrowKeys = (e) => {
        let mylocalArray = []
        console.log(nameList.getBoundingClientRect().top)
        if (driverSearchArray) {
            let localVar = arrowSelect
            if (e.keyCode === 13) {
                setNameValue(driverSearchArray[localVar].props.children)
                makeSearchUnderBar('', 10)
                setArrowSelect(0)
            }
            if (e.keyCode === 38 ) {
                if (localVar > 0) {
                    driverSearchArray[localVar] = <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${driverSearchArray[localVar].props.children}`)} >{driverSearchArray[localVar].props.children}</h4>
                    let localVarChange = localVar-1
                    setArrowSelect(localVarChange)
                    driverSearchArray[localVarChange] = <h4 className='name_suggestions_arrow_selection_down' onClick={(e, theName) => handleNameClick(e, `${driverSearchArray[localVarChange].props.children}`)} >{driverSearchArray[localVarChange].props.children}</h4>
                }
            }
            for(let i = localVar; localVar - 5 > i > 0; i++) {
                mylocalArray.shift(driverSearchArray[i])
            }
            if (e.keyCode === 40) {
                if (localVar < driverSearchArray.length - 1) {
                    driverSearchArray[localVar] = <h4 className='name_suggestions' onClick={(e, theName) => handleNameClick(e, `${driverSearchArray[localVar].props.children}`)} >{driverSearchArray[localVar].props.children}</h4>
                    let localVarChange = localVar + 1
                    setArrowSelect(localVarChange)
                    driverSearchArray[localVarChange] = <h4 className='name_suggestions_arrow_selection_up' onClick={(e, theName) => handleNameClick(e, `${driverSearchArray[localVarChange].props.children}`)} >{driverSearchArray[localVarChange].props.children}</h4>
                }
                for(let i = localVar; i < driverSearchArray.length - 1; i++) {
                    mylocalArray.push(driverSearchArray[i])
                }
            }
        }
        setShorterList(mylocalArray)
    }

    // handle mapping selected driver to component
    useEffect( () => {
        if (nameValue) {
            data.drivers.forEach( ele => {
                if (ele.name === nameValue) {
                    setSelectedDriver(ele)
                }
            })
        }
    }, [nameValue, data])

    return (
        <div className='home_content' >
            <NavigationBar title='Driver Documents' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='main_content_forms'>
                <div className='left_of_forms'>
                    <div className='top_three_forms_list'>
                        <nav class="menu_smaller">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <button className='compliance_add_driver_button_driver_docs' onClick={handleDeactivation}>
                            <span className='span_in_complaince_button'>Offboard</span> 
                        </button>
                    </div>
                    <div className='driver_list_container_forms'>
                        <br />
                        {driverList}
                    </div>
                </div>
                <div className='right_of_forms'>
                    <div className='forms_divs_name_search' onKeyDown={handleArrowKeys} tabIndex="0">
                        <input className='search_bar_forms' type="text" name='Name' value={nameValue} onChange={handleChange} autoComplete='off'/>
                        <div className={`${makeSearchBarVisible}`} ref={divList => {
                            if (!divList) return;
                            setNameList(divList)
                        }}>
                            {shorterList.length > 0 ? shorterList : driverSearchArray}
                        </div>
                    </div>
                    <FormsDocuments 
                        selectedDriver={selectedDriver}
                    />
                </div>
            </div>
        </div>
    )
}

export default DriverDocuments