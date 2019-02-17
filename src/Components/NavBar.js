import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GroupIcon from '@material-ui/icons/GroupWork';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    appBar: {
      position: 'sticky',
    },
    leftComponents: {
      marginRight: theme.spacing.unit * 2,
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
      display: 'block',
      },
    },
    icon: {
      marginRight: theme.spacing.unit * 2,
    },
    avatar: {
      margin: 10,
    },
    orangeAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
  });


function PrivateElement(props){
  if(props.authed === true){
    return props.children;
  }
  return null;
}

function UnLoggedInElement(props){
  if(props.authed === false){
    return props.children;
  }
  return null;
}

class NavBar extends Component{
  constructor(){
    super();
    this.state = {
      authed: false,
    }
  }
    render(){
      const { classes } = this.props;
        return(
            <AppBar  color = "default" className={classes.appBar}>
            <Toolbar>
              <GroupIcon nativeColor = "#2196f3" />
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                
              </Typography>
              <div className={classes.leftComponents}>
              <Button href="/">
                Dashboard
              </Button>
              <PrivateElement authed={this.state.authed}> <Button href="/game">
                Game</Button>
              </PrivateElement>        
              <Button>Our Team</Button>
              <Button>Support</Button>
              </div>
              <div className={classes.grow}/>
              
              <UnLoggedInElement authed={this.state.authed}>
              <Button href="/register">Register</Button>
              <Button color="secondary" variant="contained" href="/login">
                Login
              </Button>
              </UnLoggedInElement>
              <PrivateElement authed={this.state.authed}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                <MailIcon />
                </Badge>
              </IconButton>
              <Avatar className={classes.orangeAvatar}>T</Avatar>
              </PrivateElement>
              
            </Toolbar>
            </AppBar>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(NavBar);