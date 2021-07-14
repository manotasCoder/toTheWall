const express = require('express');

const _ = require('underscore');

const Note = require('../model/note');

const {placeUsers, addFavUser} = require('../helper/organiser');

const app = express();

//create note

app.get('/note', (req,res) => {
    ssn = req.session;
    if (req.session.user) {
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

    let replacement=new Array();
    Note.find({})
    .exec( async (err, notes) =>{
      if (err) {
        console.log(err);
      } else {

        if ( notes.length == 0 ) {
          res.send({
            id: 'none',
            title: 'Be the first one to wall it',
            author: 'Doc',
            content: 'You just need to create a user and touch the plus icon at the bottom'
          });
    
        } 

        else { 

        let nick;
          for (const note of notes) {
            
            await placeUsers(note.author)
            .then(name=>{
            nick = name;  
            }).catch( (err) =>{
            console.log('failure in the system');  
            });
            
            replacement.unshift({
              id: note._id,
              title: note.title,
              author: nick,
              content: note.content
            });

          }

        res.send(replacement);
        }
      }
    });
  
});

//load favourites

// list all favourites notes

app.get('/favs', (req, res) =>{
  let ssn = res.req.session;
  if (ssn.user) {
    res.render('favorites');
  } else {
  res.redirect('/');
  }
});

app.get('/favorites', (req, res) =>{

  let ssn = req.session;
  if (ssn.user) {

  let noteIds = ssn.user.favs;
    if ( noteIds.length == 0 ) {
      res.send({
        id: 'none',
        title: 'You have no favs so far',
        author: 'Doc',
        content: 'To get some favs, go to the home and start addind them'
      });

    } else { 
      let replacement=new Array();
      Note.find({_id : noteIds })
      .exec( async (err, notes) =>{
        if (err) {
          console.log(err);
        } else {
          let nick;
          for (const note of notes) {
            
            await placeUsers(note.author)
            .then(name=>{
            nick = name;  
            }).catch( (err) =>{
            console.log('failure in the system');  
            });
            
            replacement.unshift({
              id: note._id,
              title: note.title,
              author: nick,
              content: note.content
            });

          }
          res.send(replacement);
      }
      });
    }

  }

});

app.post('/addFav', async (req,res) => {
  let body = req.body;
  let ssn= req.session;
  if (ssn.user) {
    let userId = ssn.user._id;
    let fav = body.fav;
    await addFavUser(userId, fav)
    .then(user => {
      req.session.user = user; 
      req.session.save();
    })
    .catch( (err) =>{
      console.log('failure in the system');  
      });
  }


});



  module.exports=app;