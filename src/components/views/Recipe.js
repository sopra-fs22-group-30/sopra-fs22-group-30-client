import React, {useState} from "react";
import ReactDOM from "react-dom";
import "styles/views/Profile.scss";
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import food from 'food.jpg';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {api, handleError} from "../../helpers/api";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import PaidIcon from '@mui/icons-material/Paid';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import GroupIcon from '@mui/icons-material/Group';
import "styles/views/Party.scss"
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Stack from "@mui/material/Stack";
import {Button} from "../ui/Button";
import User from "../../models/User";
import {Spinner} from "../ui/Spinner";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Item1 = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
}));

const RecipePhoto = () => {
    return (
        <img src={food} className="food" alt="food"/>
    )
}

const Recipe = () => {

    const [recipe, setRecipes] = useState({
            recipeId: "",
            recipeName: "",
            authorId: "",
            cost: "",
            timeConsumed: "",
            content: "",
            portion: "",
            ingredients: "",
            cuisine: "",
        }
    );

    const [ingredients, setIngredients] = useState(
        [{name: "", amount: 0}]
    );

    const [user, setUsers] = useState({
            id: "",
            username: "",
        }
    );

    const [likes, setLikes] = useState(null);

    const path = window.location.pathname;
    const recipeID = path.substring(path.lastIndexOf('/') + 1);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/recipes/' + recipeID);
                setRecipes(response.data);

                const response2 = await api.get('/users/' + recipe.authorId);
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
    const authorID = recipe.authorId;
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData1() {
            try {
                const response2 = await api.get('/users/' + authorID);
                setUsers(response2.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData1();
    }, []);

    useEffect(() => {
        async function fetchData2() {
            try {
                const userId = localStorage.getItem("id");
                const response3 = await api.get(`/users/${userId}/recipes/${recipeID}/likes`);
                setLikes(response3.data);
                console.log(likes);
            } catch (error) {
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData2();
    },[]);

    function handleOnClickAuthorProfile(e) {
        window.location.href = `/users/${authorID}`;
    }

    let likeButton

    console.log(likes);

    if (likes === true) {
        likeButton = (
            <FavoriteOutlinedIcon
                onClick={() => doLike()}
            >
            </FavoriteOutlinedIcon>
        )
    } else {
        likeButton = (
            <FavoriteBorderOutlinedIcon
                onClick={() => doLike()}
            >
            </FavoriteBorderOutlinedIcon>
        )
    }

    const Ingredient = (props) => {
        return (
            <div className="profile recipe container">
                <div>
                    {props.name} {props.amount}g
                </div>
            </div>
        )
    }

    const doLike = async () => {
        const userId = localStorage.getItem("id");
        const path = window.location.pathname;
        const recipeID = path.substring(path.lastIndexOf('/') + 1);

        try {
            const response = await api.post(`/users/${userId}/recipes/${recipeID}/likes`);
            setLikes(response.data);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <div className="party detail box">
            <div className="party detail left column">
                <div>
                    {likeButton}
                </div>
                <RecipePhoto/>
                <div>
                    <h1 align="left">{recipe.recipeName} Created by <span
                        onClick={handleOnClickAuthorProfile}>{user.username}</span></h1>
                </div>

                <div>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Item><AccessAlarmsIcon/> Time:{recipe.timeConsumed} minutes</Item>
                        <Item><PaidIcon/> Price:chf {recipe.cost}</Item>
                        <Item><GroupIcon/> Portion:{recipe.portion}</Item>
                        <Item><FoodBankIcon/> Cuisine:{recipe.cuisine}</Item>
                    </Grid>
                    <h3 align="left">{recipe.content}</h3>
                </div>


            </div>
            <div className="party detail right column">
                <div>
                    <h2 align='center'>Ingredients</h2>
                    <div>
                        {ingredients && ingredients.map((ingredient, index) => {
                            return (<Ingredient
                                key={ingredient.name}
                                name={ingredient.name}
                                amount={ingredient.amount}
                            />)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recipe;