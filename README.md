# weather web app
## news.com Coding exercise

Using your knowlegde of node.js, client side frameworks and using the http://forecast.io API create an application which when accessed via a url can be used to retrieve a weather forecast.

The application should be built with node's HTTP libraries — you may use an abstraction like express. If you scaffold your application using a generator, please document it as such.

You're free to elaborate on the front-end code as much as you like, but we'll be primarily evaluating the back-end aspects.

## How will my submission be reviewed?
 
Your application will be evaluted against the following criteria

| Criteria             | Overview                                                         | 
| -------------------- |:----------------------------------------------------------------:| 
| **Test Coverage**    | How well tested is your code, (**We will run your test suite**)  |
| **Code Quality**     | Code is well structured, readable and documented. Source is tidy |
| **Configurability**  | Can aspects of your application be configured                    |
| **Modularity**       | Can parts of your application be reused                          |
| **Durability**       | How resilient is your application to known and unexpected errors |

See [RUBRICK](./RUBRICK.md) for more detail

## Scenarios

The items below should be considered to be applicable to all scenarios.

- **Support both basic HTML and JSON responses**
- **Unit & Functional test suites**
 
### Scenario One: Display a weather forecast by location
 
A weather forcast should be displayed based upon the location specified in the url.
A location might be a state or territory, municipal locality, or city name.
For the purposes of the test it will be alphanumeric.
 
- Expected URL: http://localhost:<port>/weather/:location
- Example  URL: http://localhost:<port>/weather/( sydney | brisbane )
 
### Scenario Two: Display a weather forecast by location filtered by day
 
A weather forcast should be displayed based upon the location and day specified in the url.
The application is not expected to be timezone aware. The weekday is always in the future
(for example—if the current day is Wednesday and the requested time is Tuesday, the weather
returned should be for *next* Tuesday. If the requested day is the same as the current day,
the weather returned should be for one week from the current day.)
 
- **Expected URL:** http://localhost:\<port\>/weather/:location/:weekday
- **Example  URL:** http://localhost:3000/weather/vladivostok/tuesday
 
### Scenario Three: Display a weather forecast for today
 
A weather forcast should be displayed based upon the location and the current day.
 
- **Expected URL:** http://localhost:\<port\>/weather/:location/today
- **Example  URL:** http://localhost:\<port\>/weather/sydney/today
 
#### Supporting Material:
 
- API: https://developer.forecast.io/


# Application Details

## Assumptions made
- If you are planning to clone and run the repository from your local enviroument you will need to update the config file with your API keys for Google Maps and Weather.IO


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

### Running the Weather web app
The weather web application can be run in the following way:
  
  1. To launch the web application run npm start from the terminal and navigate to http://localhost:3000


## License

Copyright © 2016 Sambaran Roy
