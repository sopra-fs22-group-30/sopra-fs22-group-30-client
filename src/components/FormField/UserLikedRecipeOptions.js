// since a user can import a recipe from his liked recipe list,
// this function will get all his liked recipes
// and decompose them into [{recipeName:"name1",recipeId:1},{recipeName:"name2",recipeId:2}].
// When you use this component, you should call it like this: UserLikedRecipeOptions()

import {useEffect, useState} from "react";
import {api} from "../../helpers/api";

const UserLikedRecipeOptions = () => {
    const [likedRecipes, setLikedRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem("id");
                const response = await api.get(`/users/${userId}`);
                const likedRecipes = response.data.likeList.map(({recipeName,recipeId}) =>
                    JSON.parse(JSON.stringify({
                        recipeName,
                        recipeId
                    })))
                setLikedRecipes(likedRecipes);
            } catch (error) {
                alert("Something went wrong while fetching the usernames!");
            }
        }

        fetchData();
    }, []);
    return (
        likedRecipes
    )
}


export default UserLikedRecipeOptions;