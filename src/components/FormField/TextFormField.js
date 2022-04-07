import TextField from "@mui/material/TextField";
import React from "react";

const TextFormField = props => {
    return (
        <TextField
            id="standard-multiline-static"
            label={props.label}
            placeholder={props.placeholder}
            className={props.className}
            multiline
            rows={props.row}
            onChange={e => props.onChange(e.target.value)}
            value={props.value}
        />
    )
};

export default TextFormField;