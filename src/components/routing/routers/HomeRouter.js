import {Redirect, Route} from "react-router-dom";
import Home from "components/views/Home";
import PropTypes from 'prop-types';

const HomeRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of HomeRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}`}>
        <Home/>
      </Route>
    </div>
  );
};
/*
* Don't forget to export your component!
 */

HomeRouter.propTypes = {
  base: PropTypes.string
}

export default HomeRouter;
