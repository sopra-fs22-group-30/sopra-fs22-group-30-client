import React, {useState} from "react";
import ReactDOM from "react-dom";
import "styles/views/Profile.scss";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import food from 'food.jpg';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {api, handleError} from "../../helpers/api";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import PaidIcon from '@mui/icons-material/Paid';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FaceIcon from '@mui/icons-material/Face';
import GroupIcon from '@mui/icons-material/Group';


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

    const [recipe, setRecipes] = useState({
            recipeId: "",
            recipeName: "",
            authorId:"",
            cost:"",
            timeConsumed:"",
            content:"",
            portion:"",
            ingredients:"",
            cuisine:"",
        }
    );

    const [ingredients, setIngredients] = useState(
       [{name: "", amount: 0}]
    );

    const [user,setUsers]=useState({
        id:"",
        username:"",}
    );


    const path = window.location.pathname;
    const recipeID = path.substring(path.lastIndexOf('/') + 1);

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/recipes/' + recipeID);
                setRecipes(response.data);

                const response2= await api.get('/users/'+recipe.authorId);
                setUsers(response2.data);
                setIngredients(response.data.ingredients);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, [])
    const authorID=recipe.authorId;
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response2= await api.get('/users/'+authorID);
                setUsers(response2.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    /*const IngredientsNameByRecipes=ingredients.map(({name})=>name);
    const IngredientsAmountByRecipes=ingredients.map(({amount})=>amount);
    <div>{IngredientsNameByRecipes && IngredientsNameByRecipes.map(item=><li key={{item}}>{item}</li>)}<div>*/
    function IngredientsByRecipe(item){
        return[item.name,item.amount,"g "].join("\n");
    };
    return (
        <Box sx={{ height:100,flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>
                        <div>
                            <RecipePhoto/>
                        </div>
                        <div>
                            <h1 align="left">{recipe.recipeName}</h1>
                        </div>

                        <div>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Item><FaceIcon/> Created by {user.username}{recipe.authorId}</Item>
                                <Item><AccessAlarmsIcon/> Time:{recipe.timeConsumed} minutes</Item>
                                <Item><PaidIcon/> Price:chf {recipe.cost}</Item>
                                <Item><GroupIcon/> Portion:{recipe.portion}</Item>
                                <Item><FoodBankIcon/> Cuisine:{recipe.cuisine}</Item>
                            </Grid>
                            <h3 align="left">{recipe.content}</h3>
                        </div>

                    </Item>
                </Grid>
                <Grid item xs >
                    <Item1>
                        <h2>Ingredient</h2>
                        <div> {ingredients.map(IngredientsByRecipe)}</div>
                    </Item1>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Recipe;