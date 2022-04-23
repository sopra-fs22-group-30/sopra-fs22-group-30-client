import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Home.scss";
import profile_photo from "../../profile_photo.svg";
import icon_post from "../../icon_post.svg";
import clock from "../../clock.svg";
import cuisine from "../../cuisine_tag.svg";
import food from "../../food.jpg";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'



const Recipe = ({recipe}) => {
    const redirectToProfile = (recipe) => {
        window.location.href = `/recipes/${recipe.recipeId}`;
    }
    return (
        <Link className="home recipe" to={`recipes/${recipe.recipeId}`} props={recipe} onClick={() => redirectToProfile.bind(this, recipe)}>
            <div className="home info_mask">
                <h2>
                    {recipe.recipeName}
                    {/*<Cuisine_tag/>*/}
                </h2>
                <div className = "home info_mask recipes_info">
                    <h3 className="home data">
                        <AccessTimeFilledIcon className="home icons"/>: {recipe.timeConsumed} mins&nbsp;&nbsp;&nbsp;
                        <PaidIcon className="home icons"/>: {recipe.cost} chf&nbsp;&nbsp;&nbsp;
                        <GroupsIcon className="home icons"/>: {recipe.portion} ppl
                    </h3>
                </div>
            </div>
            <Photo/>
        </Link>
    )


};

Recipe.propTypes = {
    recipe: PropTypes.object
};

const Party = ({party}) => {
    const redirectToProfile = (party) => {
        window.location.href = `/parties/${party.id}`;
    }
    return (
        <Link  to={`parties/${party.id}`} props={party} onClick={() => redirectToProfile.bind(this, party)}>
            <div className="home party">
                <h2>
                    {party.partyName}
                </h2>
                <div className="home party info">
                    <div className>
                        <AccessTimeFilledIcon className="home icons"/> Time:{party.time}
                    </div>
                    <div className>
                        <LocationOnIcon className="home icons"/> Place:{party.place}
                    </div>
                    <div className>
                        <GroupsIcon className="home icons"/> Number of Attendants: {party.partyAttendantsNum+1} ppl
                    </div>
                </div>
            </div>
        </Link>
    )

};

Party.propTypes = {
    party: PropTypes.object
};




const Photo = () => {
    return (
        <img src={food} className="home recipe_photo" alt="profile_photo"/>
    )
}


const Cuisine_tag = () => {
    return (
            <img src={cuisine} className="home cuisine_tag" alt="clock"/>
    )
}

const goPartyCreation = () => {
    window.location.href = `/parties-creation`;
}

const Home = () => {
    const history = useHistory();


    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [recipes, setRecipes] = useState(null);
    const [parties, setParties] = useState(null);


    useEffect(() => {
        async function fetchData(){
            try {
                const recipesResponse = await api.get('/recipes');
                const partiesResponse = await api.get('/parties');
                setRecipes(recipesResponse.data);
                setParties(partiesResponse.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the data: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the data! See the console for details.");
            }
        }
        fetchData();
    },[]);


    let recipePanel = <Spinner/>;
    let partyPanel = <Spinner/>;


    if(recipes) {
        recipePanel = (
            <Box className="home recipes_container"
                sx={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',columnGap: 2,rowGap: 2}}
                md={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',columnGap: 2,rowGap: 2}}
                xl={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',columnGap: 2,rowGap: 2}}
                  //spacing={{ xs: 2, md: 3 }}
                  //columns={{ sm: 12, md: 12, lg:12, xl:12}}
                >
                {recipes.map(recipe => (
                    <Grid item >
                        <Recipe recipe={recipe} key={recipe.recipeName}/>
                    </Grid>
                ))}
            </Box>
        );
    }
    if(parties) {
        partyPanel = (
            <div>
                <div>
                    {parties.map(party => (
                         <Party party={party} key={party.partyId}/>
                    ))}
                </div>
                <div className="home new" onClick={goPartyCreation}>
                    <img src={icon_post} className="home post_icon" alt="icon_post"/>
                    <div>New Party</div>
                </div>
            </div>
        );
    }

    return (
        <div className="home container">
            <div className="home panel left">
                <h2 className="home title">Recipes</h2>
                <div>
                    {recipePanel}
                </div>
            </div>
            <div className="home panel right">
                <h2 className="home title">Parties</h2>
                <div>
                    {partyPanel}
                </div>
            </div>
        </div>
    );
}

export default Home;
