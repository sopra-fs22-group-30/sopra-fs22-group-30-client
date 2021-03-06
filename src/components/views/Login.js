import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory, withRouter } from 'react-router-dom';
import {Button} from "../ui/Button";
import 'styles/views/Login.scss';
import 'styles/views/Profile.scss'
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/**
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
      <div className="login field">
        <label className="login label">
          {props.label}
        </label>
        <input
            className="login input"
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
      </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};

const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username,password});
      const response = await api.post('/users/checking', requestBody);
      console.log(response);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);

      // Login successfully worked --> navigate to the route /home in the HomeRouter
      window.location.href = `/home`;
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div>
            <h1>Welcome Back</h1>
            Login to your account
          </div>
          <FormField
              placeholder="Username"
              value={username}
              onChange={un => setUsername(un)}
          />

          <FormField
              placeholder="Password"
              type = "password"
              value={password}
              onChange={n => setPassword(n)}
          />

          <div>
            <Button
                className="login main-button-container"
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Sign in
            </Button>
          </div>

          <div className="login button-container">
            Don't have an account?
            <Link to={`/register`}>Sign up</Link>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
