import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationSelect from './LocationSelect';
import LocalizationProvider from '@mui/'
import RoomSelect from './RoomSelect';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css"
import moment from 'moment';
import DateAdapter from '@mui/lab/AdapterMoment';
import axios from 'axios';

const theme = createTheme();

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

export default function BookingSubmit() {
    const d = new Date();
    d.setHours(10);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    
    const [username, setUsername] = React.useState('');
    const [location, setLocation] = React.useState('Weigle');
    const [room, setRoom] = React.useState('VP WIC Rm 127');
    const [startTime, setStartTime] = React.useState(d);
    const [duration, setDuration] = React.useState("2");

    const rooms = studyrooms.find(loc => loc.name === location).rooms

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" spacing={5}>
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
            Nyoom
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={username}
                onChange={(e) => {setUsername(e.target.value); console.log(e.target.value)}}
                autoComplete="username"
                autoFocus
                sx={{ mt: 2 }} 
            />
            <LocationSelect
                studyrooms={studyrooms}
                data={location}
                onChange={(e) => {setLocation(e.target.value) }}
            />
            <br />
            <RoomSelect
                rooms={rooms}
                data={room}
                onChange={(e) => {setRoom(e.target.value) }}
            />
            <FormControl fullWidth sx={{ mt: 2 }} >
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                    fullWidth
                    labelId="duration-select-label"
                    id="duration-select"
                    value={duration}
                    label="Duration"
                    onChange={(e) => { setDuration(e.target.value) }}
                >
                    <MenuItem value="0.5">0.5h</MenuItem>
                    <MenuItem value="1">1h</MenuItem>
                    <MenuItem value="1.5">1.5h</MenuItem>
                    <MenuItem value="2">2h</MenuItem>
                </Select>
            </FormControl>
            {/* <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}