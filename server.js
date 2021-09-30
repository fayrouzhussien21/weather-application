// Setup empty JS object to act as endpoint for all routes

let projectData = {}
// Express to run server and routes
const express =require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')//make a middleware that enable the backend to access json data by the req.body
/* Middleware*/ 
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());// create application/json parser
// Cors for cross origin allowance
const Cors =require("cors")
app.use(Cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get('/all', function (req, res) {// Respond with JS object when a GET request is made to the homepage
    res.send(projectData)
  })



// Post Route
  app.post('/add', postdata )
function postdata (req, res){
   console.log(req.body)
   projectData=req.body;
   res.send(projectData)
}

const port=8000;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  })
  
