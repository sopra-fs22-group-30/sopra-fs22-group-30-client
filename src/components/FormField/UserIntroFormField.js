import TextField from "@mui/material/TextField";
import React from "react";

const UserIntroFormField = props => {
    return (
        <TextField
            id="standard-multiline-static"
            label="Self-intro"
            placeholder="Say something..."
            className={props.className}
            multiline
            rows={3}
            onChange={e => props.onChange(e.target.value)}
            value={props.value}
        />
    )
};

export default UserIntroFormField;