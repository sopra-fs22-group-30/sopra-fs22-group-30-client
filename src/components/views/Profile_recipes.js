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


const Profile_recipes = (props) => {
    return (
        <div className="profile column left">
            <Photo/>
            <Username/>
            <MyLikesButton/>
            <h3><span className="line"></span> My Recipes <span className="line"></span></h3>
        </div>
    )

}


export default Profile_recipes;