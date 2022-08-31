import React from 'react';

const MainCharacteristics = (props) => {
    return (
        <li>{props.characteristic.title}: {props.characteristic.value}</li>
    );
};

export default MainCharacteristics;