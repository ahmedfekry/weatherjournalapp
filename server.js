projectData = {};
// require express
const express = require('express');

//require cors
const cors = require('cors');

//require body-parser
const bodyParser = require('body-parser');

// initialize express app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('website'));
const port = '5500';
const server = app.listen(port, ()=> {
    console.log(`I am listening to post number ${port} `);
});


app.post('/addWeather',function(request,response){
    projectData = {...projectData, ...request.body}
    return response.send(projectData);
});


app.get('/getWeather', (request, response) => {
    response.send(projectData);
})
  
