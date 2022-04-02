import "styles/views/Profile.scss";
import profile_photo from 'profile_photo.svg';


const Photo = () => {
    return (
        <img src={profile_photo} className="profile photo" alt="profile_photo"/>
    )
}

const Username = () => {
    return (
        <h2>fakeUsername</h2>
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
    return (
        <div className="recipe container">
            <div className="recipe recipe-name">Fake User Recipe</div>
            <div className="recipe button container">
                <ProfileRecipeButton label="EDIT"/>
                <ProfileRecipeButton label="DELETE"/>
            </div>
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
    return (
        <div className="profile column left">
            <Photo/>
            <Username/>
            <MyLikesButton/>
            <h3><span className="line"></span> My Recipes <span className="line"></span></h3>
            <UserRecipes/>
        </div>
    )

}


export default Profile_recipes;