// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// const listening = () => {

// }

function listening() {
  console.log("your Server is Running");
  console.log(`your localhost is:${port}`);
}

// Post Data to Server
const putMyData = (request, response) => {
  projectData = request.body;
  response.send(projectData);
  console.log(projectData);
};

app.post("/put", putMyData);

// Get Data from Server
const getMyData = (req, resp) => {
  resp.send(projectData);
};
app.get("/get", getMyData);
