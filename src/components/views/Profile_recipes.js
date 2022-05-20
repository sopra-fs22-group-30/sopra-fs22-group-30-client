import "styles/views/Profile.scss";
import profile_photo from 'profile_photo.svg';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import {Image, Transformation} from 'cloudinary-react';
import {AdvancedImage} from "@cloudinary/react";
import {CloudinaryImage} from "@cloudinary/url-gen";
import {fill, scale} from "@cloudinary/url-gen/actions/resize";
import {outline, cartoonify} from "@cloudinary/url-gen/actions/effect";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import {outer} from "@cloudinary/url-gen/qualifiers/outlineMode";


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
            profilePictureLocation:"",
        }
    );
    const [recipes,setRecipes]=useState([]);
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);
    const ID = localStorage.getItem('id');


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

    const Profilepicture=()=>{
        const imageUrl=user.profilePictureLocation
        if(imageUrl!=null){
            const rawimage=imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const userImage = new CloudinaryImage(rawimage,{cloudName:"dgnzmridn"});
            userImage.resize(fill().height(200).width(200)).roundCorners(max())
            return(
                <div>
                    <AdvancedImage cldImg={userImage}/>
                </div>
            )
        }else{
            const fakeimageUrl="https://res.cloudinary.com/dgnzmridn/image/upload/v1653055086/n9miv50ifxgpwgshy09w.jpg"
            const rawimage=fakeimageUrl.substring(fakeimageUrl.lastIndexOf('/') + 1);
            const userImage = new CloudinaryImage(rawimage,{cloudName:"dgnzmridn"});
            userImage.resize(fill().height(200).width(200)).roundCorners(max())
            return(
                <div>
                    <AdvancedImage cldImg={userImage}/>
                </div>
            )
        }
    }

    const Recipe = (props) => {
        if(ID==userID){
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
        }else{
            return (
                <div className="profile recipe container">
                    <div id={"recipe-name-" + props.id} className="profile recipe recipe-name" onClick={handleOnClickRecipeName}>
                        {props.recipeName}
                    </div>
                </div>
            )
        }

    }


    return (
        <div className="profile column left">
            <Profilepicture/>
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