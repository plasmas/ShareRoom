import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// props = {studyrooms, data, onChange}

const LocationSelect = props =>
    <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="location-select-label">Location</InputLabel>
            <Select
                fullWidth
                labelId="location-select-label"
                id="location-select"
                value={props.data}
                label="Location"
                onChange={props.onChange}
            >
                {
                    props.studyrooms.map(
                        loc => <MenuItem key={loc.name} value={loc.name}>{loc.name}</MenuItem>
                    )
                }
            </Select>
    </FormControl>

export default LocationSelect;