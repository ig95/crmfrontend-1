/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import VansDocument from './VansDocument'
import folderPic from '../images/folder.png'
import DocumentVans from './DocumentVans'

const VansComponent = (props) => {
    var CryptoJS = require("crypto-js");
    const [ vanList, setVanList ] = useState([])
    const [ content, setContent ] = useState(null)

    // handle mapping owned vans
    useEffect( () => {
        setContent(null)
        let localArray = []
        if (props.data) {
            props.data.forEach( (van, vanID) => {
                if (van.companyOwned === props.owned) {
                    localArray.push(
                        <div className='spacer_div_vans_list'>
                            <div className='h3_for_compliance_Page' onClick={(e, theVan) => handleVanSelection(e, van)}>
                                {van.registration}-{van.make} {van.model} {van.year}
                                <img src={folderPic} alt="Folder" className='image_in_documents_folder'/>
                            </div>
                        </div>
                    )
                }
            })
        }
        setVanList(localArray)
        if (props.selectedVan) {
            setContent (
                <DocumentVans 
                    selectedVan={props.selectedVan}
                    vanDocs={props.vanDocs}
                    reRender={props.reRender}
                    content={props.content}
                />
            )
        }
    }, [props.data, props.owned, props.vanDocs])

    // function for rendering van selection
    const handleVanSelection = (e, theVan) => { 
        setContent (
            <DocumentVans 
                selectedVan={theVan}
                vanDocs={props.vanDocs}
                reRender={props.reRender}
                content={props.content}
            />
        )
    }
            
    // button for making new van
    const handleAddVan = (e, theVan) => {
        setContent(
            <VansDocument 
                owned={props.owned}
                reRender={props.reRender}
                content={props.content}
            />
        )
    }

    return (
        <div className={props.viewMe}>     
            <div className='inner_vans_component_div_left'>
                <button className='compliance_add_driver_button_submit' id='add_van_button' onClick={handleAddVan}>
                    <span className='span_in_complaince_button'>Add Van</span> 
                </button>
                <div className='van_list_van_component'>
                    {vanList}
                </div>
            </div>  
            <div className='inner_vans_component_div_right'>
                {content}
            </div>    
        </div>
    )
}

export default VansComponent