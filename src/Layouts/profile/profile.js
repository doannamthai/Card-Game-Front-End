import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import NavBar from '../../Components/NavBar.js';
import Footer from '../../Components/Footer';

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
        height: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '50px 50px 50px 50px',
    },
    main: {
        width: '70%',
        backgroundColor: '#424242',
        borderRadius: 10,
        display: 'inline-block',
        verticalAlign: 'top',

    },

    basicInfo: {
        height: 500,
        backgroundColor: '#424242',
        borderRadius: 10,
        display: 'inline-block',

    },


    appBar: {
        backgroundColor: 'transparent',
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
  

class Profile extends Component {
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
            <React.Fragment>
                <CssBaseline />
                <NavBar />
                    <div className={classes.layout}>
                
                    <div className= {classes.main}>
                    <AppBar position="static" className={classes.appBar}>

                        <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="off">
                            <Tab icon={<PhoneIcon />} />
                            <Tab icon={<FavoriteIcon />} />
                            <Tab icon={<PersonPinIcon />} />
                            <Tab icon={<HelpIcon />} />
                            <Tab icon={<ShoppingBasket />} />
                            <Tab icon={<ThumbDown />} />
                            <Tab icon={<ThumbUp />} />
                        </Tabs>

                        </AppBar>
                        {value === 0 && <TabContainer>Item One</TabContainer>}
                        {value === 1 && <TabContainer>Item Two</TabContainer>}
                        {value === 2 && <TabContainer>Item Three</TabContainer>}
                        {value === 3 && <TabContainer>Item Four</TabContainer>}
                        {value === 4 && <TabContainer>Item Five</TabContainer>}
                        {value === 5 && <TabContainer>Item Six</TabContainer>}
                        {value === 6 && <TabContainer>Item Seven</TabContainer>}
                    </div>

                    <div className={classes.basicInfo}>
                    <Grid container justify="center" alignItems="center">
                        <Avatar className={classes.avatar}>H</Avatar>
                        <Avatar className={classes.orangeAvatar}>N</Avatar>
                        <Avatar className={classes.purpleAvatar}>OP</Avatar>
                    </Grid>
                    </div>
                </div>
                {/* Footer */}
                <Footer/>
                {/* End footer */}
            </React.Fragment>
        );
    }

}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);