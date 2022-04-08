import {useEffect, useState} from 'react';
import React from "react";
import "styles/views/Recipe.scss";
import EditFormField from "../FormField/EditFormField";
import TextFormField from "../FormField/TextFormField";
import {Button} from "../ui/Button";
import {api, handleError} from "../../helpers/api";
import BasicSlider from "../FormField/BasicSlider";
import {Autocomplete, Input, TextField} from "@mui/material";
import CuisineOptions from "../FormField/CuisineOptions";


// const fakePostData = {
//     "authorId": 1,
//     "recipeName": "TestRecipeName",
//     "cuisine": "Chinese",
//     "cost": 30,
//     "ingredients": [
//         {name: "ingredient_1", amount: 1},
//         {name: "ingredient_2", amount: 2}
//     ],
//     "content": "testContent",
//     "timeConsumed": 30
//
// }


const RecipeCreation = (props) => {
    const authorId = localStorage.getItem("id");
    const [recipeName, setRecipeName] = useState(null);
    const [cuisine, setCuisine] = useState(null);
    const [timeConsumed, setTimeConsumed] = useState(50);
    const [cost, setCost] = useState(50);
    const [content, setContent] = useState(null);
    const [ingredients, setIngredients] = useState(
        [{name: "", amount: 0}]
    );

    const doCancel = () => {
        window.location.href = `/home`;
    }

    const doSubmit = async () => {
        try {
            const requestBody = JSON.stringify({authorId, recipeName, cuisine, timeConsumed, cost, ingredients, content});
            console.log(requestBody);
            // await api.post(`/recipes`, requestBody);

            // submit successfully worked --> navigate to this recipe
            // TODO !!!

        } catch (error) {
            alert(`Something went wrong during the edit: \n${handleError(error)}`);
        }
    };


    function handleIngredientChange(event) {
        //grab the index and the input type
        let idx = parseInt(event.target.id.split("-")[2]);
        let inputType = event.target.id.split("-")[1];
        if (inputType === "name") {
            // only modify one element
            const newIngredients = ingredients.map((ingredient, index) => {
                // check if we are at the index that we want
                if (idx !== index) {
                    // if it's not the element we want to change we just return the element
                    return ingredient;
                }
                // modify the specific ingredient
                return {...ingredient, name: event.target.value}
            });
            setIngredients(newIngredients);

        } else if (inputType === "amt") {
            const newIngredients = ingredients.map((ingredient, index) => {
                if (idx !== index) { return ingredient;}
                return {...ingredient, amount: Number(event.target.value)}
            });
            setIngredients(newIngredients);
        }
    }

    function handleIngredientRemove(event) {
        // To remove an element, we use array.filter function
        let idx = parseInt(event.target.id.split("-")[2]);
        let newIngredients = ingredients.filter((ingredient, index) => idx !== index);
        setIngredients(newIngredients);
    }

    function handleIngredientAdd(event) {
        // concatenate a new ingredient {name: "", amount: 0}
        let newIngredients = ingredients.concat({name: "", amount: 0});
        setIngredients(newIngredients);
    }

    return (
        <div className="recipe creation box">

            <div className="recipe creation column left">
                <h2>Create your recipe:</h2>
                <EditFormField
                    label="Recipe Name"
                    value={recipeName}
                    placeholder="enter Recipe Name..."
                    className="recipe creation field"
                    onChange={un => setRecipeName(un)}
                />

                <Autocomplete
                    className="recipe creation field"
                    value={cuisine}
                    onChange={(event, newValue) => {
                        setCuisine(newValue);
                    }}
                    options={CuisineOptions}
                    renderInput={(params) => <TextField {...params} label="Cuisine" />}
                />

                <p>timeConsumed:{timeConsumed}</p>
                <BasicSlider
                    value={timeConsumed}
                    onChange={(event, newValue) => setTimeConsumed(newValue)}
                />

                <p>cost: {cost}</p>
                <BasicSlider
                    value={cost}
                    onChange={(event, newValue) => setCost(newValue)}
                />

                <TextFormField
                    className="content"
                    label="Details"
                    placeholder="Recipe details step by step..."
                    row={5}
                    value={content}
                    onChange={un => setContent(un)}
                />

                <form>
                    {ingredients.map((ing, idx) => {
                        return (
                            <div key={idx}>
                                <Input
                                    id={"ing-name-" + idx}
                                    name={"ing-name-" + idx}
                                    variant="outlined"
                                    label="Ingredient Name"
                                    value={ing.name}
                                    required
                                    onChange={handleIngredientChange}
                                    inputProps={{
                                        type: 'text',
                                    }}
                                />
                                <Input
                                    id={"ing-amt-" + idx}
                                    name={"ing-amt-" + idx}
                                    value={ing.amount}
                                    size="small"
                                    onChange={handleIngredientChange}
                                    required
                                    inputProps={{
                                        step: 50,
                                        min: 0,
                                        max: 99999,
                                        type: 'number',
                                    }}
                                />
                                <Button
                                    id={"ing-remove-" + idx}
                                    variant="contained"
                                    color="secondary"
                                    type="button"
                                    onClick={handleIngredientRemove}
                                >-</Button>
                            </div>
                        )
                    })}

                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={handleIngredientAdd}
                    >+</Button>
                </form>



                <Button className="profile edit button-container"
                        disabled={!recipeName || !cuisine || !timeConsumed || !cost || !content ||!ingredients}
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