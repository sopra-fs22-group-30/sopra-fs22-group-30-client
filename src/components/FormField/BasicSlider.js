import React from "react";
import {Slider} from "@mui/material";


const BasicSlider = props => {

    return (
        <Slider
            className={props.className}
            size={props.size}
            defaultValue={props.defaultValue}
            aria-label="Small"
            valueLabelDisplay="auto" // auto | on
            label={props.label}
            min={props.min}
            max={props.max}
            value={props.value}
            onChange={(e,newValue) => props.onChange(e, newValue)}
        />
    );
};

export default BasicSlider;
