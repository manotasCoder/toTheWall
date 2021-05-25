const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const User = require('../model/user');

const app = express();
var session = require('express-session')

   //creating new users
app.post('/user', function (req, res) {
  
      let body = req.body;

      let user = new User({
        name: body.uName,
        nick: body.uNick,
        password: bcrypt.hashSync(body.uPass, 10)
      });

      user.save( (err, userDB) => {

        if (err) {
          res.status(400).json({
              ok: false,
              err
          })
        } else {
            res.redirect('/signIn');
        }
      })    
  
});

//login
app.post( '/SignIn', function (req, res) {

  let body = req.body;

  User.findOne( {nick: body.uNick}, (err, user) => {

    if (err) {
      res.status(500).json({
        ok: false,
        err
      })
    } else {
      if (!user) {

        return res.status(400).json({
          ok: false,
          err: {
              message: 'Incorrect user or password'
          }
        });
      }

      if ( !bcrypt.compareSync( body.uPassword, user.password ) ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Incorrect user or password'
            }
        });
      
      }

      res.redirect('/');

    }

  });

});



//logout
app.post( '/signOut', function (req, res) {

});


    module.exports=app;