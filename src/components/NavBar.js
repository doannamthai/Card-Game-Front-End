import React, { Component } from "react";
import GroupIcon from '@material-ui/icons/GroupWork';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Authentication from '../utils/Authentication';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import CollectionsIcon from '@material-ui/icons/Collections';
import MailIcon from '@material-ui/icons/Email';
import ProfileIcon from '@material-ui/icons/PieChart';

import { Grid, AppBar, Toolbar, Button, Typography, IconButton,  MenuItem, ListItemText, ListItemIcon, Paper, Grow, ClickAwayListener, MenuList, Popper} from '@material-ui/core';
const styles = theme => ({
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
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
  if(props.loggedIn === false){
    return props.children;
  }
  return null;
}



class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: Authentication.isLoggedIn(),
      authed: Authentication.isAuthed(),
      menuPopup: null,
      placementMenu: null,
      open: false,
    };
  }

  handleMenu = placement => event => {
    this.setState({
       menuPopup: event.currentTarget,
       open: this.state.placement !== placement || !this.state.open,
       placementMenu: placement,
      });
  };

 
  handleClose = () => {
    this.setState({ 
      menuPopup: null,
      open: false,
    });
  };

  handleLink = (src) => {
    window.location.href = src;
  }

  logOut = () => {
    Authentication.deleteSession();
    window.location.reload();

  }

    render(){
      const { classes } = this.props;
      let appBarCss = classes.appBar;
      const { open, menuPopup,  placementMenu} = this.state;
      appBarCss += this.props.transparent ? " " + classes.transparent : "";
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
              
              <PrivateElement loggedIn={this.state.loggedIn}> <Button href="/missions">
                Missions</Button>
              </PrivateElement>
              <AuthedElement authed={this.state.authed}> 
              <Button color="default" variant="contained" href="/admin">Admin </Button>
              </AuthedElement>
              </div>
              <div className={classes.grow}/>
              <div className={classes.rightComponents}>
              <UnLoggedInElement loggedIn={this.state.loggedIn}>
              <Button href="/register">Register</Button>
              <Button color="secondary" variant="contained" href="/login">Login</Button>
              </UnLoggedInElement>
              <PrivateElement loggedIn={this.state.loggedIn}>

              <IconButton
                  aria-haspopup="true"
                  onClick={() => this.handleLink("/mail")}
                  color="inherit">
                <MailIcon />
              </IconButton>
    
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
                      <MenuItem  onClick={() => {this.handleLink("/profile")}} className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                          <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Profile" />
                      </MenuItem>

                      <MenuItem  onClick={() => {this.handleLink("/collection")}} className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                        <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText   classes={{ primary: classes.primary }} inset primary="Collection" />
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