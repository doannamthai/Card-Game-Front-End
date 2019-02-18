import Welcome from '../Layouts/Welcome/Welcome.js';
import Login from '../Layouts/Login/Login.js';
import Dashboard from '../Layouts/Dashboard/Dashboard.js';
import Register from '../Layouts/Register/Register.js';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import Authentication from '../Utils/Authentication';
import AdminDashboard from '../Layouts/Admin/AdminDashboard.js';
import Store from '../Layouts/Store/Store';

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
            authed: Authentication.isAuthed(),
            loggedIn:  Authentication.isLoggedIn(),
        }
    }

    render(){
        return (
        <Router>
            <div>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/store" component={Store}/>
                <UnLoggedInRoute loggedIn = {this.state.loggedIn} path="/register" component={Register} />
                <UnLoggedInRoute  loggedIn = {this.state.loggedIn} path="/login" component={Login} />
                
                {/*<Route exact loggedIn = {this.state.loggedIn} path="/" component={Welcome} />*/}
                <PrivateRoute exact authed = {this.state.authed} path="/admin" component={AdminDashboard}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/members" component={Welcome}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/games" component={AdminDashboard}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/cards" component={AdminDashboard}/>

            </div>
        </Router>
        );
    }
}

export default RouterCheck;
    