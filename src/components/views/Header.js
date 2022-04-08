import React from "react";
import "styles/views/Header.scss";
import icon_post from 'icon_post.svg';
import {api, handleError} from "../../helpers/api";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Logo = props => (
    <div className="header logo">
        <p className="header logo text">
            <span className="header logo first-part">Cook</span>
            <span className="header logo last-part">ever</span>
        </p>
    </div>
)

const Navigate = props => {
    const goHome =() =>{
        let path = `/home`;
        window.location.href = path;
    }

    const goMyProfile =() =>{
        const myUserId = localStorage.getItem('id');
        window.location.href = `/users/${myUserId}`;
    }

    const goRecipeCreation =() =>{
        window.location.href = `/recipes/creation`;
    }

    const doLogout = async () => {
        try {
            // const userId = localStorage.getItem("id");
            // await api.put(`/users/checking/${userId}`);
            // remove all data in localStorage
            localStorage.clear();
            window.location.href = `/login`;
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <ul className="header navigate list">
            <li className="header navigate item" onClick={() => doLogout()} style={{border: "none"}}>Logout</li>
            <li className="header navigate item" onClick={() => goMyProfile()}>My Profile</li>
            <li className="header navigate item" onClick={() => goRecipeCreation()}>
                <img src={icon_post} className="header navigate post_icon" alt="icon_post" />
                <span>New Recipe</span>
            </li>
            <li className="header navigate item" onClick={() => goHome()}>Home</li>

        </ul>
    )
}


const Header = props => (
    <div className="header container">
        <Logo/>
        <Navigate/>
    </div>
);


/**
 * Don't forget to export your component!
 */
export default Header;
