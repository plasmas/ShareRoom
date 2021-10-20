import react from 'react';

const RoomSelect = props => 
    <select name="room" value={props.value} onChange={props.onChange}>
        {
            props.rooms.map(room => <option key={room} value={room}>{room}</option>)
        }
    </select>

export default RoomSelect