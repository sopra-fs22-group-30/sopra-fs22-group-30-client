import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Home.scss";
import icon_post from "../../icon_post.svg";
import clock from "../../clock.svg";
import cuisine from "../../cuisine_tag.svg";
import food from "../../food.jpg";
import UserLikedRecipeOptions from "../FormField/UserLikesRecipeOptions";

const Photo = () => {
    return (
        <img src={food} className="myLikes recipe_photo" alt="profile_photo"/>
    )
}

const Clock_tag = () => {
    return (
        <img src={clock} className="myLikes clock" alt="clock"/>
    )
}

const Cuisine_tag = () => {
    return (
        <img src={cuisine} className="myLikes cuisine_tag" alt="clock"/>
    )
}

const MyLikes = () => {
    const history = useHistory();
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try {
                const userId = localStorage.getItem("id");
                const recipesResponse = await api.get(`/users/${userId}`);

                // const recipes = recipesResponse.data.likeList.map(({recipeName,recipeId,timeConsumed,cost}) =>
                //     JSON.parse(JSON.stringify({
                //         recipeName,
                //         recipeId,
                //         timeConsumed,
                //         cost
                //     })))
                // setRecipes(recipes);

                setRecipes(recipesResponse.data.likeList)

                console.log(recipes)
            } catch (error) {
                alert("Something went wrong while fetching the data!");
            }
        }
        fetchData();
    },[]);

    const Recipe = ({recipe}) => {
        const redirectToDetailPage = (recipe) => {
            window.location.href = `/recipes/${recipe.recipeId}`;
        }

        return (
            <link className="myLikes recipe" to={`recipes/${recipe.recipeId}`} props={recipe}
                  onClick={() => redirectToDetailPage.bind(this, recipe)}>
                <div className="myLikes info_mask">
                    <h2>
                        {recipe.recipeName}
                    </h2>
                    <div className="myLikes info_mask recipes_info">
                        <h3 className="myLikes timeConsumed&Cost">
                            <Clock_tag/> {recipe.timeConsumed}mins chf {recipe.cost}
                        </h3>
                    </div>
                    <Cuisine_tag/>
                </div>
                <Photo/>
            </link>
        )
    };

    Recipe.propTypes = {
        recipe: PropTypes.object
    };

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
            <h2 className="myLikes title">Recipes</h2>
            <div>
                {recipePanel}
            </div>
        </div>
    );
}

export default MyLikes;