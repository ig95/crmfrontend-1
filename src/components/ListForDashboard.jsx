import React from 'react'

const ListForDashboard = (props) => {
    console.log(props)
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

    var listOfRoutes

    let localArray = []
    props.todaysRoutes.forEach( ele => {
        ele.datesArray.forEach( element => {
            if (new Date(element.date).toDateString() === new Date().toDateString()) {
                localArray.push(
                    <div className='list_overall_flex_dashboard'>
                        <div className='elements_in_list_dashboard_names'>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{ele.location}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{ele.name}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.route}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.location}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.logIn_time}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.logOut_time}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.timeDifference[0]}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>--</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>--</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.deductions}</h4>
                            </div>
                            <div className='list_spacer_content'>
                                <h4 className='remove_h3_padding'>{element.support}</h4>
                            </div>
                        </div>
                        <button className='modify_button'>
                            <h4>Modify</h4>
                        </button>
                        <button className='modify_button_delete'>
                            <h4>x</h4>
                        </button>
                    </div>
                )
            }
        })
    })
    if (localArray.length === 0) {
        localArray.push(
            <div className='list_overall_flex_dashboard'>
                <h3>
                    Available: 0
                </h3>
            </div>
        )
    }
    listOfRoutes = localArray
    return (
        <>
            {listOfRoutes}
        </>
    )
}

export default ListForDashboard