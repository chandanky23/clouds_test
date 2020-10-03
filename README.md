# TEST

## Frontend

The app is built using React and Typescript along with Styled-Components for styling.

## Backend

The app is built using Flask for Python 3 and serves as a middleware in between Aiven's Cloud api and React frontend.

## API's

> `/` Serves the index.html page
> `/api/v1/clouds` Serves the application and controls data flow to frontend as per query params.
  * `provider=<provider_name>` here the provider name is a short name, i.e, for example **aws** for *Amazon Web Services*
  * `provider=<provider_name>&region=<region_name>` to get all the regions of the specific provider.
  * `provider=<provider>&region=<provider_region>&lng=<user_longitude>&lat=<user_latitude>&direction=<nearest_first or farhest_first>` get the clouds data as per lat lon and direction
 

## Get the app

to get the app using:
* https: `git clone https://github.com/chandanky23/clouds_test.git`
* ssh: `git clone git@github.com:chandanky23/clouds_test.git`

## Run the app

once the application is downloaded:
* `cd clouds_test` or project name provided during clonning the project.
* run `npm run prod` to run the application
* run `npm run test` to run backend test cases.

## Application

When `npm run prod` is ran:
* It installs all the frontend dependencies
* Builds the frontend and creates a build directory.
* Goes to backed server folder and creates a python virtual environment
* Installs all the backend dependencies from requirements.txt file.
* Runs the backend server and uses the frontend build from build directory and serves the application.

Once the script finishes it serves the app at http://127.0.0.1:5000/

## Test

Backend test are implemented using Flask inbuilt unittest library and there are all total *6 test cases* covering the entire funtionality.
For Frontend there is a setup for unit test using React testing library and jest-dom but no test as couldn't manage time.

When `npm run test` is ran:
* It goes to backed server folder and creates a python virtual environment.
* Installs all the backend dependencies from requirements.txt file.
* Runs the backend server.
* Runs the test-server script to run all the unit test cases.

*prerequisites*: backend server is required for the test cases to run.
