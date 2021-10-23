var express = require("express");
var router = express.Router();
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = {
    db: 'Booking',
    collection: 'booking'
};

const filterFutureBookings = bookings => {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let futureBookings = bookings.filter(booking => {
        const startTime = new Date(Date.parse(booking.startTime));
        return startTime > today;
    })
    return futureBookings;
}

MongoClient.connect(process.env.MONGODB_URL)
    .then(client => {
        console.log('Connected to DB');
        const db = client.db(config.db);
        const bookingCollection = db.collection(config.collection);

        router.use(bodyParser.urlencoded( {extended: true} ));

        router.get('/', (request, response) => {
            bookingCollection.find().sort({startTime: 1}).toArray()
                .then(result => {
                    result = filterFutureBookings(result);
                    // console.log(result);
                    response.status(200).send(result);
                })
                .catch(error => console.error(error))
        })

        router.post('/', (request, response) => {
            bookingCollection.insertOne(request.body)
                .then(result => {
                    // console.log(result);
                    console.log("Submit Success!");
                })
                .then(() => {response.status(200).send()});
        ;})

    })
    .catch(error => console.error(error))

module.exports = router;