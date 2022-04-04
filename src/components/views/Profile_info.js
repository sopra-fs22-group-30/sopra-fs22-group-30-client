import React from "react";
import "styles/views/Profile.scss";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";


const Profile_info = ({match}) => {
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

    const goEdit = () => {
        history.push('/profile/edit');
    }
    const goBack = () => {
        history.push('/home');
    }

    return (
        <div className="profile column right">
            <h3><span className="line"></span> Attributes <span className="line"></span></h3>
            {/*basic info*/}
            <UserInfoUsername user={user}/>
            <UserInfoGender user={user}/>
            <UserInfoCreation user={user}/>
            <UserInfoBirthday user={user}/>
            <UserInfoIntro user={user}/>

            {/*EDIT & BACK button*/}
            <div className="admin-button container">
                {localStorage.getItem('id') === path.substring(path.lastIndexOf('/') + 1)
                    &&
                    <AdminButton label="EDIT" func={() => goEdit()}/>
                }
                <AdminButton label="BACK" func={() => goBack()}/>
            </div>

        </div>
    )
}

const UserInfoUsername = ({user}) => {
    return (
        <div className="userInfo container">
            <div className="userInfo label">Username:</div>
            {/*user.username*/}
            <div className="userInfo value">{user.username}</div>
        </div>
    );
};

const UserInfoGender = ({user}) => {
    return (
        <div className="userInfo container">
            <div className="userInfo label">Gender:</div>
            {/*user.gender*/}
            <div className="userInfo value">{user.gender}</div>
        </div>
    );
};

const UserInfoCreation = ({user}) => {
    // const swissDateFormat = convertDateToSwissDateFormat(user.creation_date.substring(0,10));
    return (
        <div className="userInfo container">
            <div className="userInfo label">Creation Date:</div>
            <div className="userInfo value">{user.creationDate}</div>
        </div>

    );
};

let defaultBirthday = "(optional)";
const UserInfoBirthday = ({user}) => {

    return (
        <div className="userInfo container">
            <div className="userInfo label"> Birth Date:</div>
            <div className="userInfo value">{user.birthday}</div>
        </div>

    );
};

const UserInfoIntro = ({user}) => {
    let defaultIntro = "Say something..."
    if (user.intro) {
        defaultIntro = user.intro;
    }
    return (
        <div className="userInfo container">
            <div className="userInfo value intro">{defaultIntro}</div>
        </div>
    );
};

const AdminButton = (props) => {
    return (
        <div className="admin-button item" onClick={props.func}>
            {props.label}
        </div>
    )
}


export default Profile_info;