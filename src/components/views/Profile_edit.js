import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import convertDateToSwissDateFormat from "components/date/ToSwissDateFormat";
import convertDateToJavaDateFormat from "components/date/ToJavaDateFormat";
import "styles/views/Profile.scss";

const EditFormField = props => {
    return (
        <div className="profile edit field">
            <label className="profile edit label">
                {props.label}
            </label>
            <input
                className="profile edit input"
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const EditBox = (props) => {

    // fake user id 1
    localStorage.setItem("id","1");

    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [username, setUsername] = useState(null);

    return (
        <div className="profile edit box">
            <EditFormField
                label="Username"
                value={username}
                placeholder="enter your username..."
                onChange={un => setUsername(un)}
            />
            <EditFormField
                label="Useridtest"
                value={userId}
                placeholder="enter your userId..."
                onChange={un => setUserId(un)}
            />
        </div>


    )
}

const ProfileEdit = props => {
    return (
            <BaseContainer>
                <EditBox/>
            </BaseContainer>
        )
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ProfileEdit;
