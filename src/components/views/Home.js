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




const Recipe = ({/* recipe */}) => {
    /*
    const redirectToProfile = (recipe) => {
        window.location.href = `/recipes/${recipe.id}`;
    }*/

    return (
        <div className="home recipe">
            <div className="home info_mask">
                <h2>
                    April Fool's Recipe
                </h2>
                <div className = "home recipes_info">
                    <h3 className="home timeConsumed&Cost">
                        <Clock_tag/> 30min chf30
                        {/*timeConsumed*/}
                    </h3>
                </div>
                <Cuisine_tag/>
            </div>
            <Photo/>
        </div>
    /*
        <div className="player container" key={recipe.id}>
            <Link className="player username" to={`recipes/${recipe.id}`} props={recipe} onClick={() => redirectToProfile.bind(this, recipe)}>
                {recipe.name}
            </Link>
            <div className="player id">id: {recipe.id}</div>
        </div>

     */
    )


};

Recipe.propTypes = {
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
        <img src={profile_photo} className="home recipe_photo" alt="profile_photo"/>
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

const Home = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [recipes, setRecipes] = useState(null);
    const [parties, setParties] = useState(null);

    const logout = async () => {
        // localStorage.removeItem('token');
        // history.push('/login');
        // try {
        //     const requestBody = localStorage.getItem('id');
        //     await api.put(`/users/checking/{id}`, requestBody);
        // } catch (error) {
        //     alert(`Logout Fail \n${handleError(error)}`);
        // }
    }

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    /*
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
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

    }, []);
    */

    let recipePanel = <Spinner/>;
    let partyPanel = <Spinner/>;



    recipePanel = (
        <div className="home recipes_container">
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
            {/*
            recipes.map(recipe => (
                <Recipe recipe={recipe} key={recipe.id}/>
            ))
            */}
        </div>
    );

    const goPartyCreation = () => {
        window.location.href = `/parties-creation`;
    }

    partyPanel = (
         <div>
             <Party/>
             <Party/>
             <Party/>
             <div className="home new" onClick={goPartyCreation}>
                 <img src={icon_post} className="home post_icon" alt="icon_post" />
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


    return (
        <div className="home container">
            <div className="home panel left">
                <h2 className="home title">Recipes</h2>
                {recipePanel}
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
