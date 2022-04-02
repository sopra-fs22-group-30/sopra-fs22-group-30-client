import {useEffect, useState} from 'react';

import "styles/views/Profile.scss";
import Profile_info from 'components/views/Profile_info';
import Profile_recipes from 'components/views/Profile_recipes';


// two columns view
const Profile = (props) => {
    return(
        <div className="profile container">
            <Profile_recipes/>
            <Profile_info/>
        </div>
    )
}







export default Profile;