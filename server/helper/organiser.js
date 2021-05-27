const User = require('../model/user');

// find users for notes

// let placeUsers = async (note) => {
//      User.findOne({_id: note.author})
//       .exec((err, user) =>{
//         if (err) {
//           console.log(err);
//         } else {
//             return user.nick;
//         }
//       }); 
// }

let placeUsers = (id) => {

  const getNick = new Promise(resolve =>{
    User.findOne({_id: id})
    .exec((err, user) =>{
      resolve(user.nick);
    });
  });
  
  return getNick;

}

// let getNick = ( note ) =>{

//   const promesa = new Promise( (resolve, reject) =>{

//     // find
//     let nick = false;
//     User.findOne({_id: note.author})
//     .exec((err, user) =>{
//       nick=user.nick;
//     });

//     console.log(nick);

//     if (nick) {
//       console.log(nick);
//       resolve( nick );
//     }
//     else {
//       reject('Anonymous');
//     }

//   });

//   return promesa;

// }

// for (const note of notes) {
//   placeUsers(note).then( nick =>
//     data.push({
//       title: note.title,
//       author: nick,
//       content: note.content
//     })
//   );
// }
// console.log(data);



// To do Promise and call it through async await

// let placeUsers = (notes) => {

//     const promesa = new Promise( (resolve, reject ) =>{

//     let replacement = new Array();
//     let clone;
//     // for (const note of notes) {
        
//       User.findOne({_id: note.author})
//       .exec((err, user) =>{
//         if (err) {
//           console.log(err);
//         } else {
//             clone={
//                 title: note.title,
//                 author: user.nick,
//                 content: note.content
//             }
//             replacement.push(clone);
//           console.log(replacement);
//         }
//       }); 

//         if (user) {
//             resolve( empleado )
            
//         } else {
//             reject('anonymous');
//         }


//     });

// }

module.exports={
    placeUsers
}