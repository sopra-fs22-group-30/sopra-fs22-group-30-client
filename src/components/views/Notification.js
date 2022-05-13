import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from "./Header";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        console.log("Yes");
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClick}>Show Alert</button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    You have been added into <button>test party</button>
                    <br/>
                    Check it?
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Notification;