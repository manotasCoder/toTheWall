const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const User = require('../model/user');

const app = express();

   //creating new users

app.get('/signUp', (req,res) => {
    res.render('signUp');
});
  

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

app.get('/signIn', (req,res) => {

  var ssn = req.session;
  if (ssn.user) {
    res.redirect('/');
  } else {
    res.render('signIn');
  }

});

app.post( '/signIn', function (req, res) {

  var ssn = req.session;
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

      if ( !bcrypt.compareSync( body.uPass, user.password ) ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Incorrect user or password'
            }
        });
      
      }

      ssn.user = user;
      res.redirect('/');

    }

  });

});

//logout
app.get( '/signOut', function (req, res) {
  if (req.session.user) {
    req.session.destroy( (err) =>{
      if (err) {
        console.log(err);
      }
    } )
  }
  
  res.redirect('/');

});

module.exports=app;