require('./env');
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session');

app.use( session({secret:process.env.SECRET, saveUninitialized: true, resave:true}) );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const { dbConnection } = require('./database/config');


dbConnection().then( ()=>{
  console.log('dbOnline');
}).catch( () =>{
  console.log("Database not connecting, check the admin of the APP");
});

const hbsPath = path.resolve(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(hbsPath);

// public for everybody
app.use( express.static('public'));

//routes
app.use(require('./routes/index'));


app.listen(process.env.PORT, () =>{
    console.log('listening on '+ process.env.PORT +' port');
});