import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
require('dotenv').config();

export default function BookingTable() {

    const [bookings, setBookings] = React.useState([]);
    React.useEffect(() => {
      const updateBookings = () => {
        const options = {
          dateStyle: {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          },
          timeStyle: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }
        }
        axios.get(process.env.REACT_APP_BOOKING_API)
            .then(response => {
              let data = response.data;
              console.log(data);
              data = data.map((booking) => {
                const startTime = new Date(Date.parse(booking.startTime));
                const dateString = startTime.toLocaleDateString("en-US", options.dateStyle);
                const timeString = startTime.toLocaleTimeString("en-US", options.timeStyle);
                return {
                  id: booking._id,
                  username: booking.username,
                  location: booking.location,
                  room: booking.room,
                  date: dateString,
                  time: timeString,
                  duration: booking.duration
                }
              })
              // console.log(data);
              setBookings(data);
            })
            .catch(err => console.log(err))
      }
      updateBookings();
    }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Duration&nbsp;(h)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {booking.username}
              </TableCell>
              <TableCell>{booking.location}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}