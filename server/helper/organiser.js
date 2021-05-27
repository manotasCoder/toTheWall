const User = require('../model/user');

// find users for notes

let placeUsers = async (note) => {
     User.findOne({_id: note.author})
      .exec((err, user) =>{
        if (err) {
          console.log(err);
        } else {
            return user.nick;
        }
      }); 
}


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