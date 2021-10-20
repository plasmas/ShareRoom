import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

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

const BookingList = (props) => {
    const [bookings, setBookings] = useState([]);

    const columns = useMemo(
        () => [
            {
                // first group - TV Show
                Header: "Bookings",
                // First group columns
                columns: [
                {
                    Header: "Username",
                    accessor: "username"
                },
                {
                    Header: "Location",
                    accessor: "location"
                },
                {
                    Header: "Room",
                    accessor: "room"
                },
                {
                    Header: "Date",
                    accessor: "date"
                },
                {
                    Header: "Time",
                    accessor: "time"
                },
                {
                    Header: "Duration (h)",
                    accessor: "duration"
                }
                ]
            }
        ],
        []
    );

    useEffect(() => {
        axios.get(`http://localhost:9000/bookings`)
            .then(response => {
              let data = response.data;
              data = data.map((booking) => {
                const startTime = new Date(Date.parse(booking.startTime));
                const dateString = startTime.toLocaleDateString("en-US", options.dateStyle);
                const timeString = startTime.toLocaleTimeString("en-US", options.timeStyle);
                return {
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
    }, [])

    if (bookings.length === 0) {
        return (
            <div>Be the first one to reserve!</div>
        )
    }
    return (
        <Styles>
            <Table columns={columns} data={bookings} />
        </Styles>
    )
}

export default BookingList;