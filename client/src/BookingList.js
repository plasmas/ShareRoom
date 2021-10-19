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

const BookingList = (props) => {
    const [bookings, setBookings] = useState([]);

    function calEndTime(startTime, duration) {
      
    }

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
                    Header: "Start Time",
                    accessor: "startTime"
                },
                {
                    Header: "End Time",
                    accessor: "endTime"
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
                let startTime = new Date(Date.parse(booking.startTime));
                let endTime = new Date(startTime);
                endTime.setHours(endTime.getHours() + booking.duration);
                return {
                  username: booking.username,
                  location: booking.location,
                  startTime: startTime,
                  endTime: endTime,
                  duration: booking.duration
                }
              })
              console.log(data);
              setBookings(data);
            })
            .catch(err => console.log(err))
    }, [])

    if (bookings.length === 0) {
        return (
            <div>No Studyroom reserved! Be the first one to reserve!</div>
        )
    }
    return (
        <Styles>
            <Table columns={columns} data={bookings} />
        </Styles>
    )
}

export default BookingList;