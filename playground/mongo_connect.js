const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/ToDOApp", (err, client) => {
    if(err) {
      return console.log('unable to connect mongo db');
    }
    console.log('Connected to Mongo db');
    const db = client.db('ToDOApp');
    // db.collection('user').insert({
    //     name: 'lokesh',
    //     age: '22',
    //     address:'chennai ',
    //   }, (err, result) => {
    //     if (err) {
    //       return console.log('failed to insert data');
    //     }
    //     return console.log('inserted successfully');
    //   });
    db.collection('user').find({
        name:'lokesh'
    }).toArray().then((results) => {
      console.log('resulsts are',results);
    } );

    client.close();
});
