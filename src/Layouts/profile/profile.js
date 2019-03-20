import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CustomAvatar from '../../Images/avatar.jpg';

import NavBar from '../../Components/NavBar.js';
import Footer from '../../Components/Footer';

import Typography from '@material-ui/core/Typography';


const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1400 + theme.spacing.unit * 3 * 2)]: {
          width: 1400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },

    mainGrid: {
        marginTop: theme.spacing.unit * 3,
    },

    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
    },

    appBar: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    avatar: {
        width: 120,
        height: 120,
        fontSize: 36,
        margin: '0 auto',
    }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3, border: 0, backgroundColor: 'transparent',}}>
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
                    <Grid container spacing={40} className={classes.mainGrid}>
                            {/* Main content */}
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    My Profile
                                </Typography>
                                <Divider />
                            <AppBar position="static" className={classes.appBar}>
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab label="Basic Profile" />
                                    <Tab label="Statistic" />
                                    <Tab label="Item Three" />
                                </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer>Item One</TabContainer>}
                            {value === 1 && <TabContainer>Item Two</TabContainer>}
                            {value === 2 && <TabContainer>Item Three</TabContainer>}
                            </Grid>
                            {/* End main content */}
                            {/* Sidebar */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} className={classes.sidebarAboutBox}>
                                    <Typography variant="h6" gutterBottom>
                                        About
                                     </Typography>
                                     <Avatar className={classes.avatar} src={CustomAvatar}></Avatar>
                                </Paper>
                                
                            </Grid>
                            {/* End sidebar */}
                        </Grid>
                    
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