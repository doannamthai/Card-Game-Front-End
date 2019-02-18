import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../Images/night-forest.jpg';
import NavBar from '../../Components/NavBar';
const styles = theme => ({
  '@global': {
    body: {
      backgroundImage: 'url('+ BackgroundImage+')',
    },
  },
  appBar: {
    position: 'relative',    
  },
  toolbarTitle: {
    flex: 1,
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
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
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
      <NavBar/>
      <main className={classes.layout}>
        {/* Hero unit */}
  
      </main>
      {/* Footer */}
      
      {/* End footer */}
    </React.Fragment>
  );
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);