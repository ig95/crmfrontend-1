import React, { useEffect, useState} from 'react'

const DriversList = (props) => {
    const [ selectedCityDrivers, setSelectedCityDrivers ] = useState([])
    const [ divsToRender, setDivsToRender ] = useState([])

    useEffect( () => {
        let localList = []
        if (props.drivers) {
            props.drivers.forEach( (ele, id) => {
                if (ele.route === props.selectedCity) {
                    localList.push(ele)
                }
            })
            setSelectedCityDrivers(localList)
        }
    }, [props])

    useEffect( () => {
        console.log(selectedCityDrivers)
        let localArray = []
        function makeList () {
            selectedCityDrivers.forEach( (ele, id) => {
                localArray.push(<div key={id}>{ele.name}</div>)
            })
        }   
        makeList()
        setDivsToRender(localArray)
    }, [selectedCityDrivers])

    return (
        <>
            {divsToRender}
        </>
    )
}

export default DriversList