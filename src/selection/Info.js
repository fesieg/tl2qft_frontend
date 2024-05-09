import './Info.css'

import React from 'react'

/**
* @component
* Info, manages info displayed to the user (confirmations, warnings, etc)
* 
* @param {string} message message to be displayed
* @param {string} messageType denotes how to displayed the message (warning: red, info: black, confirmation: green)
*/
const Info = ({message, messageType}) => {
    return(
        <div>
            <p className={messageType}>
                {message}
            </p>
        </div>
    )
}

export default Info