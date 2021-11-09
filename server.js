// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

// port to run the server

const port = 8000;

// function to test the server

const listen = () =>
  console.log(`server is running on http://localhost:${port}`);

app.listen(port, listen);

// callback Function to complete GEt '/all'

const getAll = (req, res) => res.status(200).send(projectData);

// Get route

app.get("/all", getAll);

// CallBack function to complete POST '/add'

const postData = (req, res) => {
  projectData = req.body;
};
// Post route

app.post("/add", postData);
