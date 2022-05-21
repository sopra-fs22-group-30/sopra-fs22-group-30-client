import React, {useEffect, useState} from "react";
import "styles/views/Party.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import party from "party.jpg"
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import {api, handleError} from "../../helpers/api";
import TextsmsIcon from '@mui/icons-material/Textsms';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useStompClient, useSubscription} from 'react-stomp-hooks';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150,
}));
const Item1 = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PartyPhoto = () => {
    return (
        <img src={party} className="party" alt="party"/>
    )
}

const Party = () => {
    const [party, setParty] = useState({
            partyId: "",
            partyName: "",
            partyHostId: "",
            partyIntro: "",
            place: "",
            time: "",
            recipeUsedId: "",
            recipeUsedName: "",
            ingredients: [],
            partyAttendantsList: [],
        }
    )
    const [user, setUsers] = useState({username: ""});
    const path = window.location.pathname;
    const partyID = path.substring(path.lastIndexOf('/') + 1);
    const userID = localStorage.getItem('id');
    const stompClient = useStompClient();
    const [partyFetchSwitch, setPartyFetchSwitch] = useState(false);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userID}/parties/${partyID}`);
                setParty(response.data);

                const hostID = response.data.partyHostId;
                const response3 = await api.get('/users/' + hostID);
                setUsers(response3.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the party: \n${handleError(error)}`);
                alert(`You cannot access this party or the party has been dismissed: \n${handleError(error)}`);
            }
        }

        fetchData();
        // trigger
    }, [partyFetchSwitch]);

    useSubscription(`/checklist/${partyID}/fetch`, (message) => {
        // trigger the user fetching switch
        setPartyFetchSwitch(!partyFetchSwitch);
    });

    function takeResponsibility(e) {
        const ingredientId = e.target.id;

        stompClient.publish({
            destination: `/app/checklist/${partyID}/fetch`,
            body: JSON.stringify({
                    "ingredientId": ingredientId,
                    "takerId": userID
                }
            )
        });
        // trigger
        setPartyFetchSwitch(!partyFetchSwitch);
    }


    const hostID = party.partyHostId;
    const recipeID = party.recipeUsedId;

    function handleOnClickHostProfile(e) {
        window.location.href = `/users/${hostID}`;
    }

    function handleOnClickRecipe(e) {
        window.location.href = `/recipes/${recipeID}`;
    }

    const goEdit = () => {
        window.location.href = `/parties-edit/${partyID}`;
    }


    function handleOnDeleteParty() {
        const userID = localStorage.getItem('id');
        const partyID = path.substring(path.lastIndexOf('/') + 1);

        const PartyDelete = async () => {
            const requestBody = JSON.stringify({
                userID,
                partyID,
            });
            await api.delete(`/parties/${partyID}/users/${userID}`, requestBody);
            window.location.href = `/home`;
        }
        PartyDelete();
    }

    function handleOnQuitParty() {
        const userID = localStorage.getItem('id');
        const partyID = path.substring(path.lastIndexOf('/') + 1);

        const PartyQuit = async () => {
            const requestBody = JSON.stringify({
                userID,
                partyID,
            });
            await api.put(`/parties/quitting/${partyID}/users/${userID}`, requestBody);
            window.location.href = `/home`;
        }
        PartyQuit();
    }

    return (
        <div className="party detail box">
            <div className="party detail column left ">
                <PartyPhoto/>
                <div className="party detail party-title">
                    <div className="party detail party-name">{party.partyName}</div>
                    <div className="party detail party-author"
                         onClick={handleOnClickHostProfile}
                    >
                        host: {user.username}</div>
                </div>

                <div>
                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <AccessTimeIcon className="party detail info-icon"/>
                            Time:
                        </div>
                        <div className="party detail info-value">{party.time}</div>
                    </div>

                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <LocationOnIcon className="party detail info-icon"/>
                            Location:
                        </div>
                        <div className="party detail info-value">{party.place}</div>
                    </div>

                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <TextsmsIcon className="party detail info-icon"/>
                            Party Intro:
                        </div>
                        <div className="party detail info-value text">{party.partyIntro}</div>
                    </div>

                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <GroupIcon className="party detail info-icon"/>
                            Attendants:
                        </div>
                        <div className="party detail info-value text">
                            {party.partyAttendantsList.map((item, index) => (
                                <div key={index} className="party detail attendant-container">
                                    <AccountCircleIcon className="party detail info-icon"/>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="party detail button-container">
                        {Number(localStorage.getItem('id')) === hostID ?
                            <button className="admin-button item" onClick={handleOnDeleteParty}> DISMISS</button>
                            :
                            <button className="admin-button item" onClick={handleOnQuitParty}> QUIT </button>
                        }
                        {Number(localStorage.getItem('id')) === hostID
                            &&
                            <button className="admin-button item" onClick={goEdit}> EDIT </button>
                        }

                    </div>
                </div>
            </div>

            <div className="party detail column right">
                <Box sx={{width: '100%'}}>
                    <Stack spacing={6}>
                        <Item>
                            <div>
                                <h2>
                                    <div>Used Recipe</div>
                                </h2>
                                <h3>
                                    <div onClick={handleOnClickRecipe}
                                         className="party detail info-container"
                                    >
                                        <div className="party detail info-label recipe">
                                            <FoodBankIcon className="party detail info-icon"/>
                                            {party.recipeUsedName}
                                        </div>
                                    </div>
                                </h3>
                            </div>

                        </Item>

                        <Item1 className="IngredientsBox">
                            <h2>
                                Ingredients
                            </h2>
                            <div className="party detail ingredient-note">
                                *Click on this checklist and bring ingredients for this party :)
                            </div>
                            <div align="left">
                                {
                                    party.ingredients.map((item, index) => (
                                        <div key={index} className="party detail info-container ingredient">
                                            <div className="party detail ingredient-label">
                                                <span className="party detail ingredient-name">{item.name}:</span>
                                                <span className="party detail ingredient-amount">{item.amount}g</span>
                                            </div>
                                            {item.takerId ?
                                                <div
                                                    className="party detail ingredient-taker"
                                                    id={item.ingredientId}
                                                    onClick={takeResponsibility}
                                                >{item.takerName}
                                                </div>
                                                :
                                                <div
                                                    className="party detail ingredient-taker null"
                                                    id={item.ingredientId}
                                                    onClick={takeResponsibility}
                                                >Bring it!
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                        </Item1>

                    </Stack>
                </Box>

            </div>

        </div>
    )
}
export default Party;