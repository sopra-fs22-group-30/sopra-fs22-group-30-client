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




const Rec = ({recipe}) => {
    const redirectToProfile = (recipe) => {
        window.location.href = `/recipes/${recipe.recipeIdd}`;
    }
    return (
        <Link className="home recipe" to={`recipes/${recipe.recipeId}`} props={recipe} onClick={() => redirectToProfile.bind(this, recipe)}>
            <div className="home info_mask">
                <h2>
                    {recipe.recipeName}
                </h2>
                <div className = "home info_mask recipes_info">
                    <h3 className="home timeConsumed&Cost">
                        <Clock_tag/>  {recipe.timeConsumed}mins chf {recipe.cost}
                    </h3>
                </div>
                <Cuisine_tag/>
            </div>
            <Photo/>
        </Link>
    )


};

Rec.propTypes = {
    recipe: PropTypes.object
};

const Party = ({/* party */}) => {
    /*
    const redirectToProfile = (party) => {
        window.location.href = `/parties/${party.id}`;
    }
    */
    return (
        <div className="home party">
            <h3>
                01.04.2022 18:00
            </h3>
            <h2>
                Alice birthday party
            </h2>
        </div>
        /*
        <div className="party container" key={party.id}>
            <Link className="party name" to={`parties/${party.id}`} props={party} onClick={() => redirectToProfile.bind(this, party)}>
                {party.name}
            </Link>
            <div className="party id">id: {party.id}</div>
        </div>

         */
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

const Clock_tag = () => {
    return (
        <img src={clock} className="home clock" alt="clock"/>
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
    //const [parties, setParties] = useState();



    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html



    useEffect(() => {
        async function fetchData(){
            try {
                console.log("1");
                const recipesResponse = await api.get('/recipes');
                const partiesResponse = await api.get('/parties');
                setRecipes(recipesResponse.data);
                console.log(1);
                console.log(recipesResponse);
                console.log(recipes);

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
            <div className="home recipes_container">
                {recipes.map(recipe => (
                    <Rec recipe={recipe} key={recipe.recipeName}/>
                ))}
            </div>
        );
    }
    if(recipes) {
        partyPanel = (
            <div>
                <Party/>
                <Party/>
                <Party/>
                <div className="home new" onClick={goPartyCreation}>
                    <img src={icon_post} className="home post_icon" alt="icon_post"/>
                    <span>New Party</span>
                </div>
                {
                    /*
                     parties.map(party => (
                        <Party party={party} key={party.id}/>
                    ))
                    */
                }
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
            <span className="home line"></span>
            <div className="home panel right">
                <h2 className="home title">Parties</h2>
                {partyPanel}
            </div>
        </div>
    );
}

export default Home;
