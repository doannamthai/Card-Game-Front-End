import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NavBar from '../../components/NavBar';
import {REGISTER_URL} from '../../ApisURL';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      repassword: '',
    }

  }

  handleOnChange = (v) => {
    this.setState({
      [v.target.name]: v.target.value,
    });
  }


  handleOnSubmit = (v) => {
    v.preventDefault();
    if (this.state.password !== this.state.repassword){
        window.alert("Your passwords do not match. Please try again");
        return;
    }
    fetch(REGISTER_URL, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        "password": this.state.password,
        "email" : this.state.email,
        "username": this.state.username,
        "firstname": this.state.firstname,
        "lastname": this.state.lastname,
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.status){
          window.alert("Successful! You are now redirected to login page");
          window.location.href = "/login";
        } else{
          window.alert("Cannot register! Please try again");
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
          window.alert("Cannot register! Please try again");
      }
    );
  }



  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <NavBar/>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
          <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email address"
              fullWidth
              autoComplete="email"
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              autoComplete="current-password"
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="repassword"
              name="repassword"
              type="password"
              label="Repeat Password"
              fullWidth
              autoComplete="current-password"
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstname"
              name="firstname"
              label="First name"
              fullWidth
              autoComplete="fname"
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last name"
              fullWidth
              autoComplete="lname"
              onChange={this.handleOnChange}
            />
          </Grid>
          
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleOnSubmit}
            >
              Sign in
            </Button>
        </Grid>
          </form>
        </Paper>
      </main>
      </React.Fragment>
    );
  }

  
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);