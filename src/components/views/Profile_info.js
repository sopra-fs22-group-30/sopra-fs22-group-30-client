import React from "react";
import "styles/views/Profile.scss";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";



const Profile_info = ({match}) => {
    const history = useHistory();
    const [user, setUsers]=useState({
            id:"",
            username:"",
            gender:null,
            creationDate:"",
            birthday:"",
            intro:"",
        }
    );
    const path=window.location.pathname;
    const userID=path.substring(path.lastIndexOf('/')+1);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                //const response = await api.get('/users/'+match.params.id);
                const response = await api.get('/users/'+userID);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUsers(response.data);
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);
    return(
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
                <AdminButton label="EDIT"/>
                <AdminButton label="BACK"/>
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

    // if the user has not set his/her birthday, it will show defaultBirthday.
    // Otherwise, show the existing birthday
    // if (user.birthday != null){
    //     defaultBirthday = convertDateToSwissDateFormat(user.birthday.substring(0,10));
    // }
    return (
        <div className="userInfo container">
            <div className="userInfo label"> Birth Date:</div>
            <div className="userInfo value">{user.birthday}</div>
        </div>

    );
};

const UserInfoIntro = ({user}) => {
    const fakeIntro = "GitHub is a web-based version-control and collaboration platform for software developers. Microsoft, the biggest single contributor to GitHub, initiated an acquisition of GitHub for $7.5 billion in June, 2018. GitHub, which is delivered through a software-as-a-service (SaaS) business model, was started in 2008 and was founded on Git, an open source code management system created by Linus Torvalds to make software builds faster."
    return (
        <div className="userInfo container">
            <div className="userInfo value">{user.intro}</div>
        </div>

    );
};

const AdminButton = ({label}) => {
    return (
        <div className="admin-button item">
            {label}
        </div>
    )
}













export default Profile_info;