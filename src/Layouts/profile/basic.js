import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../Components/NavBar.js';
import Footer from '../../Components/Footer';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({

    layout: {
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '50px 50px 50px 50px',
    },
    main: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#424242',
    },
    appBar: {
        backgroundColor: '#3498db',
    }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3, borderColor: 'transparent'}}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
  

class BasicProfile extends Component {
    state = {
        value: 0,
      };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Typography>

            </Typography>
        );
    }

}

BasicProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicProfile);