const express = require('express');
const app = express();
const port = 5080;
const hbs = require('hbs');

const path = require('path');
const hbsPath = path.resolve(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(hbsPath);

// public para todos
app.use( express.static('public'));


//app.use("/assets/css", express.static(bootstrap));
//app.use("/assets/css", express.static(path.join(__dirname, ".js")));

// app.get('*', (req, res) =>{
//   res.sendFile(__dirname + '/public/404.html');
// });

app.get('/', (req,res) => {
  res.render('home');
});

app.get('*', (req, res) =>{
  res.render('404');
});

app.listen(port, () =>{
    console.log('listening on '+ port +' port');
});