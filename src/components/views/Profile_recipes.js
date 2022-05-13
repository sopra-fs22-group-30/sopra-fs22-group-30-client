import "styles/views/Profile.scss";
import profile_photo from 'profile_photo.svg';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Stack from '@mui/material/Stack';


const Photo = () => {
    return (
        <img src={profile_photo} className="profile photo" alt="profile_photo"/>
    )
}

const Username = ({user}) => {
    return (
        <h2>{user.username}</h2>
    )
}

const MyLikesButton = (props) => {
    return (
        <div className="myLikes-button"
             onClick={props.onClick}
        >My Likes</div>
    )
}

const ProfileRecipeButton = (props) => {
    return (
        <div id={props.id}
             className="profile recipe button item"
             onClick={props.onClick}
        >
            {props.label}
        </div>
    )
}


const Profile_recipes = (props) => {
    const history = useHistory();
    const [user, setUsers] = useState({
            id: "",
            username: "",
            gender: null,
            creationDate: "",
            birthday: "",
            intro: "",
        }
    );
    const [recipes,setRecipes]=useState([]);
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                //const response = await api.get('/users/'+match.params.id);
                const response = await api.get('/users/' + userID);
                setUsers(response.data);
                setRecipes(response.data.recipes);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    function handleOnClickRecipeName(e) {
        const recipeId = parseInt(e.target.id.split("-")[2]);
        window.location.href = `/recipes/${recipeId}`;
    }

    function handleOnClickRecipeEdit(e) {
        const recipeId = parseInt(e.target.id.split("-")[2]);
        window.location.href = `/recipes-edit/${recipeId}`;
    }

    function handleOnClickRecipeDelete(e) {
        const authorId = localStorage.getItem("id");
        const recipeId = parseInt(e.target.id.split("-")[2]);

        const RecipeDelete=async ()=>{
            const requestBody = JSON.stringify({
                authorId,
                recipeId,
            });
            await api.delete(`/users/${authorId}/recipes/${recipeId}`, requestBody);
            window.location.href = `/users/${authorId}`;
        }
        RecipeDelete();
    }

    function redirectToMyLikes (e) {
        const userId = localStorage.getItem("id");
        window.location.href = `/users/likes/${userId}`;
    }

    const Recipe = (props) => {
        return (
            <div className="profile recipe container">
                <div id={"recipe-name-" + props.id} className="profile recipe recipe-name" onClick={handleOnClickRecipeName}>
                    {props.recipeName}
                </div>
                <div className="profile recipe button container">
                    <ProfileRecipeButton id={"recipe-edit-" + props.id}
                                         label="EDIT"
                                         onClick={handleOnClickRecipeEdit}
                    />
                    <ProfileRecipeButton id={"recipe-delete-" + props.id}
                                         label="DELETE"
                                         onClick={handleOnClickRecipeDelete}/>
                </div>
            </div>
        )
    }


    return (
        <div className="profile column left">
            <Photo/>
            <Username user={user}/>
            <MyLikesButton
                onClick={redirectToMyLikes}
            />
            <h3><span className="line"></span> My Recipes <span className="line"></span></h3>
            <div className="profile recipe box">
                {recipes && recipes.map((recipe,index) => {
                    return (
                        <Recipe
                            id={recipe.recipeId}
                            key={recipe.recipeId}
                            recipeName={recipe.recipeName}
                        />
                    )
                })}
            </div>
        </div>
    )

}


export default Profile_recipes;