// Local imports
import './App.css';
import IncludeSelection from './selection/IncludeSelection';
import ParamSelection from './selection/ParamSelection';
import Submission from './selection/Submission'

// Package imports
import React, {useEffect, useState} from 'react';

/**
 * @component
 * App, central container that holds the relevant state variables
 * and contains the other selection components
 * 
 */
const App = () => {

    /** ------------------------STATE VARIABLES-------------------------------- */

    /** String, contains the currently selected testcase ID  */
    const [selectedTestcaseID, setSelectedTestCaseID] = useState("")  

    /** Number, contains the currently selected testcase version */
    const [selectedTestcaseVersion, setSelectedTestcaseVersion] = useState(1)

    /** Array, contains the selected QFT libraries to include */
    const [includeLibs, setIncludeLibs] = useState(["qfs.qft", "General.qft", "Utils.qft"])

    /** Boolean, specifies whether the user wants to simply use the latest version (then set to true) */
    const [versionFallback, setVersionFallback] = useState(true)

    return (
      <div className="app">

        <header>
          <h3>Testlink-to-QFT-Converter</h3>
        </header>

        <main>
          <div className="left">
            <ParamSelection 
              setSelectedTestCaseID={setSelectedTestCaseID}
              setSelectedTestcaseVersion={setSelectedTestcaseVersion}
              versionFallback={versionFallback}
              setVersionFallback={setVersionFallback}/>
            <div>
            <Submission 
              selectedTestcaseID={selectedTestcaseID}
              selectedTestcaseVersion={selectedTestcaseVersion}
              includeLibs={includeLibs}
              versionFallback={versionFallback}/>
            </div>
          </div>

          <div>
            <IncludeSelection
              includeLibs={includeLibs}
              setIncludeLibs={setIncludeLibs}/>
          </div>

        </main>
      </div>
    );
}

export default App;
