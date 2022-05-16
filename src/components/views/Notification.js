import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "styles/views/Notification.scss";
import {useSubscription} from "react-stomp-hooks";
import {useHistory} from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem("id")
    const [partyId, setPartyId] = useState(0);
    const [partyName, setPartyName] = useState('');
    const [hostName, setHostName] = useState('');

    useSubscription(`/invitation/${userId}/fetch`, (msg) => {
        const dto = JSON.parse(msg.body);
        setPartyId(dto.partyId);
        setPartyName(dto.partyName);
        setHostName(dto.hostName);
        setOpen(true);
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleClickPartyName = () => {
        window.location.href = `/parties/${partyId}`;
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    You have been added into&nbsp;
                    <span onClick={handleClickPartyName} className="partyName">{partyName}</span>
                    &nbsp;by&nbsp;
                    <span>{hostName}</span>.
                    <br/>
                    Check it?
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Notification;