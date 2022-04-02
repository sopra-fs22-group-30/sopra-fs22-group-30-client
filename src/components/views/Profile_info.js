import "styles/views/Profile.scss";



const UserInfoUsername = ({user}) => {
    return (
        <div className="userInfo container">
            <div className="userInfo label">Username:</div>
            {/*user.username*/}
            <div className="userInfo value">#520</div>
        </div>
    );
};

const UserInfoGender = ({user}) => {
    return (
        <div className="userInfo container">
            <div className="userInfo label">Gender:</div>
            {/*user.gender*/}
            <div className="userInfo value">Female</div>
        </div>
    );
};

const UserInfoCreation = ({user}) => {
    // const swissDateFormat = convertDateToSwissDateFormat(user.creation_date.substring(0,10));
    return (
        <div className="userInfo container">
            <div className="userInfo label">Creation Date:</div>
            <div className="userInfo value">31.01.2022</div>
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
            <div className="userInfo value">01.01.1998</div>
        </div>

    );
};

const UserInfoIntro = ({user}) => {
    const fakeIntro = "GitHub is a web-based version-control and collaboration platform for software developers. Microsoft, the biggest single contributor to GitHub, initiated an acquisition of GitHub for $7.5 billion in June, 2018. GitHub, which is delivered through a software-as-a-service (SaaS) business model, was started in 2008 and was founded on Git, an open source code management system created by Linus Torvalds to make software builds faster."
    return (
        <div className="userInfo container">
            <div className="userInfo value">{fakeIntro}</div>
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

const Profile_info = (props) => {
    return(
        <div className="profile column right">
            <h3><span className="line"></span> Attributes <span className="line"></span></h3>
            {/*basic info*/}
            <UserInfoUsername/>
            <UserInfoGender/>
            <UserInfoCreation/>
            <UserInfoBirthday/>
            <UserInfoIntro/>

            {/*EDIT & BACK button*/}
            <div className="admin-button container">
                <AdminButton label="EDIT"/>
                <AdminButton label="BACK"/>
            </div>

        </div>
    )
}











export default Profile_info;