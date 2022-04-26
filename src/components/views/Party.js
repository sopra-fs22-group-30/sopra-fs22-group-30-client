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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
    const [party, setParties] = useState({
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


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userID}/parties/${partyID}`);
                setParties(response.data);

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
    }, [])
    const hostID = party.partyHostId;
    const recipeID = party.recipeUsedId;

    function handleOnClickHostProfile(e) {
        window.location.href = `/users/${hostID}`;
    }

    function handleOnClickRecipe(e) {
        window.location.href = `/recipes/${recipeID}`;
    }

    return (
        <div className="party detail box">
            <div className="party detail left column">
                <PartyPhoto/>
                <div>
                    <h1 align="left">{party.partyName} created by <span
                        onClick={handleOnClickHostProfile}>{user.username}</span></h1>
                </div>

                <div>
                    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                        <AccessTimeIcon/> Time:{party.time}
                    </div>
                    <div>
                        <LocationOnIcon/> Location:{party.place}
                    </div>
                    <h3 align="left">{party.partyIntro}</h3>
                    <h3 align="left">Attendants
                        <div>
                            {party.partyAttendantsList.map((item, index) => (
                                <li>{item}</li>
                            ))}
                        </div>

                    </h3>
                </div>


            </div>
            <div className="party detail right column">
                <Box sx={{width: '100%'}}>
                    <Stack spacing={6}>
                        <Item>
                            <div>
                                <h2>
                                    <div>Recipe</div>
                                </h2>
                                <h3>
                                    <div><span onClick={handleOnClickRecipe}>{recipe.recipeName}</span></div>
                                </h3>
                            </div>

                        </Item>

                        <Item1>
                            <h2>
                                Ingredients
                            </h2>
                            <div align="left">
                                {
                                    party.ingredients.map((item, index) => (
                                        <div>
                                            <div key={index}>
                                                <span>{item.name}</span>
                                                <span>{item.takerId}</span>

                                            </div>
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