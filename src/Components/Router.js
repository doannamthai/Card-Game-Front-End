import Welcome from '../layouts/welcome/Welcome';
import Login from '../layouts/login/Login';
import Dashboard from '../layouts/dashboard/Dashboard';
import Register from '../layouts/register/Register';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import Authentication from '../utils/Authentication';
import AdminDashboard from '../layouts/admin/AdminDashboard';
import CardDashboard from '../layouts/admin/Cards';
import MissionDashboard from '../layouts/admin/Missions';
import Store from '../layouts/store/Store';
import Profile from '../layouts/profile/Profile';
import CardInfo from '../layouts/cardinfo/Card';
import MailBox from '../layouts/mailbox/Mailbox';
import Collection from '../layouts/collection/Collection';
import Mission from '../layouts/mission/Mission';

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

function LoggedInRoute ({component: Component, loggedIn, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => loggedIn === true
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
                <Route path="/card/:cardId" component={CardInfo}/>

                <UnLoggedInRoute loggedIn = {this.state.loggedIn} path="/register" component={Register} />
                <UnLoggedInRoute  loggedIn = {this.state.loggedIn} path="/login" component={Login} />
                <UnLoggedInRoute loggedIn = {this.state.loggedIn} path="/welcome" component={Welcome} />
                
                <LoggedInRoute loggedIn = {this.state.loggedIn} path="/missions" component={Mission} />
                <LoggedInRoute loggedIn = {this.state.loggedIn} path="/profile" component={Profile} />
                <LoggedInRoute loggedIn = {this.state.loggedIn} path="/mail" component={MailBox} />
                <LoggedInRoute loggedIn = {this.state.loggedIn} path="/collection" component={Collection} />

                {/*<Route exact loggedIn = {this.state.loggedIn} path="/" component={Welcome} />*/}
                <PrivateRoute exact authed = {this.state.authed} path="/admin" component={AdminDashboard}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/members" component={Welcome}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/games" component={AdminDashboard}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/cards" component={CardDashboard}/>
                <PrivateRoute authed = {this.state.authed} path="/admin/missions" component={MissionDashboard}/>
            </div>
        </Router>
        );
    }
}

export default RouterCheck;
    