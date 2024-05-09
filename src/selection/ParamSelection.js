// Local Imports
import './ParamSelection.css'

// Packag Imports
import React, {useState, useEffect} from 'react'

    /**
     * @component
     * Provides selection Inputs for testcase ID and version
     *  
     * @param {Function} setSelectedTestCaseID Function to update App state
     * @param {Function} setSelectedTestcaseVersion Function to update App state
     * @param [setVersionFallback] setVersionFallback Function to update versionFallback state
     */
const ParamSelection = ({setSelectedTestCaseID, setSelectedTestcaseVersion, versionFallback, setVersionFallback}) => {

    /** ------------------------STATE VARIABLES-------------------------------- */
    /** String, contains the current input for the Testcase ID field */
    const [currentTestcaseIDValue, setCurrentTestcaseIDValue] = useState("")

    /** Number, contains the current input for the Testcase Version field */
    const [currentTestcaseVersionValue, setCurrentTestcaseVersionValue] = useState()

    const [currentCheckboxValue, setCurrentCheckboxValue] = useState(true)

    /** Function that provides the HTML for the version input dynamically and updates on state change */
    const renderDynamicVersionInputElements = () => {
        return (    
            <>
                <div className="paramSelection">

                    <label htmlFor ="version_input" role="label_version"> <h4> Testfall-Version</h4><details>Als Ganze Zahl angeben (1-100)</details> </label>
                    <input disabled={currentCheckboxValue} type="number" id="version_input" name="version_input" min="1" max="100" role="version_input" 
                    value={currentTestcaseVersionValue} onChange={e => {
                            setCurrentTestcaseVersionValue(e.target.value)
                            setSelectedTestcaseVersion(e.target.value)
                        }}/>
                        
                    <label htmlFor ="version_input" role="label_version"> <h4> Aktuellste Version nutzen</h4>
                    <input checked={currentCheckboxValue} type="checkbox" id="versionfallback_input" name="versionfallback_input" role="versionfallback_input" 
                        onChange={e => {
                            setCurrentCheckboxValue(e.target.checked)
                            setVersionFallback(currentCheckboxValue)
                        }}/></label>
                
                </div>
        </>)
    }

    /** rerenders the version input box when checkbox value changes and once at the start */
    useEffect(() => {
        renderDynamicVersionInputElements()
        setVersionFallback(currentCheckboxValue)
    }, [currentCheckboxValue])

    
    return ( 
        <div className="paramSelectionContainer">
            <h6 className="infoMessage">Wähle die Testfall-ID und -version:</h6>
            <div className="paramSelection">
                    <label htmlFor ="id_input" role="label_id"><h4>Testfall-ID</h4> <details>Format: Projektpräfix MINUS ID (z.B. jx-1640 oder at-1)</details></label>
                    <input id="id_input" name="id_input" placeholder="jx-1640" role="id_input" 
                    value={currentTestcaseIDValue} onChange={e => {
                        setCurrentTestcaseIDValue(e.target.value)
                        setSelectedTestCaseID(e.target.value)
                    }}/>
                </div>
            {renderDynamicVersionInputElements()}
    </div>
    )
}

export default ParamSelection;