import React, {useState} from "react";
import {api, handleError} from "../../helpers/api";
import UserInvitation from "../FormField/UserInvitation";
import UsernameOptions from "../FormField/UsernameOptions";
import {Button} from "../ui/Button";

const PartyInvitation=()=>{
    const [partyAttendantsList, setPartyAttendantsList] = useState([]);
    const doSubmit = async () => {
        try {
            const requestBody = JSON.stringify({
                partyAttendantsList
            });
            const path = window.location.pathname;
            const userID=localStorage.getItem('id');
            const partyID=path.substring(path.lastIndexOf('/') + 1);
            await api.put(`/users/${userID}/parties/${partyID}`, requestBody);
            window.location.href = '/parties/'+partyID;
        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    return(
        <div>
            <UserInvitation
                options={UsernameOptions()}
                onChange={(event, newValue) => {
                    setPartyAttendantsList(newValue);
                }}
            />

            <div>
                <Button className="profile edit button-container"
                        width="100%"
                        disabled={
                            !partyAttendantsList
                        }
                        onClick={doSubmit()}
                >
                    Invite
                </Button>
            </div>
        </div>
    )
}

export default PartyInvitation;