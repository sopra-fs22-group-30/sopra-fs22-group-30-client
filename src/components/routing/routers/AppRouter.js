import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {HomeGuard} from "components/routing/routeProtectors/HomeGuard";
import HomeRouter from "components/routing/routers/HomeRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Register from "../../views/Register";
import Profile from "components/views/Profile";
import ProfileEdit from "../../views/Profile_edit";
import Recipe from "../../views/Recipe";
import RecipeCreationOrEdit from "../../views/Recipe_creation_or_edit";
import Party from "../../views/Party";
import MyLikes from "components/views/MyLikes";
import PartyCreationOrEdit from "../../views/Party_creation_or_edit";
import Notification from "../../views/Notification";
import React from "react";
import {useStompClient} from "react-stomp-hooks";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/home".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /home renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    const stompClient = useStompClient();
    return (
        <BrowserRouter>
            <Notification />
            <Switch>
                {/*just for test /profile, need change it to /users/:id */}
                <Route exact path="/users/:id">
                    <HomeGuard>
                        <Profile/>
                    </HomeGuard>
                </Route>

                <Route exact path="/profile/edit">
                    <HomeGuard>
                        <ProfileEdit/>
                    </HomeGuard>
                </Route>

                <Route path="/recipes/:id">
                    <HomeGuard>
                        <Recipe/>
                    </HomeGuard>
                </Route>

                <Route exact path="/users/likes/:id">
                    <HomeGuard>
                        <MyLikes/>
                    </HomeGuard>
                </Route>

                <Route exact path="/recipes-creation">
                    <HomeGuard>
                        <RecipeCreationOrEdit isCreation = {true} client={stompClient}/>
                    </HomeGuard>
                </Route>

                <Route path="/recipes-edit/:recipeId">
                    <HomeGuard>
                        <RecipeCreationOrEdit isCreation = {false}/>
                    </HomeGuard>
                </Route>

                <Route path="/parties/:id">
                    <HomeGuard>
                        <Party/>
                    </HomeGuard>
                </Route>

                <Route exact path="/parties-creation">
                    <HomeGuard>
                        <PartyCreationOrEdit isCreation = {true} client={stompClient}/>
                    </HomeGuard>
                </Route>

                <Route path="/parties-edit/:partyId">
                    <HomeGuard>
                        <PartyCreationOrEdit isCreation = {false} client={stompClient}/>
                    </HomeGuard>
                </Route>

                <Route path="/home">
                    <HomeGuard>
                        <HomeRouter base="/home"/>
                    </HomeGuard>
                </Route>
                <Route exact path="/login">
                    <LoginGuard>
                        <Login/>
                    </LoginGuard>
                </Route>
                <Route exact path="/register">
                    <LoginGuard>
                        <Register/>
                    </LoginGuard>
                </Route>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;