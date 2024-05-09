// Local imports
import App from './App';
import IncludeSelection from './selection/IncludeSelection';
import ParamSelection from './selection/ParamSelection';
import Info from './selection/Info';
import Submission from './selection/Submission';

// Package imports
import { fireEvent, getByRole, render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

//---------------App Tests---------------

test('Header is rendered correctly', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Testlink-to-QFT-Converter/i);
  expect(linkElement).toBeInTheDocument();
});

//---------------ParamSelection Tests---------------

test('ParamSelection is rendered correctly' , () => {
  render(<ParamSelection/>)
  const testcaseIDInputElement = screen.getByRole('id_input')
  const testcaseVersionInputElement = screen.getByRole('version_input')

  expect(testcaseIDInputElement).toBeInTheDocument();
  expect(testcaseVersionInputElement).toBeInTheDocument();
})

test('ParamSelection ID input element is interactive and working', () => {
  const setSelectedTestCaseID = jest.fn((value) => {})
  const setSelectedTestcaseVersion = jest.fn((value) => {})
  
  render(<ParamSelection  
    setSelectedTestCaseID={setSelectedTestCaseID}
    setSelectedTestcaseVersion={setSelectedTestcaseVersion}/>)

  const testcaseIDInputElement = screen.getByRole('id_input')

  fireEvent.change(testcaseIDInputElement, { target: {value: "jx-1640"} });
  expect(testcaseIDInputElement).toHaveValue("jx-1640");
})

test('ParamSelection Version input element is interactive and working', () => {
  const setSelectedTestCaseID = jest.fn((value) => {})
  const setSelectedTestcaseVersion = jest.fn((value) => {})
  
  render(<ParamSelection  
    setSelectedTestCaseID={setSelectedTestCaseID}
    setSelectedTestcaseVersion={setSelectedTestcaseVersion}/>)

  const testcaseVersionInputElement = screen.getByRole('version_input')

  fireEvent.change(testcaseVersionInputElement, { target: {value: 2} });
  expect(testcaseVersionInputElement).toHaveValue(2);

})

//---------------IncludeSelection Tests---------------

test('IncludeSelection is rendered correctly' , () => {
  let includeLibs = ['a', 'b']
  render(<IncludeSelection includeLibs = {includeLibs}/>)
  const libraryListElement = screen.getByRole('include_list')
  expect(libraryListElement).toBeInTheDocument();
})

//---------------Submission Tests---------------


test('Submission Element rendered correctly' , () => {
  let selectedTestcaseID = "jx-1640"
  let selectedTestcaseVersion = 2
  let includeLibs = ['a', 'b']

  render(<Submission 
    selectedTestcaseID={selectedTestcaseID}
    selectedTestcaseVersion={selectedTestcaseVersion}
    includeLibs={includeLibs}/>)

  const submitButton = screen.getByRole('SubmitButton')

  expect(submitButton).toBeInTheDocument();
})


test('Submission Element responds to incorrect input' , () => {
  let selectedTestcaseID = "jx1640"
  let selectedTestcaseVersion = "1"
  let includeLibs = ['a', 'b']

  render(<Submission 
    selectedTestcaseID={selectedTestcaseID}
    selectedTestcaseVersion={selectedTestcaseVersion}
    includeLibs={includeLibs}/>)

  const submitButton = screen.getByRole('SubmitButton')
  fireEvent.click(submitButton)
  const infoElement = screen.getByText("Eingegebene Testfall-ID ist ungueltig!")
  expect(infoElement).toBeInTheDocument();
})

