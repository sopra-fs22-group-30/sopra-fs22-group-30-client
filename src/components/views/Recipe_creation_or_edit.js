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
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import PaidIcon from '@mui/icons-material/Paid';
import GroupsIcon from '@mui/icons-material/Groups';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Axios from "axios";

const RecipeCreationOrEdit = ({isCreation}) => {
    const authorId = localStorage.getItem("id");
    const [recipeName, setRecipeName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [timeConsumed, setTimeConsumed] = useState(50);
    const [cost, setCost] = useState(50);
    const [content, setContent] = useState("");
    const [portion, setPortion] = useState(1);
    const [ingredients, setIngredients] = useState(
        [{name: "", amount: 0}]
    );
    const [pictureLocation,setPictureLocation]=useState("https://res.cloudinary.com/dgnzmridn/image/upload/v1650889351/xnqp6ymq1ro6rm82onbj.jpg");

    const [recipeId,setRecipeId] = useState(null);

    const [oldRecipe, setOldRecipe] = useState(null);
    const [image, setImage]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                if(!isCreation){
                    const path = window.location.pathname;
                    const recipeId = path.substring(path.lastIndexOf('/')+1)
                    setRecipeId(recipeId);
                    const response = await api.get(`/recipes/${recipeId}`);
                    const myRecipe = response.data;
                    setRecipeName(myRecipe.recipeName);
                    setCuisine(myRecipe.cuisine);
                    setTimeConsumed(myRecipe.timeConsumed);
                    setCost(myRecipe.cost);
                    setContent(myRecipe.content);
                    setPortion(myRecipe.portion);
                    setIngredients(myRecipe.ingredients);
                    setPictureLocation(myRecipe.pictureLocation);
                }

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the recipes! See the console for details.");
            }
        }
        fetchData();
    }, []);




    const doCancel = () => {
        window.location.href = `/home`;
    }

    const doSubmit = async () => {
        // we just need non-empty ingredients( name !== "" && amount > 0 )
        let filteredIngredients = ingredients.filter((ingredient) =>
            (ingredient.name !== "" && ingredient.amount > 0));
        setIngredients(filteredIngredients);

        try {
            const requestBody = JSON.stringify({
                authorId,
                recipeName,
                cuisine,
                timeConsumed,
                cost,
                portion,
                ingredients:filteredIngredients,
                content,
                pictureLocation,
            });

            if(recipeId){
                await api.put(`/users/${authorId}/recipes/${recipeId}`, requestBody);
                window.location.href = `/recipes/${recipeId}`;
            }else{
                const response = await api.post('/recipes', requestBody);
                window.location.href = `/recipes/${response.data.recipeId}`;
            }

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
                if (idx !== index) {
                    return ingredient;
                }
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

    function Picture_Upload(){
        const [ImageSelected, setImageSelected]=useState("");
        const UploadImage=()=>{
            const formData = new FormData;
            formData.append("file",ImageSelected);
            formData.append("upload_preset","kkluslzq");
            setLoading(true);

            Axios.post("https://api.cloudinary.com/v1_1/dgnzmridn/image/upload",formData
            ).then((response)=>{
                    //console.log(response)
                    //console.log(response.data['secure_url']);
                    let newPictureLocation=response.data['secure_url'].toString();
                    setPictureLocation(newPictureLocation);
                    setImage(newPictureLocation);
                    setLoading(false);
                    console.log({image});
                }
            )
        }
        return (
            <div align="center">
                <input type="file"
                       onChange={(event)=>{
                           setImageSelected(event.target.files[0]);
                       }
                }/>
                <div><button onClick={UploadImage}>Upload</button></div>
                <br/>
                <div>
                {loading? (<b>Loading</b>): <img src={image} className="display-image"/>}</div>
            </div>
        )

    }

    return (
        <div className="recipe creation box">

            <div className="recipe creation column">
                <h3><span className="line"></span> &nbsp; Standard &nbsp; <span className="line"></span></h3>
                <EditFormField
                    label="Recipe Name"
                    value={recipeName}
                    placeholder="enter Recipe Name..."
                    className="recipe creation container"
                    onChange={un => setRecipeName(un)}
                />

                <Autocomplete
                    className="recipe creation container"
                    value={cuisine}
                    onChange={(event, newValue) => {
                        setCuisine(newValue);
                    }}
                    options={CuisineOptions}
                    renderInput={(params) => <TextField {...params} label="Cuisine"/>}
                />


                <div className="recipe creation container">
                    <div className="slider-title">
                        <p className="slider-label"><AccessAlarmsIcon className="slider-icon"/>Time Consumed</p>
                        <p className="slider-value">{timeConsumed} min</p>
                    </div>

                    <BasicSlider
                        value={timeConsumed}
                        onChange={(event, newValue) => setTimeConsumed(newValue)}
                    />
                </div>

                <div className="recipe creation container">
                    <div className="slider-title">
                        <p className="slider-label"><PaidIcon className="slider-icon"/>Cost</p>
                        <p className="slider-value">$ {cost}</p>
                    </div>

                    <BasicSlider
                        value={cost}
                        onChange={(event, newValue) => setCost(newValue)}
                    />
                </div>

                <div className="recipe creation container">
                    <div className="slider-title">
                        <p className="slider-label"><GroupsIcon className="slider-icon"/>Portion</p>
                        <p className="slider-value">{portion} people</p>
                    </div>

                    <BasicSlider
                        value={portion}
                        min={1}
                        max={20}
                        onChange={(event, newValue) => setPortion(newValue)}
                    />
                </div>

                <TextFormField
                    className="recipe creation container"
                    label="Details"
                    placeholder="Recipe details step by step..."
                    row={7}
                    value={content}
                    onChange={un => setContent(un)}
                />
            </div>

            <div className="recipe creation column">
                <h3><span className="line"></span> Ingredients <span className="line"></span></h3>
                <div className="ingredient-header">
                    <div className="ingredient-header-item name">Ingredient Name</div>
                    <div className="ingredient-header-item amount">Amount(g)</div>
                    <div className="ingredient-header-item delete-icon"></div>
                </div>
                <form className="ingredient-form">
                    {ingredients.map((ing, idx) => {
                        return (
                            <div key={idx} className="ingredient-header">
                                <Input
                                    className="ingredient-header-item name child"
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
                                    className="ingredient-header-item amount child"
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
                                <HighlightOffIcon
                                    className="ingredient-header-item delete-icon child"
                                    id={"ing-remove-" + idx}
                                    onClick={handleIngredientRemove}
                                >-</HighlightOffIcon>
                            </div>
                        )
                    })}
                    <div className="ingredient-header" >
                        <AddCircleIcon
                            className="ingredient-add-icon"
                            onClick={handleIngredientAdd}
                        />
                    </div>

                </form>
            </div>
            <div className="recipe creation column">

                <h3><span className="line"></span> &nbsp;&nbsp; Picture &nbsp;&nbsp; <span className="line"></span></h3>
                <div className="upload-pic">
                    <Picture_Upload/>
                </div>
                <Button className="profile edit button-container"
                        disabled={!recipeName
                            || !cuisine
                            || !timeConsumed
                            || !cost
                            || !content
                            || ingredients.filter((ingredient) =>
                                (ingredient.name !== "" && ingredient.amount > 0)).length === 0}
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

export default RecipeCreationOrEdit ;