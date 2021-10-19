import React from 'react';
import axios from 'axios';

const BookingList = (props) => {
    // const [bookings, setBookings] = useState([]);
    let bookings = [];
    axios.get(`http://localhost:9000/bookings`)
    .then(res => {
        bookings = [...res.data];
        return bookings;
    })
    .catch(err => console.log(err))

    console.log(bookings);

    return (
        <div>{bookings[0].username}</div>
    )
}

export default BookingList;