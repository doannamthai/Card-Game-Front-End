import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../Images/background1.jpg';
import NavBar from '../../Components/NavBar';
import {Button, Typography } from '@material-ui/core';

const styles = theme => ({
  '@global': {
    body: {
      backgroundImage: 'url('+ BackgroundImage+')',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
    },
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 12}px 0 ${theme.spacing.unit * 6}px`,
  },
});


function Welcome(props) {
  const { classes } = props;
  function handleClick(e) {
    e.preventDefault();
    this.context.router.push('/login');
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar transparent="true"/>
      <main className={classes.layout}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
              Card Game
            </Typography>
            
            <div className={classes.heroButtons}>
                <Button variant="raised" color="inherited">
                  Get Started
                </Button>
            </div>
        </div>
      </main>
    </React.Fragment>
  );
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);