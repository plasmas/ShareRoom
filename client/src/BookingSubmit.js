import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationSelect from './LocationSelect';
import RoomSelect from './RoomSelect';
import DateSelect from './DateSelect';

import 'moment';

import "react-datetime/css/react-datetime.css";
import axios from 'axios';

import studyrooms from './constants';
import BookingTable from './BookingTable';

require('dotenv').config();

const theme = createTheme();

export default function BookingSubmit() {
    const d = new Date();
    d.setHours(10);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    
    const [username, setUsername] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [startTime, setStartTime] = React.useState(d);
    const [duration, setDuration] = React.useState('');

    const rooms = studyrooms.find(loc => loc.name === location).rooms

    const handleDateChange = (date) => {
      setStartTime(date);
    }

    const handleSubmit = () => {
      if (username === "") {
          alert("A Username is needed");
          return
      }
      axios.post(process.env.BOOKING_API, {
          'username': username,
          'location': location,
          'room': room,
          'startTime': startTime,
          'duration': duration
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Submit Success!");
          window.location.reload(false);
        }
        else window.alert("Submit Failed!");
      })
      .catch((error) => { console.log(error) })
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" spacing={10} sx={ {width: '80%'} }>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Share Your Studyroom Bookings!
          </Typography>
          <Stack spacing={2} sx={ { mb: 3, width: "100%"} }>
            <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                autoComplete="username"
                autoFocus
                sx={{ mt: 2 }} 
            />
            <LocationSelect
                studyrooms={studyrooms.slice(1)}
                data={location}
                onChange={(e) => { setLocation(e.target.value); setRoom('') }}
            />
            <RoomSelect
                rooms={rooms}
                data={room}
                onChange={(e) => { setRoom(e.target.value) }}
            />
            <DateSelect value={startTime} onChange={handleDateChange} />
            <FormControl fullWidth>
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                    fullWidth
                    labelId="duration-select-label"
                    id="duration-select"
                    value={duration}
                    label="Duration"
                    onChange={(e) => { setDuration(e.target.value) }}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="0.5">0.5h</MenuItem>
                    <MenuItem value="1">1h</MenuItem>
                    <MenuItem value="1.5">1.5h</MenuItem>
                    <MenuItem value="2">2h</MenuItem>
                </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ width: '100%'}}
            >
              Submit
            </Button>
          </Stack>
          <BookingTable />
        </Box>
      </Container>
    </ThemeProvider>
  );
}