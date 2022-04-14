import {useEffect, useState} from 'react';
import React from "react";
import "styles/views/Recipe.scss";
import EditFormField from "../FormField/EditFormField";
import TextFormField from "../FormField/TextFormField";
import {Button} from "../ui/Button";
import {api, handleError} from "../../helpers/api";
import BasicSlider from "../FormField/BasicSlider";
import {Autocomplete, Input, TextField} from "@mui/material";
import CuisineOptions from "../FormField/CuisineOptions";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import PaidIcon from '@mui/icons-material/Paid';
import GroupsIcon from '@mui/icons-material/Groups';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserLikedRecipeOptions from "../FormField/UserLikesRecipeOptions";

const fakeDate = {
    "partyName": "testPartyName",
    "partyHostId": 1,
    "partyIntro": "testIntro",
    "place": "testPlace",
    "time": "01.04.2022",
    "recipeUsedId": 1,
    "partyAttendentsList": ["name1", "name2", "name3"]
}

const PartyCreation = () => {
    const partyHostId = localStorage.getItem("id");
    const [partyName, setPartyName] = useState("");
    const [partyIntro, setPartyIntro] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");
    const [recipeUsedId, setRecipeUsedId] = useState(0);
    const [partyAttendentsList, setPartyAttendentsList] = useState([]);

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
                partyAttendentsList
            });
            console.log(requestBody);

            // const response = await api.post('/parties', requestBody);
            // console.log(response.data);
            // window.location.href = `/parties/${response.data.partyId}`;

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    console.log(recipeUsedId);

    return (
        <div className="recipe creation column">
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
                placeholder="when?"
                className="recipe creation container"
                onChange={un => setTime(un)}
            />
            <TextFormField
                className="recipe creation container"
                label="Party Intro"
                placeholder="Say something about your party..."
                row={7}
                value={partyIntro}
                onChange={un => setPartyIntro(un)}
            />
            <Autocomplete
                className="recipe creation container"
                onChange={(event, newValue) => {
                    setRecipeUsedId(newValue.recipeId);
                }}
                options={UserLikedRecipeOptions}
                renderInput={(params) => <TextField {...params} label="Choose a recipe from your Likes"/>}
            />
            <Button className="profile edit button-container"
                    width="100%"
                    onClick={() => doSubmit()}
            >
                Submit
            </Button>

        </div>
    )
}

export default PartyCreation;