import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const FormsDocuments = (props) => {
    const [  valueForSubmit, setValueForSubmit ] = useState('')
    const [ dateSelected, setDateSelected ] = useState(new Date())
    const [ calendarGate, setCalendarGate] = useState(false)
    const [ nameFromListArray, setNameFromListArray] = useState([])
    const [ nameFromList, setNameFromList] = useState('')
    const [ displayNameArray, setDisplayNameArray ] = useState('names_list_array_container_none')
    const [ countryFromListArray, setCountryFromListArray] = useState([])
    const [ countryFromList, setCountryFromList] = useState()
    const [ displayCountryArray, setDisplayCountryArray] = useState('names_list_array_container_none')
    const [ submitPressed, setSubmitPressed] = useState('Submit')

    // save image to cloudinary
    var uploadImage = (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
        data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY)
        axios.post(process.env.REACT_APP_UPLOAD_IMAGE, data).then(response => {
            let myOtherResponse = ''
            if (response.data.secure_url.includes('.pdf')) {
                let myNewName = response.data.secure_url.replace(/.pdf/, '.png')
                response.data.secure_url = myNewName
            }
            setValueForSubmit(myOtherResponse ? myOtherResponse : response.data.secure_url)
        })
    }

    // handle submitting document to backend
    var handleSubmit = (e) => {
        e.preventDefault()

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
        
        postData(`https://pythonicbackend.herokuapp.com/images/`, {
            imagesLink: valueForSubmit,
            name: nameFromList,
            countryOfIssue: countryFromList ? countryFromList.slice(5) : 'n/a',
            expiryDate: dateSelected,
            driver_id: `https://pythonicbackend.herokuapp.com/drivers/${props.selectedDriver.driver_id}/`
        }).then( response => {
            console.log(response)
            setSubmitted()
            setValueForSubmit('')
            setNameFromList('')
            setCountryFromList('')
        })
    }

    const setSubmitted = () => {
        setSubmitPressed('Added')
        setTimeout( () => {
            setSubmitPressed('Submit')
        }, 2000)
    }

    // make react happy
    const handleChangeCalendar = () => {

    }

    // date selection function
    var theCalendar
    const handleDateSelection = (date) => {
        setDateSelected(date)
        setCalendarGate(false)
    }

    // calendar function
    const handleMakingCalendar = () => {
        console.log('clicked')
        setCalendarGate(true)
    }

    // make the calendar
    if (calendarGate) {
        theCalendar = (
            theCalendar = (
                <div>
                    <Calendar
                        onChange={handleDateSelection}
                        value={dateSelected}
                    />
                </div>
            )
        )
    }

    // handle country selection
    let countryList = 
        ['AF = Afghanistan',
        'AL = Albania',
        'DZ = Algeria',
        'AX = Aland Islands',
        'AS = American Samoa',
        'AI = Anguilla',
        'AD = Andorra',
        'AO = Angola',
        'AN = Antilles - Netherlands',
        'AG = Antigua and Barbuda',
        'AQ = Antarctica',
        'AR = Argentina',
        'AM = Armenia',
        'AU = Australia',
        'AT = Austria',
        'AW = Aruba',
        'AZ = Azerbaijan',
        'BA = Bosnia and Herzegovina',
        'BB = Barbados',
        'BD = Bangladesh',
        'BE = Belgium',
        'BF = Burkina Faso',
        'BG = Bulgaria',
        'BH = Bahrain',
        'BI = Burundi',
        'BJ = Benin',
        'BM = Bermuda',
        'BN = Brunei Darussalam',
        'BO = Bolivia',
        'BR = Brazil',
        'BS = Bahamas',
        'BT = Bhutan',
        'BV = Bouvet Island',
        'BW = Botswana',
        'BV = Belarus',
        'BZ = Belize',
        'KH = Cambodia',
        'CM = Cameroon',
        'CA = Canada',
        'CV = Cape Verde',
        'CF = Central African Republic',
        'TD = Chad',
        'CL = Chile',
        'CN = China',
        'CX = Christmas Island',
        'CC = Cocos (Keeling) Islands',
        'CO = Colombia',
        'CG = Congo',
        "CI = Cote D'Ivoire (Ivory Coast)",
        'CK = Cook Islands',
        'CR = Costa Rica',
        'HR = Croatia (Hrvatska)',
        'CU = Cuba',
        'CY = Cyprus',
        'CZ = Czech Republic',
        'CD = Democratic Republic of the Congo',
        'DJ = Djibouti',
        'DK = Denmark',
        'DM = Dominica',
        'DO = Dominican Republic',
        'EC = Ecuador',
        'EG = Egypt',
        'SV = El Salvador',
        'TP = East Timor',
        'EE = Estonia',
        'GQ = Equatorial Guinea',
        'ER = Eritrea',
        'ET = Ethiopia',
        'FI = Finland',
        'FJ = Fiji',
        'FK = Falkland Islands (Malvinas)',
        'FM = Federated States of Micronesia',
        'FO = Faroe Islands',
        'FR = France',
        'FX = France, Metropolitan',
        'GF = French Guiana',
        'PF = French Polynesia',
        'GA = Gabon',
        'GM = Gambia',
        'DE = Germany',
        'GH = Ghana',
        'GI = Gibraltar',
        'GB = Great Britain (UK)',
        'GD = Grenada',
        'GE = Georgia',
        'GR = Greece',
        'GL = Greenland',
        'GN = Guinea',
        'GP = Guadeloupe',
        'GS = S. Georgia and S. Sandwich Islands',
        'GT = Guatemala',
        'GU = Guam',
        'GW = Guinea-Bissau',
        'GY = Guyana',
        'HK = Hong Kong',
        'HM = Heard Island and McDonald Islands',
        'HN = Honduras',
        'HT = Haiti',
        'HU = Hungary',
        'ID = Indonesia',
        'IE = Ireland',
        'IL = Israel',
        'IN = India',
        'IO = British Indian Ocean Territory',
        'IQ = Iraq',
        'IR = Iran',
        'IT = Italy',
        'JM = Jamaica',
        'JO = Jordan',
        'JP = Japan',
        'KE = Kenya',
        'KG = Kyrgyzstan',
        'KI = Kiribati',
        'KM = Comoros',
        'KN = Saint Kitts and Nevis',
        'KP = Korea (North)',
        'KR = Korea (South)',
        'KW = Kuwait',
        'KY = Cayman Islands',
        'KZ = Kazakhstan',
        'LA = Laos',
        'LB = Lebanon',
        'LC = Saint Lucia',
        'LI = Liechtenstein',
        'LK = Sri Lanka',
        'LR = Liberia',
        'LS = Lesotho',
        'LT = Lithuania',
        'LU = Luxembourg',
        'LV = Latvia',
        'LY = Libya',
        'MK = Macedonia',
        'MO = Macao',
        'MG = Madagascar',
        'MY = Malaysia',
        'ML = Mali',
        'MW = Malawi',
        'MR = Mauritania',
        'MH = Marshall Islands',
        'MQ = Martinique',
        'MU = Mauritius',
        'YT = Mayotte',
        'MT = Malta',
        'MX = Mexico',
        'MA = Morocco',
        'MC = Monaco',
        'MD = Moldova',
        'MN = Mongolia',
        'MM = Myanmar',
        'MP = Northern Mariana Islands',
        'MS = Montserrat',
        'MV = Maldives',
        'MZ = Mozambique',
        'NA = Namibia',
        'NC = New Caledonia',
        'NE = Niger',
        'NF = Norfolk Island',
        'NG = Nigeria',
        'NI = Nicaragua',
        'NL = Netherlands',
        'NO = Norway',
        'NP = Nepal',
        'NR = Nauru',
        'NU = Niue',
        'NZ = New Zealand (Aotearoa)',
        'OM = Oman',
        'PA = Panama',
        'PE = Peru',
        'PG = Papua New Guinea',
        'PH = Philippines',
        'PK = Pakistan',
        'PL = Poland',
        'PM = Saint Pierre and Miquelon',
        'CS = Serbia and Montenegro',
        'PN = Pitcairn',
        'PR = Puerto Rico',
        'PS = Palestinian Territory',
        'PT = Portugal',
        'PW = Palau',
        'PY = Paraguay',
        'QA = Qatar',
        'RE = Reunion',
        'RO = Romania',
        'RU = Russian Federation',
        'RW = Rwanda',
        'SA = Saudi Arabia',
        'WS = Samoa',
        'SH = Saint Helena',
        'VC = Saint Vincent and the Grenadines',
        'SM = San Marino',
        'ST = Sao Tome and Principe',
        'SN = Senegal',
        'SC = Seychelles',
        'SL = Sierra Leone',
        'SG = Singapore',
        'SK = Slovakia',
        'SI = Slovenia',
        'SB = Solomon Islands',
        'SO = Somalia',
        'ZA = South Africa',
        'ES = Spain',
        'SD = Sudan',
        'SR = Suriname',
        'SJ = Svalbard and Jan Mayen',
        'SE = Sweden',
        'CH = Switzerland',
        'SY = Syria',
        'SU = USSR (former)',
        'SZ = Swaziland',
        'TW = Taiwan',
        'TZ = Tanzania',
        'TJ = Tajikistan',
        'TH = Thailand',
        'TL = Timor-Leste',
        'TG = Togo',
        'TK = Tokelau',
        'TO = Tonga',
        'TT = Trinidad and Tobago',
        'TN = Tunisia',
        'TR = Turkey',
        'TM = Turkmenistan',
        'TC = Turks and Caicos Islands',
        'TV = Tuvalu',
        'UA = Ukraine',
        'UG = Uganda',
        'AE = United Arab Emirates',
        'UK = United Kingdom',
        'US = United States',
        'UM = United States Minor Outlying Islands',
        'UY = Uruguay',
        'UZ = Uzbekistan',
        'VU = Vanuatu',
        'VA = Vatican City State',
        'VE = Venezuela',
        'VG = Virgin Islands (British)',
        'VI = Virgin Islands (U.S.)',
        'VN = Viet Nam',
        'WF = Wallis and Futuna',
        'EH = Western Sahara',
        'YE = Yemen',
        'YU = Yugoslavia (former)',
        'ZM = Zambia',
        'ZR = Zaire (former)',
        'ZW = Zimbabwe']

    // handle selecting a country
    const handleCountryClick = (e, country) => {
        setCountryFromList(country)
        setCountryFromListArray([])
        setDisplayCountryArray('names_list_array_container_none')
    }   

    // function for mouse leaving names list
    const mouseLeaveCountry = () => {
        setCountryFromListArray([])
        setDisplayCountryArray('names_list_array_container_none')
    }

    // Mouse enter country names input
    const mouseEnterCountry = () => {
        let localArray = []
        countryList.forEach( (ele, id) => {
            localArray.push(
                <div key={id} className='names_in_names_list_array_forms' onClick={(e, targetName) => handleCountryClick(e, ele)}>
                    <p>{ele}</p>
                </div>    
            )
        })
        setCountryFromListArray(localArray)
        setDisplayCountryArray('names_list_array_container')
    }


    // handle selecting name of document
    const handleNameClick = (e, targetName) => {
        setNameFromList(targetName)
        setNameFromListArray([])
        setDisplayNameArray('names_list_array_container_none')
    }

    // function for making drop down for names list
    const mouseEnterName = () => {
        let localArray = []
        namesListArray.forEach( (ele, id) => {
            localArray.push(
                <div key={id} className='names_in_names_list_array_forms' onClick={(e, targetName) => handleNameClick(e, ele)}>
                    <p>{ele}</p>
                </div>    
            )
        })
        setNameFromListArray(localArray)
        setDisplayNameArray('names_list_array_container')
    }

    // function for mouse leaving names list
    const mouseLeaveName = () => {
        setNameFromListArray([])
        setDisplayNameArray('names_list_array_container_none')
    }

    // list of names for documents
    let namesListArray = [
        'Passport',
        'ID',
        'Visa',
        'Photo',
        'Driving licence Front',
        'Driving licence Back',
        'DVLA Check',
        'BGC',
        'D&A test',
        'Application Package',
        'NIN',
        'UTR',
        'POA'
    ]

    // function for submitting files
    var submitFilesDiv
    if (props.selectedDriver) {
        submitFilesDiv = (
            <div className='submit_files_two_freedom'>
                <form onSubmit={handleSubmit} className='form_on_document_page'>
                    <div className='enter_information_documents'>
                        <h3 className='documents_h3'>Upload Image for {props.selectedDriver.name}</h3>
                            <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className='document_input_forms_top'/>
                            <img src={valueForSubmit ? valueForSubmit : ''} alt="" className='uploaded_image'/>
                            <div className='input_information_documents_tab'>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Name of Document:</h3>
                                        <input type="text" 
                                        name="theName"  
                                        value={nameFromList} 
                                        autoComplete='off' 
                                        className='document_input_forms' 
                                        onMouseEnter={mouseEnterName}
                                        />
                                        <div className={displayNameArray} onMouseLeave={mouseLeaveName}>
                                            {nameFromListArray}
                                        </div>
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Expiry Date:</h3>
                                        <input type="text" name="expiryDate"  className='document_input_forms'value={dateSelected.toDateString()}  onChange={handleChangeCalendar} autoComplete='off' onClick={handleMakingCalendar}/>
                                        {theCalendar}
                                </div>
                                <div className='inner_input_information_documents_tab'>
                                    <h3 className='documents_h3'>Country of Issue:</h3>
                                        <input type="text" name="country" value={countryFromList} className='document_input_forms' autoComplete='off' onMouseEnter={mouseEnterCountry}/>
                                        <div className={displayCountryArray} onMouseLeave={mouseLeaveCountry}>
                                            {countryFromListArray}
                                        </div>
                                </div>
                            </div>
                            <br />
                        <div className="button-container-2" id="formsButtonSubmit">
                            <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                        </div> 
                    </div>
                </form>
            </div>
        )
    }

    return (
        <>
        {submitFilesDiv}
        </>
    )
}

export default FormsDocuments