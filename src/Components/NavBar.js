import React, { Component } from "react";
import GroupIcon from '@material-ui/icons/GroupWork';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Authentication from '../Utils/Authentication';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import CollectionsIcon from '@material-ui/icons/Collections';
import MailIcon from '@material-ui/icons/Email';
import ProfileIcon from '@material-ui/icons/PieChart';
import { Grid, AppBar, Toolbar, Button, Typography, IconButton, Badge, MenuItem, ListItemText, ListItemIcon, Paper, Grow, ClickAwayListener, MenuList, Popper} from '@material-ui/core';
const styles = theme => ({
    appBar: {
      position: 'fixed',
      boxShadow: 'none',
      background: '#323232',
    },
    toolbarSpacer: theme.mixins.toolbar,
    leftComponents: {
      marginLeft: theme.spacing.unit * 5,
    },
    rightComponents: {
      marginRight: theme.spacing.unit * 8,
      padding: '0px!important',
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
    bigAvatar: {
      margin: 10,
      width: 80,
      height: 80,
    },
    orangeAvatar: {
      margin: 10,
      width: 80,
      height: 80,
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
  if(props.loggedIn === true){
    return props.children;
  }
  return null;
}

function AuthedElement(props){
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
      loggedIn: Authentication.isLoggedIn(),
      authed: Authentication.isAuthed(),
      anchorEl: null,
      emailPopUp: null,
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleEmail = event => {
    this.setState({emailPopUp: event.currentTarget});
  }

  handleEmailClose = () => {
    this.setState({emailPopUp: null});
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    Authentication.deleteSession();
    window.location.reload();

  }

    render(){
      const { classes } = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
        return(
          <div>
            <AppBar  color = "default" className={classes.appBar}>
            <Toolbar>
              <GroupIcon nativeColor = "#2196f3" />
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                
              </Typography>
              <div className={classes.leftComponents}>
              <Button href="/">
                Dashboard
              </Button>
              <Button href="/store">
                Store
              </Button>
              
              <PrivateElement loggedIn={this.state.loggedIn}> <Button href="/game">
                Game</Button>
              </PrivateElement>
              <PrivateElement loggedIn={this.state.loggedIn}> <Button href="/missions">
                Missions</Button>
              </PrivateElement>
              <Button>Our Team</Button>
              <Button>Support</Button>
              <AuthedElement authed={this.state.authed}> 
              <Button color="default" variant="contained" href="/admin">Admin </Button>
              </AuthedElement>
              </div>
              <div className={classes.grow}/>
              <div className={classes.rightComponents}>
              <UnLoggedInElement authed={this.state.authed}>
              <Button href="/register">Register</Button>
              <Button color="secondary" variant="contained" href="/login">Login</Button>
              </UnLoggedInElement>
              <PrivateElement loggedIn={this.state.loggedIn}>
              <IconButton aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleEmail}
                  color="inherit">
                <Badge badgeContent={4} color="secondary">
                <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                <AccountCircle />
                </IconButton>

                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                  <Grow
                  {...TransitionProps}
                    id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                  <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                        <Grid container justify="center" alignItems="center">
                          <Avatar className={classes.orangeAvatar}>OP</Avatar>
                        </Grid>      
                      <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                          <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Profile" />
                      </MenuItem>

                      <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                        <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Collection" />
                      </MenuItem>

                      <MenuItem onClick={() => {this.handleClose(); this.logOut()}} className={classes.menuItem}>
                      <ListItemIcon className={classes.icon}>
                        <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                      </MenuItem>

                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
                )}
              </Popper>
              </PrivateElement>
              </div>
            </Toolbar>
            </AppBar>
            <div className={classes.toolbarSpacer}></div>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(NavBar);