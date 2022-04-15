import {useState} from 'react';
import React from "react";
import "styles/views/Recipe.scss";
import EditFormField from "../FormField/EditFormField";
import TextFormField from "../FormField/TextFormField";
import {Button} from "../ui/Button";
import {api, handleError} from "../../helpers/api";
import {Autocomplete, Input, TextField} from "@mui/material";
import UserLikedRecipeOptions from "../FormField/UserLikesRecipeOptions";
import UserInvitation from "../FormField/UserInvitation";
import UsernameOptions from "../FormField/UsernameOptions";
import convertDateToJavaDateFormat from "../date/ToJavaDateFormat";

const fakeDate = {
    "partyName": "testPartyName",
    "partyHostId": 1,
    "partyIntro": "testIntro",
    "place": "testPlace",
    "time": "01.04.2022",
    "recipeUsedId": 1,
    "partyAttendantsList": ["name1", "name2", "name3"]
}

const PartyCreation = () => {
    const partyHostId = localStorage.getItem("id");
    const [partyName, setPartyName] = useState("");
    const [partyIntro, setPartyIntro] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");
    const [recipeUsedId, setRecipeUsedId] = useState(0);
    const [partyAttendantsList, setPartyAttendantsList] = useState([]);

    const [isValid, setIsValid] = useState(true);

    const checkDateFormat = () => {
        setIsValid(false);
        const wrongMessage = "wrong date format";
        // convert birthday to Java Date Format, then add it to requestBody

        if (convertDateToJavaDateFormat(time) === wrongMessage) {
            // if not valid, do nothing
            setIsValid(false);
        } else {
            // if valid, execute doSubmit()
            setIsValid(true);
            doSubmit();
        }
    }

    const doSubmit = async () => {
        // we just need non-empty ingredients( name !== "" && amount > 0 )

        try {
            const requestBody = JSON.stringify({
                partyHostId,
                partyName,
                place,
                time,
                partyIntro,
                recipeUsedId,
                partyAttendantsList
            });
            const response = await api.post('/parties', requestBody);
            window.location.href = `/parties/${response.data.partyId}`;

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    return (
        <div className="recipe creation box">
            <div className="recipe creation column">
                <h3><span className="line"></span> Standard <span className="line"></span></h3>
                <EditFormField
                    label="Party Name"
                    value={partyName}
                    placeholder="enter party Name..."
                    className="recipe creation container"
                    onChange={un => setPartyName(un)}
                />
                <EditFormField
                    label="Place of your party"
                    value={place}
                    placeholder="where?"
                    className="recipe creation container"
                    onChange={un => setPlace(un)}
                />
                <EditFormField
                    label="Time of your party"
                    value={time}
                    placeholder="dd.MM.yyyy"
                    className="recipe creation container"
                    onChange={un => setTime(un)}
                />
                {!isValid
                    &&
                    <div className="recipe creation container">
                        <p className="profile edit wrongFormat party"> Invalid Date Format!</p>
                    </div>
                }
                <Autocomplete
                    className="recipe creation container"
                    onChange={(event, newValue) => {
                        setRecipeUsedId(newValue.recipeId);
                    }}
                    options={UserLikedRecipeOptions()}
                    getOptionLabel={(option) => option.recipeName}
                    renderInput={(params) => <TextField {...params} label="Choose a recipe from your Likes"/>}
                />
                <TextFormField
                    className="recipe creation container"
                    label="Party Intro"
                    placeholder="Say something about your party..."
                    row={13}
                    value={partyIntro}
                    onChange={un => setPartyIntro(un)}
                />
            </div>
            <div className="recipe creation column">
                <h3><span className="line"></span> Invitation <span className="line"></span></h3>

                <UserInvitation
                    options={UsernameOptions()}
                    onChange={(event, newValue) => {
                        setPartyAttendantsList(newValue);
                    }}
                />
            </div>

            <div className="recipe creation column">
                <h3><span className="line"></span> &nbsp;&nbsp; Picture &nbsp;&nbsp; <span className="line"></span></h3>
                <div className="upload-pic"></div>
                <Button className="profile edit button-container"
                        width="100%"
                        disabled={
                            !partyName
                            || !partyIntro
                            || !place
                            || !time
                            || !recipeUsedId
                            || !partyAttendantsList
                        }
                        onClick={checkDateFormat}
                >
                    Let's Party!
                </Button>
                <Button className="profile edit button-container cancel"
                        width="100%"
                >
                    Cancel
                </Button>
            </div>

        </div>
    )
}

export default PartyCreation;