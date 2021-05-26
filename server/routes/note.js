const express = require('express');

const _ = require('underscore');

const Note = require('../model/note');

const app = express();

//create note

app.get('/note', (req,res) => {
    ssn = req.session;
    if (req.session.user) {
        console.log(req.session.user);
        res.render('note', {id: ssn.user._id });
    } else {
        res.redirect('/signIn');
    }
  });


app.post('/note', function (req, res) {
    let body = req.body;

    let note = new Note({
      title: body.uTitle,
      content: body.uContent,
      author: body.id
    });

    note.save( (err, noteDB) => {

      if (err) {
        res.status(400).json({
            ok: false,
            err
        })
      } else {
          res.redirect('/');
      }
    })    

});

//load favourites

app.get('/favorites', (req,res) => {
    res.render('favorites');
  });



  module.exports=app;