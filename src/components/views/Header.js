import React from "react";
import {ReactLogo} from "components/ui/ReactLogo";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import icon_post from 'icon_post.svg';

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

const Navigate = props => (
    <ul className="header navigate list">
        <li className="header navigate item" style={{border: "none"}}>Logout</li>
        <li className="header navigate item">My Profile</li>
        <li className="header navigate item">
            <img src={icon_post} className="header navigate post_icon" alt="icon_post" />
            <span>New Recipe</span>
        </li>
        <li className="header navigate item">Home</li>

    </ul>
)

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
