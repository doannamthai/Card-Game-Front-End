import React, { Component } from "react";
import GroupIcon from '@material-ui/icons/GroupWork';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Authentication from '../Utils/Authentication';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import CollectionsIcon from '@material-ui/icons/Collections';
import MailIcon from '@material-ui/icons/Email';
import ProfileIcon from '@material-ui/icons/PieChart';
import MailList from '../Components/MailList';

import { Grid, AppBar, Toolbar, Button, Typography, IconButton, Badge, MenuItem, ListItemText, ListItemIcon, Paper, Grow, ClickAwayListener, MenuList, Popper} from '@material-ui/core';
const styles = theme => ({
    appBar: {
      position: 'fixed',
      boxShadow: 'none',
    },
    transparent: {
      background: 'transparent',
      borderBottom: '1px solid #fff',
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
    
    orangeAvatar: {
      margin: 10,
      width: 80,
      height: 80,
      color: '#fff',
      backgroundColor: deepOrange[500],
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


const emails = [
  {id: 1, sender: 'Thai Doan', title: 'How are you doing', content: 'Tomorrow is Tuesday, I cannot make it. I\'m so sorry'},
  {id: 2, sender: 'Hello World', title: 'What are we doing for today', 
  content: 'Ehh, I really dont know, should we got out to get something to eat first'},
  {id: 3, sender: 'No name', title: 'It\'s my birthday', 
  content: 'Ehh, I really dont know, should we got out to get something to eat first'},
]

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: Authentication.isLoggedIn(),
      authed: Authentication.isAuthed(),
      menuPopup: null,
      emailPopUp: null,
      placementMenu: null,
      placementEmail: null,
      open: false,
      openEmail: false,
    };
    
  }

  handleMenu = placement => event => {
    this.setState({
       menuPopup: event.currentTarget,
       open: this.state.placement !== placement || !this.state.open,
       placementMenu: placement,
      });
  };

  handleEmail = placement => event => {
    this.setState({
      emailPopUp: event.currentTarget,
      openEmail: this.state.placementEmail !== placement || !this.state.openEmail,
      placementEmail: placement,
    });
  }

  handleEmailClose = () => {
    this.setState({
      emailPopUp: null,
      openEmail: false,
    });
  }
  handleClose = () => {
    this.setState({ 
      menuPopup: null,
      open: false,
    });
  };

  logOut = () => {
    Authentication.deleteSession();
    window.location.reload();

  }

    render(){
      const { classes } = this.props;
      let appBarCss = classes.appBar;
      const { open, menuPopup, emailPopUp, placementMenu, placementEmail, openEmail} = this.state;
      appBarCss += this.props.transparent ? " " + classes.transparent : "";
      console.log(appBarCss);
        return(
          <div>
            <AppBar color = "default" className={appBarCss}>
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
              <PrivateElement loggedIn={this.state.loggedIn}> 
              <Button href="/game">Game</Button>
              <Button href="/marketplace">Market</Button>
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

              <IconButton aria-owns={openEmail ? 'email-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleEmail('bottom-end')}
                  color="inherit">
                <Badge badgeContent={emails.length} color="secondary">
                <MailIcon />
                </Badge>
              </IconButton>
              <Popper open={openEmail} placement={placementEmail} anchorEl={emailPopUp} transition disablePortal>
                {({ TransitionProps}) => (
                  <Grow {...TransitionProps}>
                  <Paper>
                  <ClickAwayListener onClickAway={this.handleEmailClose}>
                    <MailList data={emails}/>
                  </ClickAwayListener>
                  </Paper>
                </Grow>
                )}
              </Popper>

              <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu('bottom')}
                  color="inherit">
                <AccountCircle />
                </IconButton>
              <Popper placement={placementMenu} open={open} anchorEl={menuPopup} transition disablePortal>
                  {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
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