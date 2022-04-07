import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {Slider} from "@mui/material";


const BasicSlider = props => {

    // const handleSliderChange = (event, newValue) => {
    //     setValue(newValue);
    // };


    return (
        <Slider
            className={props.className}
            size={props.size}
            defaultValue={props.defaultValue}
            aria-label="Small"
            valueLabelDisplay="on" // auto | on
            label={props.label}
            min={props.min}
            max={props.max}
            value={props.value}
            onChange={(e,newValue) => props.onChange(e, newValue)}
        />
    );
};

export default BasicSlider;
