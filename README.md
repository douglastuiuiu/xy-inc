Running

NOTE: This aplication was make in NodeJs, so for test you must have NodeJs installed in your enviroment.


Steps to run application:

1- Inside the root folder, open a terminal and execute this command 'npm install && node app.js';

2 - With a client http, like Postman or Restclient, choice and send the requisitions to test the API.
- Creating poi:
     - URL: http://localhost:8080/api/poi
     - Method: POST
     - Body example: {
                      "name": "Lanchonete",
                      "x": 27,
                      "y": 12
                     }

- Listing pois:
     - URL: http://localhost:8080/api/poi
     - Method: GET

- Quering pois:
     - URL: http://localhost:8080/api/poi/query
     - Method: POST
     - Body example: {
                      "x": 20,
                      "y": 10,
                      "range": 10,
                     }

PS.: If you choise the Postman, into the test folder, has a collection saved. That you can import.
