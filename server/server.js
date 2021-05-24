const express = require('express');
const app = express();
const port = 5080;
let bootstrap = __dirname + '/assets/';
console.log(bootstrap);

// public para todos
app.use( express.static('public'));


//app.use("/assets/css", express.static(bootstrap));
//app.use("/assets/css", express.static(path.join(__dirname, ".js")));

app.get('/', (req, res) => {
  res.send('Welcome Doc');
})

app.get('*', (req, res) =>{
  res.send('404 | Page not found');
});

app.listen(port, () =>{
    console.log('listening on '+ port +' port');
});