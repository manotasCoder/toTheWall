const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.render('home');
  });

app.use( require('./user') );
app.use( require('./note') );

app.get('*', (req, res) =>{
    res.render('404');
});

module.exports=app;