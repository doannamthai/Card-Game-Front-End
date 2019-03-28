import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import CustomAvatar from '../../Images/avatar.jpg';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import NavBar from '../../components/NavBar.js';
import Footer from '../../components/Footer';
import {PROFILE_URL, PROFILE_UPDATE_URL} from '../../ApisURL';
import Typography from '@material-ui/core/Typography';
import Authentication from '../../utils/Authentication';
import Chart from 'react-google-charts';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    sidebarStatistic: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 5,
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
    },
    chipWrapper: {
        marginTop: theme.spacing.unit*2
    },
    form: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    submitButton: {
        marginTop: theme.spacing.unit*10,
        width: 150,
    },
    levelChip: {
        backgroundColor: "#E91E63",
    },
    coinChip: {
        backgroundColor: "#8BC34A",
        marginLeft: theme.spacing.unit*3,
    },
});
  

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            error: '',
            profile: {
                userId: Authentication.getUserId(),
                username: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                password: '',
                repassword: '',
                win: 1,
                loss: 1,
                level: 1,
                coins: 1,
            }
        };
        
    };

    componentDidMount(){
        this.fetchProfileData();
    }

    fetchProfileData = () => {
        return fetch(PROFILE_URL + "?user_id=" + this.state.profile.userId, {
            method: "POST",
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (!result.error){
                    this.setState({
                        profile: {
                            ...this.state.profile,
                            username: result.username,
                            emailAddress: result.emailAddress,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            win: result.win,
                            loss: result.loss,
                            level: result.level,
                            coins: result.coins,
                        }
                    })
                }
            },
            // Note: it's important to handle errors here
            (error) => {
                console.log(error);
            }
        )
    };
 
    
    handleClose = () => {
        this.setState({ open: false });
    };


    handleOnChange = (v) => {

        this.setState({ 
            profile : {
                ...this.state.profile,
                [v.target.name] : v.target.value,
            }
        });    
    }
    
    handleSubmit = (v) => {
        v.preventDefault();
        let profile = this.state.profile;
        if (profile.password === profile.repassword) {
            fetch(PROFILE_UPDATE_URL + "?user_id=" + profile.userId, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "emailAddress": profile.emailAddress,
                    "password": profile.password,
                    "firstName": profile.firstName,
                    "lastName": profile.lastName
                }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (!result.error){
                        window.location.reload();
                    } else {
                        this.setState({ 
                            open: true,
                            error: result.error,
                        });
                    }

                },
                // Note: it's important to handle errors here
                (error) => {
                    this.setState({ 
                        open: true,
                        error: error,
                    });
                    
                }
            );
        } 
        else {
            this.setState({ 
                open: true,
                error: 'Your passwords don\'t match',
            });
        }
    }

    render() {
        const { classes } = this.props;
        const {  profile } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar />
                    <div className={classes.layout}>

                    <Grid container spacing={40} className={classes.mainGrid}>
                        {/* Main content */}
                        <Grid item xs={12} md={8}>
                           
                            <Divider />
                            <AppBar position="static" className={classes.appBar}>
                                <Tab label="Basic Profile" />
                            </AppBar>
                            
                            <Typography component="div" style={{ padding: 8 * 3, border: 0, backgroundColor: '#424242', }}>
                                <form className={classes.form} autoComplete="off">
                                    <FormControl margin="normal" fullWidth >
                                        <InputLabel shrink={true} htmlFor="email">Email Address</InputLabel>
                                        <Input id="email" name="emailAddress" value={profile.emailAddress} onChange={this.handleOnChange} />
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth >
                                        <InputLabel shrink={true} htmlFor="firstname">First Name</InputLabel>
                                        <Input id="firstname" name="firstName" value={profile.firstName} onChange={this.handleOnChange} />
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel shrink={true} htmlFor="lastname">Name</InputLabel>
                                        <Input id="lastname" name="lastName" value={profile.lastName} onChange={this.handleOnChange} />
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel shrink={true} htmlFor="password">Password</InputLabel>
                                        <Input  id="password" type="password" defaultValue="" name="password" onChange={this.handleOnChange} />
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel shrink={true} htmlFor="repassword">Repeat Password</InputLabel>
                                        <Input id="repassword" type="password" name="rePassword"  defaultValue="" onChange={this.handleOnChange} />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitButton}
                                        onClick={this.handleSubmit}
                                    >
                                        Save changes
                                    </Button>
                                </form>
                            </Typography>

                        </Grid>
                      
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} className={classes.sidebarAboutBox}>
                                <Typography variant="h6" gutterBottom>
                                    About
                                     </Typography>
                                <Avatar className={classes.avatar} src={CustomAvatar}></Avatar>
                                <Grid container justify="center" alignItems="center" className={classes.chipWrapper}>
                                    <Chip label={profile.username} color="primary" className={classes.chip} />
                                    
                                </Grid>
                                <Grid container justify="center" alignItems="center" className={classes.chipWrapper}>
                                    <Chip label={"Level: " + profile.level}  className={classes.levelChip} />
                                    <Chip label={"Coins: " + profile.coins}  className={classes.coinChip} />
                                </Grid>
                            </Paper>
                            <Paper elevation={0} className={classes.sidebarStatistic}>
                                <Typography variant="h6" gutterBottom>
                                    Statistic
                                </Typography>
                                <Grid container className={classes.chipWrapper}>
                                    <Chart backgroundColor={{ fill: 'transparent' }}
                                        height={'300px'}
                                        chartType="PieChart"
                                        data={[
                                            ['Games', 'Ratio'],
                                            ['Win', profile.win],
                                            ['Loss', profile.loss],

                                        ]}
                                        options={{
                                            legend: 'none',
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                            
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Could not save your changes"}</DialogTitle>
                        <DialogContent><DialogContentText id="alert-dialog-description">{this.state.error}</DialogContentText></DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Got it!
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {/* Footer */}
                <Footer/>
                {/* End footer */}
            </React.Fragment>
        );
    }

};

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);