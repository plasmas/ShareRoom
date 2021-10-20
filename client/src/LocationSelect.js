import React from 'react';

const LocationSelect = props => 
    <select name="location" value={props.value} onChange={props.onChange}>{
        props.studyrooms.map(loc => 
            <option key={loc.name} value={loc.name}>{loc.name}</option>
        )
    }</select>

export default LocationSelect;