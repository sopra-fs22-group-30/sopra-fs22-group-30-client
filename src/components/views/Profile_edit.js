import React, {useEffect, useState} from 'react';
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
            <label className={`profile edit label`}>
                {props.label}
            </label>
            <input
                className={`profile edit input ${props.className}`}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const RadioField = props => {
    return (
        <div className="profile edit field">
            <label className={`profile edit label`}>
                {props.label}
            </label>
            <div onChange={e => props.onChangeValue(e.target.value)}>
                <label>Male</label>
                <input
                    className={`profile edit input ${props.className}`}
                    type="radio"
                    value="Male"
                />
                <label>Female</label>
                <input
                    className={`profile edit input ${props.className}`}
                    type="radio"
                    value="Female"
                />
                <label>Others</label>
                <input
                    className={`profile edit input ${props.className}`}
                    type="radio"
                    value="Others"
                />
            </div>

        </div>
    )
}


const EditBox = (props) => {

    const userId = localStorage.getItem("id");
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [intro, setIntro] = useState("");
    const [isValid, setIsValid] = useState(true);

    const checkDateFormat = () => {
        setIsValid(false);
        const wrongMessage = "wrong date format";
        // convert birthday to Java Date Format, then add it to requestBody
        console.log("before set birthday:",birthday);

        if (convertDateToJavaDateFormat(birthday) === wrongMessage) {
            // if not valid, do nothing
            setIsValid(false);

        } else {
            // if valid, execute doSubmit()
            setIsValid(true);
            doSubmit();
        }
    }


    const doSubmit = async () => {
        try {
            // we need id to identity a user
            setBirthday(convertDateToJavaDateFormat(birthday));


            const requestBody = JSON.stringify({id: userId, username, birthday, gender, intro});
            await api.put(`/users/${userId}`, requestBody);

            // submit successfully worked --> navigate to his/her own profile
            let path = `/users/${userId}`;
            window.location.href = path;

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userId);
                setUsername(response.data.username);
                setBirthday(response.data.birthday);
                setGender(response.data.gender);
                setIntro(response.data.intro);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


    return (
        <div className="profile edit box">
            <div className="profile edit form">
                <h2>Upload your profile:</h2>
                <EditFormField
                    label="Username"
                    value={username}
                    placeholder="enter your username..."
                    onChange={un => setUsername(un)}
                />

                <RadioField
                    label="Gender"
                    onChangeValue={un => setGender(un)}
                />


                <EditFormField
                    label="Birthday"
                    value={birthday}
                    placeholder="dd.MM.yyyy"
                    onChange={un => setBirthday(un)}
                />
                {/* if the Date input by the user is not valid, this <p/> tag will appear and prompt the user. */}
                {!isValid
                    &&
                    <p className="profile edit wrongFormat"> Invalid Date Format!</p>
                }
                <EditFormField
                    type="text"
                    className="intro"
                    label="Intro"
                    value={intro}
                    placeholder="Say something about yourself..."
                    onChange={un => setIntro(un)}
                />

                <Button className="profile edit button-container"
                        disabled={!username}
                        width="100%"
                        onClick={() => checkDateFormat()}
                >
                    Upload
                </Button>

            </div>

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
