import React, { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css"
import moment from 'moment';
import axios from 'axios';

const BookingForm = (props) => {
    const d = new Date();
    d.setHours(10);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('VP Ground Floor');
    const [startTime, setStartTime] = useState(d);
    const [duration, setDuration] = useState("2");

    const handleSubmit = () => {
        if (username === "") {
            alert("A Username is needed");
            return
        }
        axios.post('http://localhost:9000/bookings', {
            'username': username,
            'location': location,
            'startTime': startTime,
            'duration': duration
        })
        .then((response) => { console.log(response) })
        .catch((error) => { console.log(error) })
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
            User Name:
            <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
            Location:
            <select name="location" value={location} onChange={(e) => {
                setLocation(e.target.value);
                // console.log("location set to " + e.target.value);
            }}>
                <option value="VP Ground Floor">VP Ground Floor</option>
                <option value="VP 3rd Floor"> VP 3rd Floor</option>
                <option value="VP 4th Floor"> VP 4th Floor</option>
            </select>
        </label>
        <br />
        <label>
            Start Time:
            <Datetime
                inputProps={{name: 'startTime'}}
                isValidDate={valid}
                value={startTime}
                timeConstraints={{ minutes: { min: 0, max: 59, step: 30} }}
                dateFormat={"ddd MMM D"}
                timeFormat={"H:mm"}
                onChange={(m) => {
                    setStartTime(m.toDate());
                    // console.log(m.toDate());
                }} />
        </label>
        <br />
        <label>
            Duration:
            <select name="duration" value={duration} onChange={(e) => {
                setDuration(e.target.value);
                // console.log("duration changed to " + e.target.value);
            }}>
                <option value="2">2 hours</option>
                <option value="1.5">1.5 hour</option>
                <option value="1">1 hour</option>
                <option value="0.5">0.5 hour</option>
            </select>
        </label>
        <input type="submit" value="submit" />
    </form>
    )
}

const yesterday = moment().subtract(1, "day");
function valid(current) {
    return current.isAfter(yesterday);
}

export default BookingForm;