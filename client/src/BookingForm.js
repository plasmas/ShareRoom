import React, { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css"
import moment from 'moment';
import axios from 'axios';
import LocationSelect from './LocationSelect';
import RoomSelect from './RoomSelect';

const studyrooms = [
    {
        name: "Biomedical Library",
        rooms: [
            "Biotech Commons Group Study Room 2",
            "Biotech Commons Group Study Room 3",
            "Biotech Commons Group Study Room 4",
            "Biotech Commons Group Study Room 5",
            "Biotech Commons Group Study Room 6",
            "Biotech Commons Group Study Room 7",
            "Biotech Commons Group Study Room 8",
            "Biotech Commons Group Study Room 9",
            "Biotech Commons Group Study Room 10",
            "Biotech Commons Group Study Room 11",
            "Biotech Commons Group Study Room 12",
            "Biotech Commons Group Study Room 13",
            "Biotech Commons Group Study Room 14",
            "Biotech Commons Group Study Room 15"
        ]
    },
    {
        name: "Education Commons",
        rooms: [
            "Educom Rm 225",
            "Educom Rm 226",
            "Educom Rm 228",
            "Educom Rm 230",
            "Educom Rm 231",
            "Educom Rm 235"
        ]
    },
    {
        name: "Weigle",
        rooms: [
            "VP WIC Booth 01",
            "VP WIC Booth 02",
            "VP WIC Booth 03",
            "VP WIC Booth 04",
            "VP WIC Booth 05",
            "VP WIC Booth 06",
            "VP WIC Booth 07",
            "VP WIC Booth 08",
            "VP WIC Booth 09",
            "VP WIC Booth 10",
            "VP WIC Booth 11",
            "VP WIC Booth 12",
            "VP WIC Rm 117 (Beeman)",
            "VP WIC Rm 118",
            "VP WIC Rm 119",
            "VP WIC Rm 120",
            "VP WIC Rm 123",
            "VP WIC Rm 126",
            "VP WIC Rm 127",
            "VP WIC Rm 128",
            "VP WIC Rm 129"
        ]
    }
];

const BookingForm = (props) => {
    const d = new Date();
    d.setHours(10);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('Weigle');
    const [room, setRoom] = useState('VP WIC Rm 127');
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
            'room': room,
            'startTime': startTime,
            'duration': duration
        })
        .then((response) => { console.log(response) })
        .catch((error) => { console.log(error) })
    }

    const rooms = studyrooms.find(loc => loc.name === location).rooms;
    // console.log(rooms);

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
            <LocationSelect studyrooms={studyrooms} value={location} onChange={(e) => {
                setLocation(e.target.value)
            }} />
        </label>
        <br />
        <label>
            Room:
            <RoomSelect rooms={rooms} value={room} onChange={(e) => {
                setRoom(e.target.value) 
            }} />
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
                }}
            />
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