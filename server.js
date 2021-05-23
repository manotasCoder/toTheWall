const express = require('express');
const app = express();
const port = 5080;

app.get('/', (req, res) => {
  res.send('Welcome Doc');
})

app.listen(port, () =>{
    console.log('listening on '+ port +' port');
});