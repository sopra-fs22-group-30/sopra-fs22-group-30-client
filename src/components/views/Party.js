import React, {useEffect, useState} from "react";
import "styles/views/Party.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import party from "party.jpg"
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import {api, handleError} from "../../helpers/api";
import TextsmsIcon from '@mui/icons-material/Textsms';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
    height: 450,
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
            ingredients: [],
            partyAttendantsList: [],
        }
    )
    const [recipe, setRecipes] = useState({recipeName: ""});
    const [user, setUsers] = useState({username: ""});
    const path = window.location.pathname;
    const partyID = path.substring(path.lastIndexOf('/') + 1);
    const userID = localStorage.getItem('id');
    const stompClient = useStompClient();
    const [partyFetchSwitch, setPartyFetchSwitch] = useState(false);
    // const [test,setTest] = useState(null)


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userID}/parties/${partyID}`);

                setParty(response.data);
                console.log(response.data);

                const recipeID = response.data.recipeUsedId;
                const response2 = await api.get('/recipes/' + recipeID);
                setRecipes(response2.data);

                const hostID = response.data.partyHostId;
                const response3 = await api.get('/users/' + hostID);
                setUsers(response3.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
        // trigger
    }, [partyFetchSwitch])

    useSubscription(`/checklist/${partyID}/fetch`, (message) => {
        // trigger the user fetching switch
        console.log(message);
        setPartyFetchSwitch(!partyFetchSwitch);
    });

    console.log(partyFetchSwitch);
    console.log(party.ingredients);

    function takeResponsibility(e) {
        const ingredientId = e.target.id;
        console.log("ingredientId:", ingredientId);
        console.log("takerId:", userID);

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
                                <div className="party detail attendant-container">
                                    <AccountCircleIcon className="party detail info-icon"/>
                                    {item}
                                </div>
                            ))}
                        </div>
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
                                            {recipe.recipeName}
                                        </div>
                                    </div>
                                </h3>
                            </div>

                        </Item>

                        <Item1>
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

                <div className="admin-button container">
                    <button className="admin-button item"> DISMISS </button>

                    { Number(localStorage.getItem('id')) === hostID
                        &&
                        <button className="admin-button item" onClick={goEdit}> EDIT </button>
                    }

                </div>

            </div>

        </div>
    )

}
export default Party;