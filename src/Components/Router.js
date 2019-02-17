import Welcome from '../Layouts/Welcome/Welcome.js';
import Login from '../Layouts/Login/Login.js';
import Dashboard from '../Layouts/Dashboard/Dashboard.js';
import Register from '../Layouts/Register/Register.js';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import React, {Component} from 'react';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
}

function UnLoggedInRoute ({component: Component, loggedIn, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => loggedIn === false
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
}

class RouterCheck extends Component{
    constructor(props){
        super(props);
        this.state = {
            authed: false,
            loggedIn: false,
        }
    }

    render(){
        return (
        <Router>
            <div>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <UnLoggedInRoute exact loggedIn = {this.state.loggedIn} path="/register" component={Register} />
                <UnLoggedInRoute exact loggedIn = {this.state.loggedIn} path="/login" component={Login} />
                <Route exact path="/welcome" component={Welcome}/>
                <PrivateRoute exact  authed = {this.state.authed} path="/admin" component={Welcome}/>
            </Switch>
            </div>
        </Router>
        );
    }
}

export default RouterCheck;
    