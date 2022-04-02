import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import convertDateToSwissDateFormat from "components/date/ToSwissDateFormat";
import convertDateToJavaDateFormat from "components/date/ToJavaDateFormat";
import "styles/views/Profile.scss";

// const EditFormField = props => {
//     return (
//         <div className="edit field">
//             <label className="edit label">
//                 {props.label}
//             </label>
//             <input
//                 className="edit input"
//                 placeholder={props.placeholder}
//                 value={props.value}
//                 onChange={e => props.onChange(e.target.value)}
//             />
//         </div>
//     );
// };
//
// const EditBox = (props) => {
//     return (
//         <div className="profile edit box">
//             <EditFormField
//                 label="Username"
//                 value={username}
//                 placeholder="enter your username..."
//                 onChange={un => setUsername(un)}
//             />
//             <EditFormField
//                 label="Gender"
//                 value={gender}
//                 placeholder="enter your username..."
//                 onChange={un => setUsername(un)}
//             />
//
//             <EditFormField
//                 label="Birthday"
//                 value={birthdayInput}
//                 placeholder="dd.MM.yyyy (optional)"
//                 onChange={n => setBirthdayInput(n)}
//             />
//             {/* if the Date input by the user is not valid,
//                     this <p/> tag will appear and prompt the user. */}
//             {   !isValid
//                 &&
//                 <p className="profile edit wrongFormat"> Invalid Date Format!</p>
//             }
//
//         </div>
//     )
// }

const ProfileEdit = props => {
    return (
        <div>
            yes
        </div>
        )
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ProfileEdit;
