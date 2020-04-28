import React, { useState, useEffect} from 'react'
import NavigationBar from '../components/NavBar'
import DivWeek from '../components/DivWeek'
import Dropdown from 'react-dropdown';
import DropdownThree from 'react-dropdown';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';


const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedSunday, setSelectedSunday ] = useState('14')
    const [ mathSunday, setMathSunday ] = useState('14')

    // grab the data
    useEffect(() => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedDate(myDate)
        setSelectedSunday(myDate.toDateString())
        setMathSunday(myDate)
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

        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
            console.log(response.results)
        })
    }, [])

    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCity(e.value)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 50; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                sundays.push(dateInner.toDateString())
            }
        }
        return sundays
    }

    // dropdown menu options
    const optionsThree = getSundays()

    // dropdown menu selection function
    const onSelectThree = (e) => {
        setSelectedDate(e.value)
    }

    return (
        <div className='home_content'>
            <NavigationBar title='Home'/>
            <div className='main_content'>
                <div className='home_selectors'>
                    <Dropdown 
                        options={options}
                        onChange={onSelect} 
                        value={selectedCity} 
                        className='drop_down_bar'
                    />
                    <DropdownThree
                        options={optionsThree}
                        onChange={onSelectThree} 
                        value={selectedSunday} 
                        className='drop_down_bar'
                    />
                </div>
                <div className='scheduling_four_week_overlay'>
                    <DivWeek 
                        currentDate={selectedDate}
                        scheduleDates={schedule}
                        selectedLocation={selectedCity ? selectedCity : 'DBS2'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home