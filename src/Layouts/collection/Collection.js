import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { unstable_Box as Box } from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CustomAvatar from '../../Images/avatar.jpg';
import Authentication from '../../utils/Authentication';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {PROFILE_URL, SELL_CARD_URL, CARD_URL} from '../../ApisURL';


const styles = theme => ({
    main: {
        paddingBottom: 200,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '135%',
    },
    cardContent: {
        flexGrow: 1,
    },
    avatar: {
        width: 200,
        height: 200,
    }
});


const fetchedData = [
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    }];
class Collection extends Component {

    state = {
        open: false,
        cards: fetchedData,
        card: null,
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
        },
        
    }

    componentDidMount(){
        this.fetchProfileData();
        this.fetchCardData();
    }

    fetchCardData = () => {
        return fetch(CARD_URL + "?user_id=" + this.state.profile.userId, {
            method: "POST",
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (Object.entries(result).length !== 0 && !result.Error){
                    this.setState({
                        cards: result.Cards,
                    })
                }
                else {
                    alert(result.Error);
                }
            },
            (error) => {
                console.log(error);
            }
        )
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
                else alert(result.error);
            },
            // Note: it's important to handle errors here
            (error) => {
                console.log(error);
            }
        )
    };

    handleClose = () => {
        this.setState({ 
          open: false, 
        });
      };

    handleOnLink = link => v => {
        window.location.href = link;
    };

    selectCard = index => v => {
        let c = this.state.cards[index];
        this.setState({
            card: c,
            open: true,
        });
    }

    handleSellCard = () => {

        let card = this.state.card;
        
        fetch(SELL_CARD_URL + "?user_id=" + this.state.profile.userId + "&card_id=" + card.Id, {
            method: "POST",
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (!result.Error){
                    window.location.reload();
                }
                else alert(result.Error);
            },
            // Note: it's important to handle errors here
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { classes } = this.props;
        const { profile, cards, card} = this.state;
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar />
                <main className={classes.main}>
                <Box component="main" maxWidth={1200} margin="auto" padding="60px 20px 0">
                    <Box mb="66px">
                        <Grid container>
                            <Grid item xs={4}>
                                <Avatar
                                    className={classes.avatar}
                                    style={{ margin: 'auto' }}
                                    src={CustomAvatar}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Box clone mb="20px">
                                    <Grid container alignItems="center">
                                        <Typography component="h1" variant="h4" lightWeight>
                                            {profile.username}
                                        </Typography>
                                        <Button style={{marginLeft: 10}} onClick={this.handleOnLink("/profile")} className={classes.editButton} variant="outlined">
                                            Edit Profile
                                        </Button>
                                    </Grid>
                                </Box>
                                <Box mb="20px">
                                    <Grid container spacing={40}>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                <b>{profile.coins}</b> coins
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                <b>{profile.level}</b> level
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                <b>{cards.length}</b> cards
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Typography variant="subtitle1" bold>
                                    {profile.firstName}  {profile.lastName}
                                </Typography>
                                <Typography variant="subtitle1">{profile.emailAddress}</Typography>
                                <Typography variant="subtitle1">Studying at University of Calgary</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            {cards.map((card, index) => (
                                <Grid item key={card} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={card.Link}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                {card.Title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={this.handleOnLink("/card/"+card.Id)} size="small" color="primary">
                                                View
                                            </Button>
                                            <Button onClick={this.selectCard(index)} size="small" color="primary">
                                                Sell
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Box>
                {card === null ? null : 
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Sell the card"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to sell "{this.state.card.Title}" and get back {this.state.card.Price} coins ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleSellCard} color="primary">
                            Continue
                       </Button>
                    </DialogActions>
                </Dialog>
                }
                </main>
                {/* Footer */}
                <Footer />
                {/* End footer */}
            </React.Fragment>
        )
    }
}

Collection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Collection);