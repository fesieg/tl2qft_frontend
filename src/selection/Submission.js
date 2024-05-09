// Local imports
import './Submission.css'
import {requestTestcaseCreation} from '../services/request';
import Info from './Info'


// Package imports
import React, {useState, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/**
 * @component
 * Handles everything connected to submitting and checking the input
 * displays Info to the user depending on situation
 * 
 */
const Submission = ({selectedTestcaseID, selectedTestcaseVersion, includeLibs, versionFallback}) => {

    /** ------------------------STATE VARIABLES-------------------------------- */

    /** Boolean, denotes whether we are currently waiting on a response from the backend */
    const [waiting, setWaiting] = useState(false)    

    /** String, is displayed once the user submits input (for warning or info purposes)*/
    const [message, setMessage] = useState("")

    /** String, changes message display (warningMessage, confirmationMessage, infoMessage)*/
    const [messageType, setMessageType] = useState("infoMessage")

    /** ------------------------LOGIC---------------------------------------- */

    /**
    * function that (re)renders the Info component
    * @returns Info component as HTML
    */
    const renderInfo = () => {
        return <Info message={message} messageType={messageType}/>
    }

    /**
    * validates the version input given by the user
    * checks if version is an integer between 1 and 100
    * @returns {Boolean}
    */
    function isNumericInt(str) {
        /** Only test strings that do not contain a dot or a comma */
        if (typeof str != "string" || str.includes(".") || str.includes(",")) return false

        /** Additionally, test if string can be represented as Number AND as Integer
         *  We have to make an additional NaN check on parseInt because whitespace strings pass
         */
        return !isNaN(str) && 
               !isNaN(parseInt(str))
    }

    /**
    * validates the entire input given by the user
    * calls isNumericInt to check version
    * checks testcase id for right format (see regex)
    * returns message to user specifying where problem is (can be one or both inputs)
    * @returns {Object} {"inputValid": boolean, "displayMessage": String}
    */
    const checkInput = versionFallback => {
        /** Initialize variables for return object */
        let inputValid = true
        let displayMessage = ""

        /** In case user selected no version or wants latest version, skip validation */
        if (!versionFallback){
            /** Test whether Version is an Integer between 1 and 100 */
            if (!isNumericInt(selectedTestcaseVersion)){
                inputValid = false
                displayMessage += "Eingegebene Testfall-Version ist keine (ganze) Zahl! "
            } else if (selectedTestcaseVersion > 100 || selectedTestcaseVersion < 1){
                inputValid = false
                displayMessage += "Version muss eine Zahl zwischen 1 und 100 sein."
            }
        }

        /** Regex test for expected Testcase-ID format (always validate this)*/
        let regex = /[a-z]{0,5}[-][0-9]{0,8}\w+/
        if (!(regex.test(selectedTestcaseID))){
            inputValid = false
            displayMessage += "Eingegebene Testfall-ID ist ungueltig! "
        }

        return {"inputValid": inputValid, "displayMessage": displayMessage }
    }
    
    /**
    * handles press of Submit button
    * validates Input and if succesfully validated, requests a testcase from the backend
    * once a testcase response reaches arrives, prompt a download for the user
    */
    const handleSubmit = () => {

         /** Attempt to validate Input, warn user if unsuccessful and exit */
        let validation = checkInput(versionFallback)
        if (!validation["inputValid"]){
            setMessage(validation["displayMessage"])
            setMessageType("warningMessage")
            setWaiting(false)
            return
        }

        /** In case user selected no Version or wants latest version, use fallback (0) */
        let requestVersion = versionFallback ? 0 : selectedTestcaseVersion

        /** in case the input is valid, send a request to the backend for the selected parameters */
        const response = requestTestcaseCreation(selectedTestcaseID, requestVersion, includeLibs)
        response.then(res => {
            /** To be able to do this client-side and for easier usability (instant download prompt)
             *  we save the response and trigger a download by manipulating the DOM */

            /** cast response data (file) to blob and save it to an HTML link element */
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url

            /** Set the name of the downloaded file */
            link.setAttribute('download', res.headers.name)

            /** Simulate a click on the link to trigger the download */
            link.click();

            /** Clean up reference to the file (blob) */
            window.URL.revokeObjectURL(url)

            /** Inform user of success */
            setWaiting(false)
            setMessage("Testfall erstellt!")
            setMessageType("confirmationMessage")

        }).catch(function (error){
             /** In case the backend sends an error response
             *   inform the user on the encountered problem */
            if (error.response){
                console.error(error.response.data["message"])
                setMessage(error.response.data["message"])
                setMessageType("warningMessage")
                setWaiting(false)
            }
        }) 
    }

    /**
    * Specifies that once the message or messageType changes, the Info component should rerender
    */
    useEffect(renderInfo, [messageType, message])

    return (
        <div>
            <div>
              {message !== "" ? renderInfo() : <p></p>}
            </div>
            {waiting 
                ? <Loader type="Triangle" color="#000000"/> 
                : <button role="SubmitButton" onClick={() => {
                    setWaiting(true)
                    handleSubmit()}}>
             Testfall erstellen</button>}
        </div>
        )
}

export default Submission