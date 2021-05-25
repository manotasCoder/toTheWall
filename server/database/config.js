const moongose = require('mongoose');


dbConnection = async() =>{

    try {
        
        await moongose.connect( process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

    } catch (error) {
        throw new Error('Database not connecting, check the admin of the APP');
    }

}


module.exports = {
    dbConnection
}