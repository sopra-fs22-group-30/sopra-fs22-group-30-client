import {useEffect, useState} from 'react';
import React from "react";
import "styles/views/Recipe.scss";
import EditFormField from "../FormField/EditFormField";
import TextFormField from "../FormField/TextFormField";
import {Button} from "../ui/Button";
import convertDateToJavaDateFormat from "../date/ToJavaDateFormat";
import {api, handleError} from "../../helpers/api";
import BasicSlider from "../FormField/BasicSlider";
import {Slider} from "@mui/material";

// {
//     "authorId": 1,
//     "recipeName":"TestRecipeName",
//     "cuisine":"Chinese",
//     "cost":30,
//     "ingredient":"TestIngredient",
//     "content":"testContent",
//     "timeConsumed":30
//
// }


const RecipeCreation = (props) => {
    const authorId = localStorage.getItem("id");
    const [recipeName, setRecipeName] = useState(null);
    const [cuisine, setCuisine] = useState(null);
    const [timeConsumed,setTimeConsumed] = useState(50);
    const [cost, setCost] = useState(50);
    const [ingredient,setIngredient] = useState(null);
    const [content,setContent] = useState(null);

    const doCancel = () => {
        window.location.href = `/home`;
    }

    const doSubmit = async () => {
        try {
            const requestBody = JSON.stringify({authorId, recipeName, cuisine,timeConsumed, cost, ingredient, content});
            await api.post(`/recipes`, requestBody);

            // submit successfully worked --> navigate to this recipe
            // TODO !!!


        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };

    // console.log(JSON.stringify({authorId, recipeName, cuisine,timeConsumed, cost, ingredient, content}))


    return (
        <div className="recipe creation box">
            <div className="recipe creation form">
                <h2>Create your recipe:</h2>
                <EditFormField
                    label="Recipe Name"
                    value={recipeName}
                    placeholder="enter Recipe Name..."
                    className="recipe creation field"
                    onChange={un => setRecipeName(un)}
                />
                <EditFormField
                    label="Cuisine"
                    value={cuisine}
                    placeholder="enter Cuisine..."
                    className="recipe creation field"
                    onChange={un => setCuisine(un)}
                />

                <h1>{timeConsumed}</h1>
                <BasicSlider
                    value={timeConsumed}
                    onChange={(event, newValue) => setTimeConsumed(newValue)}
                />
                <h1>{cost}</h1>
                <BasicSlider
                    value={cost}
                    onChange={(event, newValue) => setCost(newValue)}
                />

                <EditFormField
                    label="Ingredient"
                    value={ingredient}
                    placeholder="enter Ingredient..."
                    className="recipe creation field"
                    onChange={un => setIngredient(un)}
                />
                <TextFormField
                    className="content"
                    label="Details"
                    placeholder="Recipe details step by step..."
                    row={5}
                    value={content}
                    onChange={un => setContent(un)}
                />
                <Button className="profile edit button-container"
                        disabled={!recipeName || !cuisine || !timeConsumed || !cost || !ingredient || !content}
                        width="100%"
                        onClick={() => doSubmit()}
                >
                    Submit
                </Button>
                <Button className="profile edit button-container cancel"
                        width="100%"
                        onClick={() => doCancel()}
                >
                    Cancel
                </Button>


            </div>

        </div>
    )
}

export default RecipeCreation;