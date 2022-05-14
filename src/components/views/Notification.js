import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from "./Header";
import {useSubscription} from "react-stomp-hooks";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props) => {
    const [open, setOpen] = useState(false);
    const stompClient = props.client;
    const userId = localStorage.getItem("id")
    const [partyId, setPartyId] = useState(0);
    const [partyName, setPartyName] = useState('');
    const [hostName, setHostName] = useState('');

    useSubscription(`/invitation/fetch`, (msg) => {
        const dto = JSON.parse(msg.body);
        setPartyId(dto.partyId);
        setPartyName(dto.partyName);
        setHostName(dto.hostName);
        setOpen(true);
    });
    const handleOpen = (event) => {
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
            <button onClick={handleOpen}>Show Alert</button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    You have been added into <button>{partyName}</button> by <button>{hostName}</button>
                    <br/>
                    Check it?
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Notification;