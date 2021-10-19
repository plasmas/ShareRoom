var express = require("express");
var router = express.Router();
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = {
    db: 'Booking',
    collection: 'booking'
};

MongoClient.connect(process.env.MONGODB_URL)
    .then(client => {
        console.log('Connected to DB');
        const db = client.db(config.db);
        const bookingCollection = db.collection(config.collection);

        router.use(bodyParser.urlencoded( {extended: true} ));

        router.get('/', (req, res) => {
            bookingCollection.find().toArray()
                .then(result => {
                    res.send(result);
                    console.log(result);
                })
                .catch(error => console.error(error))
        })

        router.post('/', (req, res) => {
            bookingCollection.insertOne(req.body)
                .then(result => {
                    console.log(result);
                    alert("Submit Success!");
                })
            res.redirect('/');
        ;})

    })
    .catch(error => console.error(error))

// router.get("/", (req, res) => {
//     res.send("whut is that?");
// })

module.exports = router;