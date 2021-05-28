const User = require('../model/user');


let placeUsers = (id) => {

  const getNick = new Promise(resolve =>{
    User.findOne({_id: id})
    .exec((err, user) =>{
      resolve(user.nick);
    });
  });
  
  return getNick;

}

let addFavUser = (idUser, idNote) =>{
  const addFav = new Promise( async resolve =>{
    let favList = new Array();
    //check if the note is already inside the array
    await getFavs(idUser)
    .then(userDb =>{
      favList = userDb.favs;
    })
    .catch( (err) =>{
      console.log('failure in the system');  
    });

    if ( !favList.find(element => element === idNote) ) {
      User.findByIdAndUpdate( idUser, {$push: { favs: idNote }},
        (err, user) =>{
          if (err) {
            console.log(err);
          } else {
            resolve(user);
          }
      }) 
    }

  });

  return addFav;

}

let getFavs = (id) => {

  const getFavs = new Promise(resolve =>{
    User.findOne({_id: id})
    .exec((err, user) =>{
      resolve(user);
    });
  });
  
  return getFavs;

}


module.exports={
    placeUsers,
    addFavUser
}