const mongoose = require('mongoose');

async function connect() {
    // const url = 'mongodb://cluster0.txsjl.mongodb.net:27017';
    // const url = 'mongodb://localhost/workshop';

    const url = 'mongodb+srv://osama:p4dFB4OCV3hbxHKs@cluster0.txsjl.mongodb.net/workshop?authSource=admin&replicaSet=atlas-vbzzgl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
    try {
        const connection = await mongoose.connect(url
            , { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("connected to db.....")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connect;