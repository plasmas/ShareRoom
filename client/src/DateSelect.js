import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

// props.value props.onChange

const DateSelect = (props) => {
    // const today = new Date();
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
                label="Date&Time picker"
                value={props.value}
                onChange={props.onChange}
                renderInput={(params) => <TextField {...params} />}
                minutesStep={30}
                inputFormat="ddd MMM D H:mm"
                // minDateTime={today}
            />
        </LocalizationProvider>
    )
}

export default DateSelect;