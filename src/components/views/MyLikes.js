import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from "prop-types";
import "styles/views/Home.scss";
import "styles/views/MyLikes.scss";
import icon_post from "../../icon_post.svg";
import clock from "../../clock.svg";
import cuisine from "../../cuisine_tag.svg";
import food from "../../food.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import GroupsIcon from "@mui/icons-material/Groups";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Recipe = ({recipe}) => {
    const redirectToDetailPage = (recipe) => {
        window.location.href = `/recipes/${recipe.recipeId}`;
    }

    return (
        <Link className="home recipe" to={`/recipes/${recipe.recipeId}`} props={recipe} onClick={() => redirectToDetailPage.bind(this, recipe)}>
            <div className="home info_mask">
                <h2>
                    {recipe.recipeName}
                </h2>
                <div className = "home info_mask recipes_info">
                    <h3 className="myLikes data">
                        <AccessTimeFilledIcon className="myLikes icons"/>: {recipe.timeConsumed} mins&nbsp;&nbsp;&nbsp;
                        <PaidIcon className="myLikes icons"/>: {recipe.cost} chf&nbsp;&nbsp;&nbsp;
                        <GroupsIcon className="myLikes icons"/>: {recipe.portion} ppl
                    </h3>
                </div>
            </div>
            <div className="home recipe recipe_pic">
                <img src={recipe.pictureLocation} className="home recipe_photo" alt="profile_photo"/>
            </div>
        </Link>
    )
};

Recipe.propTypes = {
    recipe: PropTypes.object
};

const MyLikes = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try {
                const userId = localStorage.getItem("id");
                const recipesResponse = await api.get(`/users/${userId}`);

                await setRecipes(recipesResponse.data.likeList)

                console.log(recipes)
            } catch (error) {
                alert("Something went wrong while fetching the data!");
            }
        }
        fetchData();
    },[]);

    let recipePanel = <Spinner/>;

    // recipes = UserLikedRecipeOptions()
    console.log(recipes)

    if(recipes) {
        recipePanel = (
            <div className="myLikes recipes_container">
                {recipes.map(recipe => (
                    <Recipe recipe={recipe} key={recipe.recipeName}/>
                ))}
            </div>
        );
    }

    return (
        <div className="myLikes container">
            <h2 className="myLikes title">My Liked Recipes</h2>
            <div>
                {recipePanel}
            </div>
        </div>
    );
}

export default MyLikes;