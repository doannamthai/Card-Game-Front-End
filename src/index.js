import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import Welcome from './Layouts/Welcome/Welcome.js';
import Login from './Layouts/Login/Login.js';
import Dashboard from './Layouts/Dashboard/Dashboard.js';
import Register from './Layouts/Register/Register.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#2196f3',  
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    },
 });

 
ReactDOM.render(
<MuiThemeProvider theme = { theme }>
    <Router>
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/" component={Dashboard}/>
      </div>
    </Router>
   </MuiThemeProvider>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
