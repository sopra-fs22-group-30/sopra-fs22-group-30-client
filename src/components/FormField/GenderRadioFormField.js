import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";

const GenderRadioFormField = props => {
    return (
        <FormControl className={props.className}>
            <FormLabel id="gender-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="gender-group-label"
                name="gender-buttons-group"
                onChange={e => props.onChange(e.target.value)}
                value={props.value}
                size="small"
            >
                <FormControlLabel value="Female" control={<Radio size="small"/>} label="Female" />
                <FormControlLabel value="Male" control={<Radio size="small"/>} label="Male" />
                <FormControlLabel value="Others" control={<Radio size="small"/>} label="Others" />
            </RadioGroup>
        </FormControl>
    );
};

export default GenderRadioFormField;