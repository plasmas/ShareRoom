import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// props = {rooms, data, onChange}

const RoomSelect = props =>
    <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="room-select-label">Room</InputLabel>
            <Select
                fullWidth
                labelId="room-select-label"
                id="room-select"
                value={props.data}
                label="Room"
                onChange={props.onChange}
            >
                {
                    props.rooms.map(
                        room => <MenuItem key={room} value={room}>{room}</MenuItem>
                    )
                }
            </Select>
    </FormControl>

export default RoomSelect;