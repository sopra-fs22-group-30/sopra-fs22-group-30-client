import React, {useState} from "react";
import "styles/views/Profile.scss";
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {api, handleError} from "../../helpers/api";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import PaidIcon from '@mui/icons-material/Paid';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import GroupIcon from '@mui/icons-material/Group';
import "styles/views/Party.scss"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {pink, red} from "@mui/material/colors";
import {Image} from 'cloudinary-react';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



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
            pictureLocation:"",
        }
    );

    const [ingredients, setIngredients] = useState(
        [{name: "", amount: 0}]
    );

    const [user, setUsers] = useState({
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
                setIngredients(response.data.ingredients);


                const authorID=response.data.authorId
                const response2 = await api.get('/users/' + authorID);
                setUsers(response2.data);


            } catch (error) {
                console.error(`Something went wrong while fetching the recipe: \n${handleError(error)}`);
                console.error("Details:", error);
                alert(`There is no recipe or it has been deleted: \n${handleError(error)}`);
            }
        }

        fetchData();
    }, [])


    useEffect(() => {
        async function fetchData2() {
            try {
                const userId = localStorage.getItem("id");
                const response3 = await api.get(`/users/${userId}/recipes/${recipeID}/likes`);
                setLikes(response3.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the liked recipes: \n${handleError(error)}`);
            }
        }
        fetchData2();
    },[]);

    const authorID = recipe.authorId;
    function handleOnClickAuthorProfile(e) {
        window.location.href = `/users/${authorID}`;
    }

    let likeButton;

    if (likes === true) {
        likeButton = (
            <FavoriteOutlinedIcon
                sx={{ color: pink[500] }}
                onClick={() => doLike()}
            >
            </FavoriteOutlinedIcon>
        )
    } else {
        likeButton = (
            <FavoriteBorderOutlinedIcon
                sx={{ color: pink[500] }}
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

    const IngredientTable = (props) => {

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200, backgroundColor:"#fff7e5"}} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Amount(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map((item,index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': { border: 0 }} }
                            >
                                <TableCell component="th" scope="row" >
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
            alert(`Something went wrong during do like: \n${handleError(error)}`);
        }
    };

    return (
        <div className="party detail box">
            <div className="party detail left column">
                <div className="display-pic">
                    <Image style={{maxHeight:300,maxWidth:700}}cloudName="dgnzmridn" publicId={recipe.pictureLocation}/>
                </div>

                <div className="recipe creation title container">
                    <div className="recipe creation title" align="left">
                        {recipe.recipeName}
                    </div>

                    <div className="recipe creation author"
                         onClick={handleOnClickAuthorProfile} align="right">
                         Author:{user.username}
                    </div>

                    <div align="right" className="likeIcon">
                        {likeButton}
                    </div>
                </div>
                <div>
                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <AccessAlarmsIcon className="party detail info-icon"/>
                            Time:
                        </div>
                        <div className="party detail info-value">{recipe.timeConsumed} minutes</div>
                    </div>

                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <PaidIcon className="party detail info-icon"/>
                            Price:
                        </div>
                        <div className="party detail info-value">{recipe.cost} CHF</div>
                    </div>

                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <GroupIcon className="party detail info-icon"/>
                            Portion:
                        </div>
                        <div className="party detail info-value text">{recipe.portion}</div>
                    </div>
                    <div className="party detail info-container">
                        <div className="party detail info-label">
                            <FoodBankIcon className="party detail info-icon"/>
                            Cuisine:
                        </div>
                        <div className="party detail info-value">{recipe.cuisine}</div>
                    </div>
                    </div>
                <div className="party detail display-content-container">
                    <div>{recipe.content}</div>
                </div>
            </div>
            <div className="party detail right column">
                <div>
                    <h2 align='center'>Ingredients</h2>
                    <div>
                        <IngredientTable/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recipe;