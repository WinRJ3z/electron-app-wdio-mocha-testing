# electron-app-wdio-mocha-testing
 Focusing on converting MOV files to MP4 format. The tests are implemented using WebdriverIO for browser automation and Mocha as the testing framework. This setup ensures robust testing of the application's conversion logic and user interface interactions, providing confidence in its functionality across different environments.
Testing Framework:
WDIO and Mocha

## Overview

This repository contains automated tests for an Electron application developed by mblink, focusing on converting MOV video files to MP4 format. The tests are implemented using WebdriverIO for browser automation and Mocha as the test framework. This setup ensures robust testing of the application's conversion logic and user interface interactions.

## Features
Test Structure
The tests are organized using Mocha's describe-it syntax within WebdriverIO's test runner. Here's a breakdown of the main test scenarios:

- Display Main Elements:

Checks visibility of key UI components (#select-input, #select-output, #convert).

- Open File Dialogs:

Verifies that clicking on input and output file buttons triggers the file dialogs.

- Conversion Process:

Tests the entire conversion workflow, including disabling the convert button, displaying progress, and verifying successful completion.

- Test Environment Configuration
Ensure your wdio.conf.js is correctly configured for your Electron application. Adjust capabilities, test specs, and reporters as needed for your project setup.

## Unit Testing Without WDIO using mocha and jest

- Utility Functions: Tests ensure that the utility functions (timeStrToSec and fitToMaxDimensions) behave correctly under various input scenarios.

- File Selection: Tests verify the interaction between UI elements and the Electron framework's dialog API for selecting files.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- WebdriverIO (`@wdio/cli`) and Mocha (`mocha`) installed globally or locally
- Dependencies for the Electron application installed (`npm install`)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
npm install
```
To run WDIO tests Use the command
```bash
npm run wdio
```
To run the unit tests use the command 
```bash
npm test
```
