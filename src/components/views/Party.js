import React, {useEffect, useState} from "react";
import "styles/views/Party.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import party from "party.jpg"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import {api, handleError} from "../../helpers/api";
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:250,
}));

const PartyPhoto = () =>{
    return (
        <img src={party} className="party" alt="party"/>
    )
}

const Party = ()=>{
    const [party,setParties]=useState({
        partyId:"",
        partyName:"",
        partyHostId: "",
        partyIntro: "",
        place: "",
        time: "",
        recipeUsedId: "",
        ingredients:[],
        partyAttendantsList: [],}
    )
    const [recipe,setRecipes]=useState({recipeName:""});
    const [user, setUsers]=useState({username:""});
    const path = window.location.pathname;
    const partyID = path.substring(path.lastIndexOf('/') + 1);
    const userID = localStorage.getItem('id');


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userID}/parties/${partyID}`);
                setParties(response.data);

                const recipeID=response.data.recipeUsedId;
                const response2 = await api.get('/recipes/' + recipeID);
                setRecipes(response2.data);

                const hostID=response.data.partyHostId;
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

    return (
        <div className="party detail box">
            <div className="party detail left column">
                <PartyPhoto/>
                <div>
                    <h1 align="left">{party.partyName} created by {user.username}</h1>
                </div>

                <div >
                    <div style={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
                        <AccessTimeIcon/> Time:{party.time}
                    </div>
                    <div>
                        <LocationOnIcon/> Location:{party.place}
                    </div>
                    <h3 align="left">{party.partyIntro}</h3>
                    <h3 align="left">Attendants
                        <div>
                            {party.partyAttendantsList.join('/n')}
                        </div>
                    </h3>
                </div>


            </div>
            <div className="party detail right column">
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={6}>
                        <Item1><h2>Recipe:{recipe.recipeName}</h2></Item1>
                        <Item1><h2>Ingredients:{party.ingredients.join('\n')}</h2></Item1>
                    </Stack>
                </Box>

            </div>

        </div>
    )

}
export default Party;