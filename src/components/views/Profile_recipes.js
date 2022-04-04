import "styles/views/Profile.scss";
import profile_photo from 'profile_photo.svg';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";


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
        <div className="myLikes-button">My Likes</div>
    )
}

const ProfileRecipeButton = ({label}) => {
    return (
        <div className="recipe button item">
            {label}
        </div>
    )
}

const Recipe = (props) => {
    const path = window.location.pathname;
    return (
        <div className="recipe container">
            <div className="recipe recipe-name">Fake User Recipe</div>
            {localStorage.getItem('id') === path.substring(path.lastIndexOf('/') + 1)
                &&
                <div className="recipe button container">
                    <ProfileRecipeButton label="EDIT"/>
                    <ProfileRecipeButton label="DELETE"/>
                </div>
            }
        </div>
    )
}

const UserRecipes = (props) => {
    return (
        <div className="recipe box">
            <Recipe/>
            <Recipe/>
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
    const path = window.location.pathname;
    const userID = path.substring(path.lastIndexOf('/') + 1);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                //const response = await api.get('/users/'+match.params.id);
                const response = await api.get('/users/' + userID);
                setUsers(response.data);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="profile column left">
            <Photo/>
            <Username user={user}/>
            <MyLikesButton/>
            <h3><span className="line"></span> My Recipes <span className="line"></span></h3>
            <UserRecipes/>
        </div>
    )

}


export default Profile_recipes;