import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../../components/NavBar';
import Authentication from '../../utils/Authentication';
import {LOGIN_URL} from '../../ApisURL';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
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
class SignIn extends Component  {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleOnChange(v) {
    this.setState({
      [v.target.name]: v.target.value,
    })
  }

  submitForm(v) {
    v.preventDefault();
    fetch(LOGIN_URL + "?password=" + this.state.password + "&username=" + this.state.email, {
      method: 'POST',
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.token){
          Authentication.setAccessToken(result.id, result.token, result.isAdmin);
          window.location.href = "/";
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {

      }
    );
  }

  render(){

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
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" type="email" name="email" autoComplete="email" required autoFocus onChange={this.handleOnChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" required onChange={this.handleOnChange} autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submitForm}
              className={classes.submit}
              href="/"
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
      </React.Fragment>
    );
  }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);