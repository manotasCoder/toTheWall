const express = require('express');

const _ = require('underscore');

const Note = require('../model/note');

const {placeUsers} = require('../helper/organiser');

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

// list all notes

app.get('/allNotes', (req, res) =>{
  let data=new Array();
  Note.find({})
  .exec((err, notes) =>{
    if (err) {
      console.log(err);
    } else {
      for (const note of notes) {
        placeUsers(note).then( nick =>
          data.push({
            title: note.title,
            author: nick,
            content: note.content
          })
        );
      }
      console.log(data);
      // console.log(data);
      // res.send(data);
    }
  });
});

//load favourites

app.get('/favorites', (req,res) => {
    res.render('favorites');
  });



  module.exports=app;