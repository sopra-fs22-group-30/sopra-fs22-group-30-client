import React from "react";
import "styles/views/Party.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import party from "party.jpg"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";

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

    return (
        <div className="party detail box">
            <div className="party detail left column">
                <PartyPhoto/>
                <div>
                    <h1 align="left">Party Name</h1>
                </div>

                <div >
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Item><AccessTimeIcon/>Time: </Item>
                        <Item><LocationOnIcon/> Location:</Item>
                    </Grid>
                    <h3 align="left">content</h3>
                    <h3 align="left">Attendants:</h3>
                </div>


            </div>
            <div className="party detail right column">
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={6}>
                        <Item1>Recipe</Item1>
                        <Item1>Ingredients</Item1>
                    </Stack>
                </Box>

            </div>

        </div>
    )

}
export default Party;