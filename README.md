# weather web app
## news.com Coding exercise

# Application Details
## Assumptions made
- The pay period date range passed is only for display purpose and other that its format `Start Date - End Date` nothing else is verified.
- The pay period date range is not being parsed for actual date values to calculate the payslips. Even if a different month is mentioned in the pay period `01 March - 31 August` the payslip is being calculated for one month only.
- One of the reasons why the pay period date range is not parsed is the calculation of the business days available / business days worked logic which requires more clarifications.

# Development Environment
### Setup
Before beginning work, a developer must set up the development environment on their machine including the necessary tools and frameworks to support the development process. The environment requirements are noted below:
* [Node.js](http://nodejs.org/download/) - the application platform - download and run the Windows Installer (if using a different OS, download the appropriate installer).  This will install the Node.js JavaScript platform and engine as well as the Node Package Manager (npm).
* [Git](http://git-scm.com/downloads) - distributed version control system (DVCS) - download and install the Git client for Windows (if using a different OS, download the appropriate installer).
* [GitHub](https://github.com/) - This solution uses GitHub to manage the source code.  GitHub is a hosted SCM solution and it requires an authenticated account.  You may use your own personal GitHub account.

### Application Dependencies
* [Node.js](http://nodejs.org/) - application platform built on Chrome's JavaScript runtime

### Development Dependencies
* [Mocha](http://visionmedia.github.io/mocha/) - test framework
* [Chai](http://chaijs.com/) - TDD/BDD assertion library

### Running Tests
If the development dependencies have not been installed the first step should be to run `npm install` to set up the environment. From the developer's environment the entire test suite can be run by executing `npm test` from the project root folder.  Running the tests in this manner will execute the script that is defined in the `package.json` file.

### Running the Payroll Calculator
The Calculator can be run in the following 2 ways:
  
  1. Launch the Calculator Console to enter commands - `node app`
  2. Pass Commands from a file to the Calculator console  - `node app -file sample-data.csv`


## License

Copyright © 2016 Sambaran Roy
