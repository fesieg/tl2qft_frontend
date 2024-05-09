// Local Imports
import './IncludeSelection.css'
import {requestIncludeLibraries} from '../services/request';

// Package imports
import React, {useState, useEffect} from 'react';


/**
* @component
* IncludeSelection, manages the selection of libraries to be included
* 
* @param {Array} includeLibs state that holds currently selected includes
* @param {Function} setIncludeLibs Function to update includeLibs state
*/
const IncludeSelection = ({includeLibs, setIncludeLibs}) => {

    /** ------------------------STATE VARIABLES-------------------------------- */
    
    /** Array, contains the available libraries obtained form the backend  */
    const [libraries, setLibraries] = useState([])

    /** Array, contains the input selection elements to be rendered  */
    const [selectionHTML, setSelectionHTML] = useState([])

    /** Array, used to always keep track of currently selected libraries
     *  in case includeLibs state updates lag behind  */
    let selectedLibraries = [...includeLibs]

    /** ------------------------LOGIC-------------------------------- */

    /**
     * Updates the includeLibs state array on an onChange event of one of the input checkboxes
     * 
     * @param {string} value currently selected or deselected value from input checkbox */
    const updateIncludes = value => {

        if (!selectedLibraries.includes(value)){        
            /** In case the selected value does not already exist in the local array:
            * add it, then update the includeLibs state */
            selectedLibraries.push(value)
            setIncludeLibs(selectedLibraries)
        } else {
            /** Otherwise, filter the deselected element out and update the state */
            selectedLibraries =  selectedLibraries.filter(lib => lib !== value)
            setIncludeLibs(selectedLibraries)
        }        
    }

    /**
     * Updates the selection HTML elements based on the server response
     * 
     * item names have to be URI-encoded (slashes replaced with %2F) to keep request URL intact
     * 
     * @param {Array} libraries List of available libraries obtained from the backend
     * @return {Array} List of html <li> elements with inputs to select libraries */
    const updateSelectionHTML = (libraries) => {
        let result = []
        libraries.forEach(item => {
            /** Leave out items to be included by default */
            if (item !== "General.qft" && item !== "Utils.qft")
                result.push( 
                /**  for each library name obtained from the server, render a 
                 *   HTML input checkbox element */
                <li key={item} className="includeCheckboxGroup">
                    <label htmlFor ={item}>{item} </label>
                    <input type="checkbox" id={item} name={item} value={item} role="include_checkbox"
                    onChange={() => updateIncludes(item)}/>
                </li>)
        })
        /** Update the state holding the HTML elements so the page rerenders */
        setSelectionHTML(result)
    } 

    /**
     * Specifies that once the page first loads (empty Array as second paramater)
     * the component should request all available libraries from the backend */
    useEffect(() => requestIncludeLibraries().then(res => setLibraries(res.data.message)), [])
    /**
     * Specifies that once the libraries state changes (which means the backend sent a response)
     * the component should update and render the selection checkboxes (call updateSelectionHTML) */
    useEffect(() => updateSelectionHTML(libraries), [libraries])

    return (
        <div className="includeSelectionContainer">
            <h4>(Optional) Wähle einzubindende Bibliotheken:</h4>
            <ul role="include_list">{selectionHTML.map(entry => entry)}</ul>
        </div>
        )
}

export default IncludeSelection;