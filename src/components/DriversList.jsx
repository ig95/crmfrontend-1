/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'

const DriversList = (props) => {
    var CryptoJS = require("crypto-js");
    const [ selectedCityDrivers, setSelectedCityDrivers ] = useState([])
    const [ divsToRender, setDivsToRender ] = useState([])

    useEffect( () => {
        let localList = []
        if (props.drivers) {
            if (props.selectedCity === 'Drivers') {
                props.drivers.forEach( (ele) => {
                    localList.push(ele)
                })
                setSelectedCityDrivers(localList)
            } else {
                props.drivers.forEach( (ele) => {
                    if (ele.route === props.selectedCity) {
                        localList.push(ele)
                    }
                })
                setSelectedCityDrivers(localList)
            }
        }
    }, [props])

    useEffect( () => {
        var makeList
        let localArray = []
        if (props.searchContentPass) {
            makeList = function () {
                selectedCityDrivers.forEach( (ele, id) => {
                    if (ele.name.includes(props.searchContentPass)) {
                        localArray.push(<div key={id} className='depot_list' name={ele.name}>{ele.name}</div>)
                    }
                })
            }   
            makeList()
            setDivsToRender(localArray)
        } else {
            makeList = function () {
                selectedCityDrivers.forEach( (ele, id) => {
                    localArray.push(<div key={id} className='depot_list' value={ele.name}>{ele.name}</div>)
                })
            }   
            makeList()
            setDivsToRender(localArray)
        }
    }, [selectedCityDrivers, props.searchContentPass])

    return (
        <>
            {divsToRender}
        </>
    )
}

export default DriversList