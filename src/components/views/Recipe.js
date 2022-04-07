import React from "react";
import "styles/views/Profile.scss";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import food from 'food.jpg';

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
    height:500,
}));

const RecipePhoto = () =>{
    return (
        <img src={food} className="food" alt="food"/>
    )
}
const Recipe= () => {
    return (
        <Box sx={{ height:100,flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>
                        <div>
                            <RecipePhoto/>
                        </div>
                        <div>
                            <h1 align="left">Royal Sushi House</h1>
                        </div>

                        <div>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Item>Author:Group30</Item>
                                <Item>cuisine:Sushi</Item>
                                <Item>time:30-40min</Item>
                                <Item>price:chf 32</Item>
                                <Item>time:30-40min</Item>
                            </Grid>
                            <h3 align="left">steps:
                            1....</h3>
                        </div>

                    </Item>
                </Grid>
                <Grid item xs >
                    <Item1>
                        <h2>Ingredient</h2>
                        <div>
                            <li>Rice 50g</li>
                            <li>Seaweed 30g</li>
                            <li>salmon 40g</li>
                        </div>
                    </Item1>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Recipe;